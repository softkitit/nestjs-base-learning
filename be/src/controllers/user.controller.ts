import {Body, Controller, Param, Post, Query,} from '@nestjs/common';
import {User, UserInput} from 'generator';
import {AuthService} from 'service';

@Controller('/users')
export class UserController {

  constructor(
    private authService: AuthService,
  ) {
  }

  @Post('/signin')
  async signIn(@Query('username') username: string,
               @Query('password') password: string
               ) {
    return this.authService.login(username, password);
  }

  @Post('/signup')
  async signUp(@Body() ui: UserInput): Promise<String> {
    const savedUser = await this.authService.signup(ui);
    return this.authService.login(ui.email, ui.password);
  }

  @Post('/me')
  async me(): Promise<User> {
    return null;
  }

}
