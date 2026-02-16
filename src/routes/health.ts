import { Router } from 'express';
import type { HealthCheckResponse, ApiResponse } from '../types/index.js';
import { env } from '../config/env.js';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: 서버 헬스체크
 *     description: 서버 상태, 업타임, 환경, 타임스탬프를 반환합니다
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: 서버 정상 작동 중
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: OK
 *                     uptime:
 *                       type: number
 *                       example: 123.456
 *                     environment:
 *                       type: string
 *                       example: development
 *                     timestamp:
 *                       type: string
 *                       example: "2024-01-01T00:00:00.000Z"
 */
router.get('/health', (_req, res) => {
  const healthData: HealthCheckResponse = {
    status: 'OK',
    uptime: process.uptime(),
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  };

  const response: ApiResponse<HealthCheckResponse> = {
    success: true,
    data: healthData,
  };

  res.json(response);
});

export default router;
