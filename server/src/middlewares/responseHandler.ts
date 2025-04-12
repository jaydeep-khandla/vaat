// middlewares/responseEnhancer.ts
import { Response, Request, NextFunction, RequestHandler } from 'express';
import { sendResponse } from '../utils/response';

export const responseEnhancer: RequestHandler = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  res.sendResponse = sendResponse.bind(res);
  next();
};
