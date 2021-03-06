import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from '../Dto/auth.dto';
import { AuthHelper } from './auth.helper';
import { Token } from '../model/token.entity';
import { use } from 'passport';
import {tokenDto,MsgDto} from './dto.ts/index';
@Injectable()
export class AuthService {
   
    @InjectRepository(User)
    private readonly userRepositoy: Repository<User>;
    @InjectRepository(Token)
    private readonly tokenRepository:Repository<Token>;
    @Inject(AuthHelper)
    private readonly helper: AuthHelper;

  public async register(body: RegisterDto):Promise<tokenDto | MsgDto>{
    const { username, password }: RegisterDto = body;
    let user: User = await this.userRepositoy.findOne({ where: { username } });

    if (user) {
      return {msg:"user exists"};
    }

    user = new User();

    user.username = username;
    user.password = this.helper.encodePassword(password);
    let token = new Token();
    token.token = this.helper.generateToken(user);
    await this.tokenRepository.save(token);
    user.token = token;
    await this.userRepositoy.save(user);
    const data = {
        token:token.token
    }
    return data;
  }

  public async login(body: LoginDto): Promise<tokenDto | MsgDto>{
    const { username, password }: LoginDto = body;
    const user: User = await this.userRepositoy.findOne({ where: { username } });

    if (!user) {
      return {msg:"user not found"};
    }
    const id = user.id;
    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);
    if (!isPasswordValid) {
      return {msg:"user password is wrong"};
    }

    const token =this.helper.generateToken(user);
    await this.tokenRepository.update({id:id},{token:token});
    const data = {
      token:token
    }
    return data;
  }
  
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepositoy.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


}