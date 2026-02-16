import { describe, it, expect } from 'vitest';
import { AppError } from '../src/errors/app-error.js';

describe('AppError', () => {
  it('statusCode와 message를 올바르게 설정해야 한다', () => {
    const error = new AppError('테스트 에러', 400);

    expect(error.message).toBe('테스트 에러');
    expect(error.statusCode).toBe(400);
    expect(error.isOperational).toBe(true);
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);
  });

  it('badRequest 팩토리 메서드가 400 에러를 생성해야 한다', () => {
    const error = AppError.badRequest();

    expect(error.statusCode).toBe(400);
    expect(error.isOperational).toBe(true);
  });

  it('notFound 팩토리 메서드가 404 에러를 생성해야 한다', () => {
    const error = AppError.notFound('페이지 없음');

    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('페이지 없음');
  });

  it('unauthorized 팩토리 메서드가 401 에러를 생성해야 한다', () => {
    const error = AppError.unauthorized();

    expect(error.statusCode).toBe(401);
  });

  it('internal 팩토리 메서드가 500 에러를 생성하고 isOperational이 false여야 한다', () => {
    const error = AppError.internal();

    expect(error.statusCode).toBe(500);
    expect(error.isOperational).toBe(false);
  });
});
