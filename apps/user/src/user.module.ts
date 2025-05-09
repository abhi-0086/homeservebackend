import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseService } from './database/database.service';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/user/.env'
    }),
    DatabaseModule,
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService : ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_SERVICE_HOST'),
            port: +configService.get<number>('AUTH_SERVICE_PORT')!,
          },
        }),
        inject: [ConfigService]
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, DatabaseService]
})
export class UserModule {}
