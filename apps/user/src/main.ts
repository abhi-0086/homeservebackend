import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(UserModule);
  const configService = appContext.get(ConfigService);

  const host = configService.get<string>('USER_HOST') || '0.0.0.0';
  const port = parseInt(configService.get<string>('USER_PORT') || '8002', 10);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.TCP,
    options: { host, port },
  });

  await app.listen();
  console.log(`User service is running on ${host}:${port}`);
}
bootstrap();
