import { NextFunction, Request, Response } from 'express';

class AppError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends AppError {
  constructor(message: string = 'Bad Request') {
    super(message, 400);
  }
}

class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}

class NotFoundError extends AppError {
  constructor(message: string = 'Not Found') {
    super(message, 404);
  }
}

class ConflictError extends AppError {
  constructor(message: string = 'Conflict') {
    super(message, 409);
  }
}

class UnprocessableEntityError extends AppError {
  constructor(message: string = 'Unprocessable Entity') {
    super(message, 422);
  }
}

class InternalServerError extends AppError {
  constructor(message: string = 'Internal Server Error') {
    super(message, 500);
  }
}

// --- Response Handler --- //
function sendResponse(
  this: Response,
  success: boolean,
  message: string,
  status: number,
  data: any
) {
  return this.status(status).json({
    success,
    message,
    data: data || null,
    status,
  });
}

function globalErrorHandler(
  error: AppError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = (error as AppError).status || 500;
  res.sendResponse(false, error.message, status);
}

export {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  UnprocessableEntityError,
  InternalServerError,
  sendResponse,
  globalErrorHandler,
};
