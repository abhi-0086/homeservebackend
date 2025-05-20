import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from 'apps/libs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async createUser(userdto: UserDto) {
    try {
      const user = this.userRepo.create(userdto);
      return await this.userRepo.save(user);
    } catch (err) {
      console.error('Error saving user:', err);
      throw err;
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      await this.userRepo.delete(userId);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}
