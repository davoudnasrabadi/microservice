
import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req } from '@nestjs/common';
import { User } from '../model/user.entity';
import { RegisterDto, LoginDto } from '../Dto/auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { GrpcMethod} from '@nestjs/microservices';
@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @GrpcMethod('AuthService', 'register')
  private register(data:any): Promise<User | never> {
    return this.service.register(data);
  }

  @GrpcMethod('AuthService', 'login')
  private login(data:any): Promise<string | never> {
    return this.service.login(data);
  }

}