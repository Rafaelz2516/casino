import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../users/schemas/user.schema';
import { UserService } from '../users/user.service';
import { JWTTokenResponse } from './dto/login.dto';

const AUTH_ERROR_MSG = 'User credentials are wrong or user does not exist!';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async loginUser(
    username: string,
    password: string
  ): Promise<JWTTokenResponse> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new BadRequestException(AUTH_ERROR_MSG);
    }
    try {
      const token = await this.jwtService.signAsync(
        {
          id: user._id,
          username: user.username,
        },
        {}
      );
      return { token };
    } catch (e) {
      return { token: null };
    }
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new BadRequestException(AUTH_ERROR_MSG);
    }
    const isValidPassword = await this.verifyPassword(password, user.password);
    if (isValidPassword) {
      return user;
    }
    return null;
  }

  async createPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
