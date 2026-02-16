import app from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

const server = app.listen(env.PORT, () => {
  logger.info(`서버가 포트 ${env.PORT}에서 실행 중입니다 (${env.NODE_ENV})`);
  logger.info(`Swagger 문서: http://localhost:${env.PORT}/api-docs`);
});

// Graceful Shutdown
const gracefulShutdown = (signal: string) => {
  logger.info(`${signal} 시그널 수신. 서버를 종료합니다...`);
  server.close(() => {
    logger.info('서버가 정상적으로 종료되었습니다');
    process.exit(0);
  });

  // 10초 이내에 종료되지 않으면 강제 종료
  setTimeout(() => {
    logger.error('서버 강제 종료');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// 예상치 못한 에러 처리
process.on('unhandledRejection', (reason) => {
  logger.fatal({ reason }, 'Unhandled Rejection');
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.fatal({ error }, 'Uncaught Exception');
  process.exit(1);
});
