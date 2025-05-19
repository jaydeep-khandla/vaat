import express from 'express';
import Authcontroller from '../../controllers/auth.controller';
import { verifyToken } from '../../middlewares/auth.middleware';
import { validator } from '../../middlewares/validator.middleware';
import { AuthValidationSchemas } from '../../validations';

const AuthController = new Authcontroller();

const router = express.Router();

// Using async wrapper to handle Promises correctly
const asyncHandler =
  (fn: Function) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Public routes (no authentication required)
router.post(
  '/signup',
  validator(AuthValidationSchemas.signup), // Validate request body
  asyncHandler(AuthController.signUp.bind(AuthController))
);

router.post(
  '/verify',
  asyncHandler(AuthController.verifyUser.bind(AuthController))
);

router.post(
  '/signin',
  validator(AuthValidationSchemas.signin), // Validate request body
  asyncHandler(AuthController.signIn.bind(AuthController))
);

router.post(
  '/forgot-password',
  validator(AuthValidationSchemas.forgotPassword), // Validate request body
  asyncHandler(AuthController.forgotPassword.bind(AuthController))
);

router.post(
  '/reset-password',
  validator(AuthValidationSchemas.resetPassword), // Validate request body
  asyncHandler(AuthController.resetPassword.bind(AuthController))
);

// Protected routes (authentication required)
router.post(
  '/refresh-token',
  verifyToken, // Middleware to verify the token
  validator(AuthValidationSchemas.refreshToken), // Validate request body
  asyncHandler(AuthController.refreshToken.bind(AuthController))
);

router.post(
  '/signout',
  verifyToken, // Middleware to verify the token
  validator(AuthValidationSchemas.refreshToken), // Validate request body (refreshToken is required)
  asyncHandler(AuthController.signOut.bind(AuthController))
);

router.post(
  '/signout-all',
  verifyToken, // Middleware to verify the token
  asyncHandler(AuthController.signOutAll.bind(AuthController))
);

// Google OAuth routes
// router.get(
//   '/google/url',
//   asyncHandler(AuthController.googleAuthUrl.bind(AuthController))
// );

router.post(
  '/google/callback',
  validator(AuthValidationSchemas.googleCallback), // Validate request body
  asyncHandler(AuthController.googleCallback.bind(AuthController))
);

export default router;
