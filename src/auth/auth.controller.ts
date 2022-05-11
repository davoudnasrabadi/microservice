
import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req } from '@nestjs/common';
import { User } from '../model/user.entity';
import { RegisterDto, LoginDto } from '../Dto/auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { GrpcMethod} from '@nestjs/microservices';
import {tokenDto} from './dto.ts/index';
@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @GrpcMethod('UsersService', 'register')
  private async register(data:any):Promise<tokenDto> {
    const d= await this.service.register(data);
    return d;
  }

  @GrpcMethod('UsersService', 'login')
  private login(data:any):Promise<tokenDto>{
    return this.service.login(data);
  }

}