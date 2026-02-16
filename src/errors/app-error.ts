export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = '잘못된 요청입니다') {
    return new AppError(message, 400);
  }

  static unauthorized(message = '인증이 필요합니다') {
    return new AppError(message, 401);
  }

  static forbidden(message = '권한이 없습니다') {
    return new AppError(message, 403);
  }

  static notFound(message = '리소스를 찾을 수 없습니다') {
    return new AppError(message, 404);
  }

  static conflict(message = '리소스가 이미 존재합니다') {
    return new AppError(message, 409);
  }

  static internal(message = '서버 내부 오류가 발생했습니다') {
    return new AppError(message, 500, false);
  }
}
