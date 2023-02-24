import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      return new UserDto(await this.userService.create(createUserDto));
    } catch (error) {
      throw new BadRequestException('Registration failed');
    }
  }
}
