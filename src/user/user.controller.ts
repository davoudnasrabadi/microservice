import { Controller, Post,Get, Body, Param, Delete, Put, UsePipes } from '@nestjs/common';
import { GrpcMethod} from '@nestjs/microservices';
import {CreateUserDto} from '../Dto/createUser.dto';
import { UserService } from './user.service';
import { UserById } from '../interfaces/index';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { User } from '../model/user.entity';
import {Observable} from 'rxjs';
import {ValidationPipe} from '../pipes/myPipe';

@Controller('users')
export class UserController {
    constructor(private userService:UserService){}
    
    @GrpcMethod('UsersService', 'CreateOne')
    create(data:any){
        console.log(data);
        return this.userService.createUser(data);
    }
    
    @GrpcMethod('UsersService', 'FindAll')
    getAll(data:any){
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
            email:data.email,
            password:data.password
        }
       return this.userService.updateUser(id,body);
    }

}