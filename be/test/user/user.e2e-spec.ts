import { INestApplication } from '@nestjs/common'
import {JwtService} from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing'
import bootstrap from 'bootstrap';
import {Role, UserInput} from 'generator';
import metadata from 'metadata';
import {User} from 'models';
import * as request from 'supertest'
import * as Repositories from 'repository';


describe('AppModule (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule(metadata).compile();

    app = moduleFixture.createNestApplication();
    await bootstrap(app);
    await app.init();
    
    for (let repository in Repositories) {
      await moduleFixture.get<any>(Repositories[repository]).truncate();
    }

    jwtService = moduleFixture.get<any>(JwtService);
  })


  it('Signup & Login & WhoAmI call endpoints', async () => {
    const signupUser = getSignUpUser();
    const httpServer = app.getHttpServer();
    const signupResult = await request(httpServer)
      .post(`/users/signup`)
      .set('Accept', 'application/json')
      .send(signupUser)
      .expect(201);

    const signupToken = signupResult.text;

    const decodeSignUpToken = jwtService.decode(signupToken);
    
    //user id has 36 characters
    expect(decodeSignUpToken.sub.length).toBe(36);

    const loginResult = await request(httpServer)
      .post(`/users/signin?username=${signupUser.email}&password=${signupUser.password}`)
      .set('Accept', 'application/json')
      .send()
      .expect(201);

    const decodeLoginUpToken = jwtService.decode(loginResult.text);

    //user id has 36 characters
    expect(decodeLoginUpToken.sub.length).toBe(36);
    
    //user id must be the same
    expect(decodeLoginUpToken.sub).toBe(decodeSignUpToken.sub);

    const whoAmIResponse = await request(httpServer)
      .post(`/users/me`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${signupToken}`)
      .send()
      // todo status must be 200 here
      .expect(201);

    const userResponse = whoAmIResponse.body as User;
    
    expect(userResponse.username).toBe(signupUser.username);
    expect(userResponse.email).toBe(signupUser.email);
    expect(userResponse.password).toBeNull();
    
  });

  it('User controller validation tests', async () => {
    const signupUser = getSignUpUser();
    const httpServer = app.getHttpServer();

    signupUser.password = "123";
    signupUser.email = "notemail";
    
    const signupResult = await request(httpServer)
      .post(`/users/signup`)
      .set('Accept', 'application/json')
      .send(signupUser).expect([
        {
          "email": ["email must be an email"]
        },
        {
          "password": ["password must be longer than or equal to 8 characters"]
        },
      ]);
    
    const loginWithoutExistingUser = await request(httpServer)
      .post(`/users/signin`)
      .set('Accept', 'application/json')
      .send(signupUser).expect({
        statusCode: 400,
        message: "User is invalid"
      });
    
    const whoamiWithoutAuth = await request(httpServer)
      .post(`/users/me`)
      .set('Accept', 'application/json')
      .send(signupUser).expect({
        statusCode: 401,
        error: "Unauthorized"
      });

  });



  })


function getSignUpUser(): UserInput {
  return {
    email: 'test@gmail.com',
    password: 'test@gmail.com',
    username: 'username',
    roles: [Role.ROLE_CLIENT]
  };
}
