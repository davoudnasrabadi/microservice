import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from '../model/user.entity';
import {Token} from '../model/token.entity';
@Module({
  imports:[
    TypeOrmModule.forFeature([User,Token])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
