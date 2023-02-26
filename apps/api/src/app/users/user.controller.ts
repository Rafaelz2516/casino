import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateBet } from './dto/create-bet.dto';
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

  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentUser(@Request() req): UserDto {
    return new UserDto(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('createBet')
  async createBet(
    @Request() req,
    @Body() { value }: CreateBet
  ): Promise<UserDto> {
    return new UserDto(await this.userService.update(value, req.user));
  }
}
