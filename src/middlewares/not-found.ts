import type { Request, Response } from 'express';

// 404 핸들러
export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      message: '요청한 리소스를 찾을 수 없습니다',
    },
  });
};
