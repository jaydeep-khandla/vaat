import express from 'express';
import { Router } from 'express';
import authRouter from './auth.route';
import userRouter from './user.route';

// Create router for API v1
const router: Router = express.Router();

// Mount auth routes at /api/v1/auth
router.use('/auth', authRouter);

// Mount user routes at /api/v1/users
router.use('/users', userRouter);

export default router;
