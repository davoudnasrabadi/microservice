import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable,from } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../model/user.entity';
import { UserDto } from '../Dto/user.dto';
import {serialize} from 'class-transformer';
import { type } from 'os';
@Injectable()
export class UserService {

   constructor(@InjectRepository(User) private readonly userRepositoy:Repository<User>){
   }

   public async createUser(user: UserDto): Promise<UserDto> {
       return this.userRepositoy.save(user)
   }

    async getAll(){
       let a = await this.userRepositoy.find();
       let d = JSON.stringify(a);
        return {data:d}
       
    }

    async getByUserName(username:string){
        const user = await this.userRepositoy.findOne({
            where:{username:username}
        });
        if(user){
            return user;
        }
        else return null;
    }

    async getById(id){
        try{
         const user=await this.userRepositoy.findOne({id:id});
         if(user == undefined){
            return {msg:"user not found"};
         }
         else return user;
        }
        catch(er){
            return {err:er.message};
        }
    }

    async deleteById(id:string){
        try{
        const user = await this.userRepositoy.findOne({id:id});
        if(user== undefined){

            return {msg:"user not found"};
        }
        await this.userRepositoy.delete(id)
        return {msg:"user deleted"}
       }
    catch(err){
        return {err:err.message}
    }
    }
    async updateUser(id:string,body:any){
      try{
      const user = await this.userRepositoy.findOne({id:id});
      if(user === undefined){
        return {msg:"user not found"};
      }
       await this.userRepositoy.update(id,body);
       return {msg:"user updated"};

    }
      catch(err){
          return {err:err.message};
      }
    }
    

}
