import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDTO } from './dto/user-register.dto';
import { LoginUserDto } from './dto/user-login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post('register')
  async register(@Body() registerUser: RegisterUserDTO) {
    return this.usersService.register(registerUser);
  }
}
