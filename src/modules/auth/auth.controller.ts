import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() userData: UserDTO) {
    return this.authService.signIn(userData.email, userData.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  createUser(@Body() userData: UserDTO) {
    return this.authService.createUser(userData);
  }
}
