import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('API_GATEWAY_PORT') || 3001;

  await app.listen(port);
  console.log(`🚀 API Gateway running on http://localhost:${port}`);
}
bootstrap();
