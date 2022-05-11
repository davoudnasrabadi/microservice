import { Controller, Post,Get, Body, Param, Delete, Put, UsePipes,Logger, UseGuards, Req } from '@nestjs/common';
import { GrpcMethod} from '@nestjs/microservices';
import {CreateUserDto} from '../Dto/createUser.dto';
import { UserService } from './user.service';
import { UserById } from '../interfaces/index';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { User } from '../model/user.entity';
import {Observable} from 'rxjs';
import {ValidationPipe} from '../pipes/myPipe';
import {ResponseDto} from '../Dto/responseDto';
import {deleteMsg,updateMsg,AllMsg,UserByIdDto,errorMsg} from '../Dto/responseDto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@Controller('users')
export class UserController {
    constructor(private userService:UserService){}
    private readonly logger = new Logger(UserController.name);
    
    @GrpcMethod('UsersService', 'FindAll')
    getAll(@Req() req:any):Promise<AllMsg>{
          this.logger.log("Inside getAll of microservice....")
          return this.userService.getAll();
    }
    @GrpcMethod('UsersService', 'FindOne')
    getById(id:any):Promise<UserByIdDto | errorMsg>{
        this.logger.log("Inside getById of microservice....")
        const i=id.id;
        return this.userService.getById(i);
    }
    
    @GrpcMethod('UsersService', 'DeleteOne')
    deleteById(id:any):Promise<deleteMsg>{
        this.logger.log("Inside deleteById of microservice....")
        const i = id.id;
        return this.userService.deleteById(i);
    }

    @GrpcMethod('UsersService', 'UpdateOne')
    updateUser(data:any):Promise<updateMsg>{
        this.logger.log("Inside updateUser of microservice....")
        const id = data.id;
        const body = {
            username:data.username,
            password:data.password
        }
       return this.userService.updateUser(id,body);
    }

}