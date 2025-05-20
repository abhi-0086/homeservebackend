import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'apps/libs/common';
import * as bcrypt from 'bcrypt';
import {
  successResponse,
  errorResponse,
} from 'apps/libs/common/src/utils/response.util';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login-user' })
  async login(logindata: LoginDto) {
    try {
      const authdetails = await this.authService.getAuthDetailsForUser(
        logindata.email,
      );
      if (!authdetails) {
        return successResponse(400, 'User not found');
      }

    const isPasswordValid = await bcrypt.compare(logindata.password, authdetails.data.password);
    if (isPasswordValid) {
      return successResponse(200, 'Login successful');
    } else {
      return successResponse(400, 'Invalid credentials!');
    }
    } catch (error) {
      console.log('Error while logging in : ', error);
      return errorResponse(
        500,
        'Failed to authenticate user',
        error?.message || error,
      );
    }
  }

  @MessagePattern({ cmd: 'register-user' })
  async register(registerdto: RegisterDto) {
    try {
      const auth = await this.authService.registerUser(registerdto);
      return successResponse(201, 'User registered in Auth service', {
        userId: auth.id,
        username: auth.username,
        email: auth.email,
      });
    } catch (error) {
      return errorResponse(
        500,
        'Auth service error during registration',
        error,
      );
    }
  }
}
