import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
      }
      this.logger.log('✅ Database connection established successfully');
    } catch (error) {
      this.logger.error('❌ Failed to connect to the database', error);
      process.exit(1); // fail fast
    }
  }
}
