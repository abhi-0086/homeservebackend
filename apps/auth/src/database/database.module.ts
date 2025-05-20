import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { Auth } from '../entities/auth.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        console.log(
          `DB Host : ${config.get('AUTH_DB_HOST')}, DB port : ${config.get('AUTH_DB_PORT')}, Username : ${config.get('AUTH_DB_USERNAME')}, Password: ${config.get('AUTH_DB_PASSWORD')}, DB name : ${config.get('AUTH_DB_NAME')} `,
        );
        return {
          type: 'postgres',
          host: config.get('AUTH_DB_HOST'),
          port: +config.get<number>('AUTH_DB_PORT')!,
          username: config.get('AUTH_DB_USERNAME'),
          password: String(config.get('AUTH_DB_PASSWORD')),
          database: config.get('AUTH_DB_NAME'),
          autoLoadEntities: true,
          entities: [Auth],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
