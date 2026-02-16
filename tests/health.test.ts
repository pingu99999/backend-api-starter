import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('GET /health', () => {
  it('200 상태코드와 함께 헬스체크 데이터를 반환해야 한다', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('status', 'OK');
    expect(res.body.data).toHaveProperty('uptime');
    expect(res.body.data).toHaveProperty('environment');
    expect(res.body.data).toHaveProperty('timestamp');
    expect(typeof res.body.data.uptime).toBe('number');
  });
});

describe('404 핸들러', () => {
  it('존재하지 않는 경로에 대해 404를 반환해야 한다', async () => {
    const res = await request(app).get('/nonexistent-route');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.message).toBe('요청한 리소스를 찾을 수 없습니다');
  });
});
