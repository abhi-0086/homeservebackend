import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AuthModule);
  const configService = appContext.get(ConfigService);

  const host = configService.get<string>('AUTH_HOST') || '0.0.0.0';
  const port = parseInt(configService.get<string>('AUTH_PORT') || '8001', 10);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.TCP,
    options: { host, port },
  });

  await app.listen();
  console.log(`Auth service is running on ${host}:${port}`);
}
bootstrap();
