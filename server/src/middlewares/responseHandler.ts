// middlewares/responseEnhancer.ts
import { Response, Request, NextFunction, RequestHandler } from 'express';
import { sendResponse } from '../utils/response';

export function responseEnhancer(
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  res.sendResponse = sendResponse.bind(res);
  next();
}
