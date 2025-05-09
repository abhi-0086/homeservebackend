import { NestFactory } from '@nestjs/core';
import { BookingModule } from './booking.module';
import { MicroserviceOptions, NestMicroservice, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(BookingModule, {
    transport: Transport.TCP,
    options:{
      host:'0.0.0.0',
      port:8003
    }
  });

  await app.listen();
  console.log(`Booking service is up and running on port 8003`);
}
bootstrap();
