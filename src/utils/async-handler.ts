import type { Request, Response, NextFunction, RequestHandler } from 'express';

// async 컨트롤러를 감싸서 try-catch 없이 에러를 next()로 전달
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
