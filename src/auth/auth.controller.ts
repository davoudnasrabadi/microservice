
import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req } from '@nestjs/common';
import { User } from '../model/user.entity';
import { RegisterDto, LoginDto } from '../Dto/auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  private register(@Body() body: RegisterDto): Promise<User | never> {
    return this.service.register(body);
  }

  @Post('login')
  private login(@Body() body: LoginDto): Promise<string | never> {
    return this.service.login(body);
  }

}