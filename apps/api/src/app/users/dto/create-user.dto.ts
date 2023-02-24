import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import { IsAgeGreaterOrEqual } from '../decorators/age.decorator';
import { Match } from '../decorators/match.decorator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(5)
  @Matches(/((?=.*\d)(?=.*\W+))(?=.*[a-zA-Z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsString()
  @MinLength(5)
  @Match('password', {
    message: 'Passwords dont match',
  })
  confirmPassword: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsAgeGreaterOrEqual(18, {
    message: 'Should be over 18',
  })
  birthDate: Date;
}
