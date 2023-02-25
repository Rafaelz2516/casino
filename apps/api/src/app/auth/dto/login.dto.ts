import { UserDto } from './../../users/dto/user.dto';

export class LoginDto {
  username: string;
  password: string;
}

export class JWTTokenResponse {
  token: string | null;
  user: UserDto | null;
}
