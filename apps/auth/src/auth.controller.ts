import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async login(data: { email: string; password: string }) {
    // Your authentication logic (e.g., validate credentials)
    console.log('Auth Service: Login request received', data);
    return { userId: 1, accessToken: 'dummy-token' };
  }

  @MessagePattern({ cmd: 'register' })
  async register(data: { email: string; password: string }) {
    // Your authentication logic (e.g., validate credentials)
    console.log('Auth Service: Login request received', data);
    return { userId: 1, accessToken: 'dummy-token' };
  }
}
