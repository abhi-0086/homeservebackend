import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService : ConfigService) => ({
          transport: Transport.TCP,
          options:{
            host: configService.get<string>('AUTH_SERVICE_HOST') || '0.0.0.0',
            port: configService.get<number>('AUTH_SERVICE_PORT') || 8001,
          }
        }),
        inject: [ConfigService],
      },
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService : ConfigService) => ({
          transport: Transport.TCP,
          options:{
            host: configService.get<string>('USER_SERVICE_HOST') || '0.0.0.0',
            port: configService.get<number>('USER_SERVICE_PORT') || 8002,
          }
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService], 
})
export class AppModule {}
