import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

// 글로벌 에러 핸들러
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // AppError인 경우 (operational error)
  if (err instanceof AppError) {
    logger.warn({ statusCode: err.statusCode, message: err.message }, '운영 에러 발생');

    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        ...(env.NODE_ENV === 'development' && { stack: err.stack }),
      },
    });
    return;
  }

  // 예상치 못한 에러 (programmer error)
  logger.error({ err }, '예상치 못한 에러 발생');

  res.status(500).json({
    success: false,
    error: {
      message: '서버 내부 오류가 발생했습니다',
      ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};
