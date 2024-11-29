import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3001'],
  });

  // Log all routes
  await app.listen(3000);

  const server = app.getHttpServer();
  const router = server._events.request._router;
  const availableRoutes = router.stack
    .filter((layer) => layer.route)
    .map((layer) => {
      return {
        path: layer.route.path,
        method: Object.keys(layer.route.methods)[0].toUpperCase(),
      };
    });

}
bootstrap();
