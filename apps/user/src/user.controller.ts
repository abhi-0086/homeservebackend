import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { RegisterDto, UserDto } from 'apps/libs/common';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import {
  errorResponse,
  successResponse,
} from 'apps/libs/common/src/utils/response.util';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'create-user' })
  async createUser(userDto: UserDto) {
    let savedUser;
    try {
      savedUser = await this.userService.createUser(userDto);

      if (!savedUser?.id) {
        return errorResponse(500, 'Failed to create user record');
      }
      if (savedUser?.id) {
        const registerDto = plainToInstance(RegisterDto, savedUser);
        registerDto.password = userDto.password;
        registerDto.userId = savedUser.id.toString();
        const authResponse = await firstValueFrom(
          this.authClient.send({ cmd: 'register-user' }, registerDto),
        );
        if (authResponse?.returnCode == 201) {
          return successResponse(
            201, 
            'User Registered sucessfully!', 
            { userId: savedUser.id }
          );
        }

        this.logger.warn(
          `Rolling back user creation, deleting user ${savedUser.id}`,
        );
        await this.userService.deleteUser(savedUser.id);
        return errorResponse(500, 'Failed to register user!');
      }
    } catch (error) {
      this.logger.error('User creation failed : ', error);
      if (savedUser?.id) {
        await this.userService.deleteUser(savedUser.id);
      }
      return errorResponse(
        500,
        'An unexpected error occurred during registration',
        error?.message || error,
      );
    }
  }
}
