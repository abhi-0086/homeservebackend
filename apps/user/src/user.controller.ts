import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd : 'create-user'})
  async createUser(data: { email: string; password: string }) {
    // Your authentication logic (e.g., validate credentials)
    console.log('Auth Service: Login request received', data);
    return { userId: 1, action: 'user created successfully' };
  }
}
