import { Body, Controller, Post } from '@nestjs/common';
import { IsEmail, MinLength } from 'class-validator';
import { AuthUseCase } from 'src/use-cases/auth';

class RegisterDto {
  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authUseCase.register(body.email, body.password);
  }

  @Post('login')
  login(@Body() body: RegisterDto) {
    return this.authUseCase.login(body.email, body.password);
  }
}
