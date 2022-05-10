import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from '../Dto/auth.dto';
import { AuthHelper } from './auth.helper';
import { Token } from 'src/model/token.entity';
import { use } from 'passport';

@Injectable()
export class AuthService {
   
    @InjectRepository(User)
    private readonly userRepositoy: Repository<User>;
    @InjectRepository(Token)
    private readonly tokenRepository:Repository<Token>;
    @Inject(AuthHelper)
    private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | never> {
    const { username, password }: RegisterDto = body;
    let user: User = await this.userRepositoy.findOne({ where: { username } });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = new User();

    user.username = username;
    user.password = this.helper.encodePassword(password);
    let token = new Token();
    token.token = this.helper.generateToken(user);
    await this.tokenRepository.save(token);
    user.token = token;
    return this.userRepositoy.save(user);
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { username, password }: LoginDto = body;
    const user: User = await this.userRepositoy.findOne({ where: { username } });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    return this.helper.generateToken(user);
  }


}