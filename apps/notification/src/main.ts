import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationModule, {
    transport: Transport.TCP,
    options:{
      host:'0.0.0.0',
      port:8004
    }
  });

  await app.listen();
  console.log(`User service is up and running on port 8004`);
}
bootstrap();
