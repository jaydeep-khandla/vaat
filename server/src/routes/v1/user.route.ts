import express from 'express';
import {
  verifyToken,
  isAdmin,
  hasRole,
} from '../../middlewares/auth.middleware';
import { validator } from '../../middlewares/validator.middleware';
import { UserValidationSchemas } from '../../validations';
import AuthService from '../../services/auth.service';

const router = express.Router();
const authService = new AuthService();

// Using async wrapper to handle Promises correctly
const asyncHandler =
  (fn: Function) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Get the current user profile (requires authentication)
router.get(
  '/profile',
  verifyToken,
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const userId = req.userId;

    if (!userId) {
      return res.sendResponse(false, 'User ID not found', 400, null);
    }

    const user = await authService.getUserById(userId);

    if (!user) {
      return res.sendResponse(false, 'User not found', 404, null);
    }

    return res.sendResponse(
      true,
      'User profile retrieved successfully',
      200,
      user
    );
  })
);

// Admin-only route example
router.get(
  '/all',
  [verifyToken, isAdmin], // Middleware chain - must be authenticated AND an admin
  validator(UserValidationSchemas.queryUsers), // Validate query parameters
  asyncHandler(async (_req: express.Request, res: express.Response) => {
    // This is a placeholder for admin functionality
    // In a real application, you would fetch all users
    return res.sendResponse(true, 'Admin access granted', 200, {
      message: 'List of all users would appear here',
    });
  })
);

// Role-based route example
router.get(
  '/moderator-content',
  [verifyToken, hasRole(['MODERATOR', 'ADMIN'])], // Must have either MODERATOR or ADMIN role
  asyncHandler(async (_req: express.Request, res: express.Response) => {
    return res.sendResponse(true, 'Moderator access granted', 200, {
      message: 'Moderator content would appear here',
    });
  })
);

// Get a user by ID
router.get(
  '/:id',
  [verifyToken, hasRole(['ADMIN', 'MODERATOR'])], // Role-based access
  validator(UserValidationSchemas.getUserById), // Validate path parameters
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const userId = req.params.id;

    const user = await authService.getUserById(userId);

    if (!user) {
      return res.sendResponse(false, 'User not found', 404, null);
    }

    return res.sendResponse(true, 'User retrieved successfully', 200, user);
  })
);

export default router;
