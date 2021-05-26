import {Body, Controller, Request, Post, Query, UseGuards,} from '@nestjs/common';
import {JwtAuthGuard} from 'auth/guards/jwt-auth.guard';
import {User, UserInput} from 'generator';
import {AuthService, UserService} from 'service';

@Controller('/users')
export class UserController {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
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

  @UseGuards(JwtAuthGuard)
  @Post('/me')
  async me(@Request() req): Promise<User> {
    const user = req.user;
    const userResult = await this.userService.findOneById(user.userId);
    userResult.password = null;
    
    return userResult;
  }

}
