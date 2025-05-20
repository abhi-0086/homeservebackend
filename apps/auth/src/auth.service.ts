import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'apps/libs/common';
import * as bcrypt from 'bcrypt';
import { successResponse } from 'apps/libs/common/src/utils/response.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepo: Repository<Auth>,
  ) {}

  async registerUser(registerdto: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(registerdto.password, 10);
      const auth = this.authRepo.create({
        ...registerdto,
        password: hashedPassword,
      });
      return await this.authRepo.save(auth);
    } catch (err) {
      console.error('Error saving auth:', err);
      throw err;
    }
  }

  async getAuthDetailsForUser(email: string){
    try{
      const user = await this.authRepo.findOne({where :{ email }});
      return successResponse(200, 'Auth details fetched successfully', user);
    }
    catch(err){
      console.error('Error fetching auth details:', err);
      throw err;
    }
  }
}
