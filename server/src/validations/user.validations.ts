import { param, query } from 'express-validator';

/**
 * Validation schemas for user endpoints
 */
export const UserValidationSchemas = {
  /**
   * Validation schema for getting user by ID
   */
  getUserById: [
    param('id')
      .notEmpty()
      .withMessage('User ID is required')
      .isMongoId()
      .withMessage('Must be a valid MongoDB ID'),
  ],

  /**
   * Validation schema for querying users
   */
  queryUsers: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer')
      .toInt(),

    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100')
      .toInt(),

    query('sort')
      .optional()
      .isIn(['createdAt', 'username', 'email'])
      .withMessage('Sort must be one of: createdAt, username, email'),

    query('order')
      .optional()
      .isIn(['asc', 'desc'])
      .withMessage('Order must be either asc or desc'),
  ],
};

export default UserValidationSchemas;
