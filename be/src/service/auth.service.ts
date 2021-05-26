import {User} from '@models';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {hashPassword, comparePassword} from '@utils';
import {UserInput} from 'generator';
import {UserService} from 'service/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);

    const passwordMatch = await comparePassword(pass, user.password);
    
    if (user && passwordMatch) {
      return user;
    }
    
    throw new HttpException("User is invalid", HttpStatus.BAD_REQUEST);
  }

  async login(email: string, password: string): Promise<string> {
    const payload = await this.validateUser(email, password);
    return this.jwtService.sign({username: payload.email, sub: payload._id});
  }

  async signup(user: UserInput): Promise<User> {
    const existingUser = await this.userService.findOneByEmail(user.email);

    if (existingUser) {
      throw new HttpException('User with such email already exists', HttpStatus.CONFLICT);
    }

    const userToSave = new User(user);
    const password = await hashPassword(user.password);
    userToSave.password = password;
    
    return this.userService.save(userToSave);
  }

}
