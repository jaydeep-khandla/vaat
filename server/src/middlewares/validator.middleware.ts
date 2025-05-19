import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { BadRequestError } from '../utils/response';
import Logger from '../utils/logger';

const logger = new Logger('validator-middleware');

interface ValidatorOptions {
  /**
   * Custom error message to override the default
   */
  errorMessage?: string;

  /**
   * If true, only returns the first validation error
   */
  singleError?: boolean;
}

/**
 * Middleware to validate request data using express-validator
 *
 * @param validations Array of express-validator validation chains
 * @param options Options for customizing validation behavior
 * @returns Middleware function that validates the request
 */
export function validator(
  validations: ValidationChain[],
  options: ValidatorOptions = {}
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    // Execute all validations
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Get validation errors
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      // No validation errors, proceed to next middleware
      return next();
    }

    // Format validation errors
    const extractedErrors = errors.array().map((err) => {
      if ('path' in err) {
        return { [err.path]: err.msg };
      }
      return { error: err.msg };
    }) as Array<Record<string, string>>;

    // Log validation errors
    logger.debug(`Validation failed: ${JSON.stringify(extractedErrors)}`);

    // Use custom error message if provided, otherwise build message from errors
    let errorMessage = options.errorMessage;

    if (!errorMessage) {
      if (options.singleError && extractedErrors.length > 0) {
        // Return only the first error
        const firstErr = extractedErrors[0];
        const field = Object.keys(firstErr)[0];
        // errorMessage = `${field}: ${String(firstErr[field])}`;
        errorMessage = String(firstErr[field]);
      } else {
        // Join all errors together
        errorMessage = extractedErrors
          .map((err) => {
            const field = Object.keys(err)[0];
            const message = err[field];
            // return `${field}: ${message}`;
            return message;
          })
          .join(', ');
      }
    }

    // Throw BadRequestError with validation errors
    next(new BadRequestError(`Validation failed: ${errorMessage}`));
  };
}

/**
 * Middleware factory for validating request body with options
 */
export function validateBody(
  validations: ValidationChain[],
  options: ValidatorOptions = {}
) {
  return validator(validations, {
    errorMessage: options.errorMessage || 'Invalid request body',
    singleError: options.singleError,
  });
}

/**
 * Middleware factory for validating request parameters with options
 */
export function validateParams(
  validations: ValidationChain[],
  options: ValidatorOptions = {}
) {
  return validator(validations, {
    errorMessage: options.errorMessage || 'Invalid request parameters',
    singleError: options.singleError,
  });
}

/**
 * Middleware factory for validating query parameters with options
 */
export function validateQuery(
  validations: ValidationChain[],
  options: ValidatorOptions = {}
) {
  return validator(validations, {
    errorMessage: options.errorMessage || 'Invalid query parameters',
    singleError: options.singleError,
  });
}

export default {
  validator,
  validateBody,
  validateParams,
  validateQuery,
};
