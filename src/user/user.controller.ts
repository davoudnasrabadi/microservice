import { Controller, Post,Get, Body, Param, Delete, Put, UsePipes } from '@nestjs/common';
import { GrpcMethod} from '@nestjs/microservices';
import {CreateUserDto} from '../Dto/createUser.dto';
import { UserService } from './user.service';
import { UserById } from '../interfaces/index';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { User } from '../model/user.entity';
import {Observable} from 'rxjs';
import {ValidationPipe} from '../pipes/myPipe';
import {ResponseDto} from '../Dto/responseDto';
@Controller('users')
export class UserController {
    constructor(private userService:UserService){}
    
    
    @GrpcMethod('UsersService', 'FindAll')
    getAll(data:any){
          console.log('here');
          return this.userService.getAll();
    }
    @GrpcMethod('UsersService', 'FindOne')
    getById(id:any):any{
        const i=id.id;
        return this.userService.getById(i);
    }
    
    @GrpcMethod('UsersService', 'DeleteOne')
    deleteById(id:any){
        const i = id.id;
        return this.userService.deleteById(i);
    }

    @GrpcMethod('UsersService', 'UpdateOne')
    updateUser(data:any){
        const id = data.id;
        const body = {
            username:data.username,
            password:data.password
        }
       return this.userService.updateUser(id,body);
    }

}