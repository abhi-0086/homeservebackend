import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        console.log(
          `DB Host : ${config.get('USER_DB_HOST')}, DB port : ${config.get('USER_DB_PORT')}, Username : ${config.get('USER_DB_USERNAME')}, Password : ${config.get('USER_DB_PASSWORD')}, DB name : ${config.get('USER_DB_NAME')} `,
        );
        return {
          type: 'postgres',
          host: config.get('USER_DB_HOST'),
          port: +config.get<number>('USER_DB_PORT')!,
          username: config.get('USER_DB_USERNAME'),
          password: String(config.get('USER_DB_PASSWORD')),
          database: config.get('USER_DB_NAME'),
          autoLoadEntities: true,
          entities: [User],
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
