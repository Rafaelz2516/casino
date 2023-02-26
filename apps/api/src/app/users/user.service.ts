import {
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
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

  async update(value: number, currentUser: User): Promise<User> {
    if (value > currentUser.balance) {
      throw new NotAcceptableException('Not enough balance!');
    }
    const won = Math.round(Math.random() * 1) % 2 === 0;
    const balance = won
      ? currentUser.balance + value * 2
      : currentUser.balance - value;
    const update = {
      ...currentUser,
      balance,
      updatedAt: new Date(),
    };

    const user = await this.userModel.findOneAndUpdate(
      { username: currentUser.username },
      update,
      {
        new: true,
        useFindAndModify: false,
      }
    );

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
