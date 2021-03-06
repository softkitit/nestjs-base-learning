import {Body, Controller, Request, Post, Query, UseGuards, SetMetadata, Get,} from '@nestjs/common';
import {AnyRoleGuard, Public} from 'controllers/abstract.controller';
import {User, UserInput} from 'generator';
import {AuthService, UserService} from 'service';


@Controller('/users')
export class UserController {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }

  @Public()
  @Post('/signin')
  async signIn(@Query('username') username: string,
               @Query('password') password: string
               ) {
    return this.authService.login(username, password);
  }

  @Public()
  @Post('/signup')
  async signUp(@Body() ui: UserInput): Promise<string> {
    const savedUser = await this.authService.signup(ui);
    return this.authService.login(ui.email, ui.password);
  }

  @AnyRoleGuard()
  @Get('/me')
  async me(@Request() req): Promise<User> {
    const user = req.user;
    const userResult = await this.userService.findOneById(user.userId);
    userResult.password = null;
    
    return userResult;
  }

}
