import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiErrorResponseSwagger, ApiResponseSwagger, BearerTokenResponseSwagger } from 'src/swagger/type.swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create')
  @ApiOperation({ summary: 'Creates an user in the system' })
  @ApiResponse({
    status: 200,
    description: 'User created',
    type: ApiResponseSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Email already registered',
    type: ApiErrorResponseSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Error while trying to create user',
    type: ApiErrorResponseSwagger,
  })
  createUser(@Body() userData: UserDTO) {
    try {
      return this.authService.createUser(userData);
    } catch {
      throw new InternalServerErrorException(
        'Error while trying to create user',
      );
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login into the system' })
  @ApiResponse({
    status: 200,
    description: 'Login sucess',
    type: BearerTokenResponseSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid password or email',
    type: ApiErrorResponseSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Error while trying to login',
    type: ApiErrorResponseSwagger,
  })
  signIn(@Body() userData: UserDTO) {
    try {
      return this.authService.signIn(userData.email, userData.password);
    } catch {
      throw new InternalServerErrorException('Error while trying to login');
    }
  }
}
