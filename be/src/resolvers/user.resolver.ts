import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
  Subscription
} from '@nestjs/graphql';
import { getMongoRepository } from 'typeorm';
import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  UserInputError
} from 'apollo-server-core';
import * as uuid from 'uuid';

import { User } from '@models';
import { comparePassword, hashPassword } from '@utils';

import {
  CreateUserInput,
  Result,
  SearchInput,
  UserResult,
} from '../generator/graphql.schema';
import { generateToken, tradeToken, verifyToken} from '@auth';

import { STRIPE_PLAN, USER_SUBSCRIPTION } from '@environments';

@Resolver('User')
export class UserResolver {
  constructor(
  ) {}

  @Query()
  async hello(): Promise<string> {
    return uuid.v1();
  }

  @Query()
  async today(): Promise<Date> {
    return new Date();
  }

  @Query()
  async search(@Args('conditions') conditions: SearchInput): Promise<Result[]> {
    let result;

    const { select, where, order, skip, take } = conditions;

    if (Object.keys(where).length > 1) {
      throw new UserInputError('Your where must be 1 collection.');
    }

    const type = Object.keys(where)[0];

    // const createdAt = { $gte: 0, $lte: new Date().getTime() }

    result = await getMongoRepository(type).find({
      where: where[type] && JSON.parse(JSON.stringify(where[type])),
      order: order && JSON.parse(JSON.stringify(order)),
      skip,
      take
    });

    if (result.length === 0) {
      throw new ForbiddenError('Not found.');
    }

    return result;
  }

  @Query()
  async searchUser(@Args('userIds') userIds: string[]): Promise<UserResult> {
    let result;

    if (userIds.length === 0) {
      throw new UserInputError('userIds can not be blank.');
    }

    result = await getMongoRepository(User).find({
      where: {
        _id: { $in: userIds }
      }
    });

    // tslint:disable-next-line:prefer-conditional-expression
    if (result.length > 1) {
      result = { users: result };
    } else {
      result = result[0];
    }

    return result;
  }

  @Query()
  async me(@Context('currentUser') currentUser: User): Promise<User> {
    return currentUser;
  }

  @Query()
  async users(
    @Args('offset') offset: number,
    @Args('limit') limit: number
  ): Promise<User[]> {
    const users = await getMongoRepository(User).find({
      // where: { email: { $nin: ['trinchinchin@gmail.com'] } },
      // order: { createdAt: -1 },
      skip: offset,
      take: limit,
      cache: true // 1000: 60000 / 1 minute
    });

    return users;
  }

  @Query()
  async user(@Args('_id') _id: string): Promise<User> {
    try {
      const user = await getMongoRepository(User).findOne({ _id });

      if (!user) {
        throw new ForbiddenError('User not found.');
      }

      return user;
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  @Mutation()
  async createUser(
    @Args('input') input: CreateUserInput,
    @Context('pubsub') pubsub: any,
    @Context('req') req: any
  ): Promise<User> {
    try {
      const { email, password } = input;

      let existedUser;

      existedUser = await getMongoRepository(User).findOne({
        where: {
          'local.email': email
        }
      });

      if (existedUser) {
        throw new ForbiddenError('User already exists.');
      }

      // Is there a Google account with the same email?
      existedUser = await getMongoRepository(User).findOne({
        where: {
          $or: [{ 'google.email': email }, { 'facebook.email': email }]
        }
      });

      if (existedUser) {
        // Let's merge them?

        const updateUser = await getMongoRepository(User).save(
          new User({
            ...input,
            local: {
              email,
              password: await hashPassword(password)
            }
          })
        );

        return updateUser;
      }

      const createdUser = await getMongoRepository(User).save(
        new User({
          ...input,
          local: {
            email,
            password: await hashPassword(password)
          }
        })
      );

      pubsub.publish(USER_SUBSCRIPTION, { userCreated: createdUser });

      return createdUser;
    } catch (error) {
      throw new ApolloError(error);
    }
  }

}
