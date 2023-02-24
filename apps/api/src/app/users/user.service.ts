import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  async create(createDto: CreateUserDto): Promise<User> {
    createDto.password = await this.authService.createPassword(
      createDto.password
    );
    delete createDto.confirmPassword;

    const user = new this.userModel(createDto);
    await user.save();
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).lean();
  }
}
