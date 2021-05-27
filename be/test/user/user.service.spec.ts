import {HttpException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Test} from '@nestjs/testing';
import {UserController} from 'controllers';
import {Role, UserInput} from 'generator';
import metadata from 'metadata';
import {User} from 'models';
import * as Repositories from 'repository';
import {AuthService, UserService} from 'service';


describe('CatsController', () => {
  let userController: UserController;
  let userService: UserService;
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(metadata).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
    authService = moduleRef.get<AuthService>(AuthService);
    jwtService = moduleRef.get<JwtService>(JwtService);
    //this call is required because of limitations of nest.js testing module
    for (let repository in Repositories) {
      await moduleRef.get<any>(Repositories[repository]).onModuleInit();
      await moduleRef.get<any>(Repositories[repository]).truncate();
    }
  });

  describe('signup success test', () => {
    it('should return a user token and successfully save user to the data', async () => {
      const signUpUser: UserInput = getSignUpUser();

      const token = await userController.signUp(signUpUser);

      //usually token is huge
      expect(token.length).toBeGreaterThan(10);

      const decodedToken = await jwtService.decode(token);

      // id length is always 36
      expect(decodedToken.sub.length).toBe(36);
      expect(decodedToken['username']).toBe(signUpUser.email);
      expect(decodedToken['roles'][0]).toBe(Role.ROLE_CLIENT.toString());

    });
  });


  describe('second signup must return error', () => {
    it('first signup should be ok, second signup should return an error', async () => {
      const signUpUser: UserInput = getSignUpUser();

      // first signup
      const token = await userController.signUp(signUpUser);
      // usually token is huge
      const decodedToken = await jwtService.decode(token);
      // id length is always 36
      expect(decodedToken.sub.length).toBe(36);

      try {
        await userController.signUp(signUpUser);
      } catch (e) {
        expect(e.message).toBe("User with such email already exists");
        return;
      }

      throw new Error('Test failed, it possible to do multiple signup!');
    });
  });

  describe('no such user login', () => {
    it('we should get an error when trying to login with fake user ', async () => {
      const signUpUser: UserInput = getSignUpUser();

      // login
      try {
        const token = await userController.signIn('name', 'password');
      } catch (e) {
        expect(e.message).toBe("User is invalid");
        return;
      }
      
      throw new Error('Test failed, it possible to login without an error!');
    });
  });

  describe('success signup and login', () => {
    it('we shouldn`t get any error when trying to signup and then login', async () => {
      const signUpUser: UserInput = getSignUpUser();
      // first signup
      const signupToken = await userController.signUp(signUpUser);
      const loginToken = await userController.signIn(signUpUser.email, signUpUser.password);
      
      const signupPayload = jwtService.decode(signupToken);
      const loginPayload = jwtService.decode(loginToken);
      
      expect(signupPayload).toStrictEqual(loginPayload);
      expect(signupPayload.sub.length).toBe(36);

    });
  });

  /**
   * this method is mocking call to database, to simulate that user already exists
   * even if database is not set (so we don't have it up and running)
   * so you can change return value to false and then it will try to signup
   */
  describe('mock signup', () => {
    it('check that with mocking we cant do even a first signup', async () => {
      const signUpUser: UserInput = getSignUpUser();

      jest.spyOn(userService, 'findOneByEmail')
        .mockImplementation(() => Promise.resolve(new User(signUpUser)));

      try {
        const signupToken = await userController.signUp(signUpUser);
      } catch (e) {
        expect(e.message).toBe('User with such email already exists');
        return;
      }
      
      throw "Looks like mock doesn't work! Test Failed!";
    });
  });
  
  
  
});


function getSignUpUser(): UserInput {
  return {
    email: 'test@gmail.com',
    password: 'test@gmail.com',
    username: 'username',
    roles: [Role.ROLE_CLIENT]
  };
}
