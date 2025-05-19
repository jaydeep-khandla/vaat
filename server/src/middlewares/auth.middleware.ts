import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { appConfig } from '../config';
import { UnauthorizedError } from '../utils/response';
import Logger from '../utils/logger';

const logger = new Logger('auth-middleware');

/**
 * Middleware to verify JWT token from Authorization header
 */
export function verifyToken(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError('No token provided');
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError('Invalid token format');
    }

    // Verify the token
    jwt.verify(
      token,
      appConfig.jwt.secret,
      function jwtCallBack(err: any, decoded: any) {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return next(new UnauthorizedError('Token expired'));
          }
          return next(new UnauthorizedError('Invalid token'));
        }

        // Attach user info to request object
        req.userId = decoded.id;
        req.roles = decoded.roles;

        logger.debug(`Token verified for user: ${decoded.id}`);
        next();
      }
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Middleware to check if user has admin role
 */
export function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.roles) {
      throw new UnauthorizedError('No roles found');
    }

    if (req.roles.includes('ADMIN')) {
      next();
    } else {
      throw new UnauthorizedError('Requires admin role');
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Creates an auth middleware to check if user has any of the specified roles
 */
export function hasRole(roles: string[]) {
  return function hasRoleMiddleware(
    req: Request,
    _res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.roles) {
        throw new UnauthorizedError('No roles found');
      }

      // Check if user has any of the required roles
      const hasRequiredRole = req.roles.some((role) => roles.includes(role));

      if (hasRequiredRole) {
        next();
      } else {
        throw new UnauthorizedError('Insufficient permissions');
      }
    } catch (error) {
      next(error);
    }
  };
}

export default {
  verifyToken,
  isAdmin,
  hasRole,
};
