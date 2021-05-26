import {Expose, plainToClass} from 'class-transformer';
import {Column, Entity, ObjectIdColumn} from 'typeorm';
import * as uuid from 'uuid';

import {Role} from '../generator/graphql.schema';

@Entity({
  name: 'users',
  orderBy: {
    createdAt: 'ASC'
  }
})
export class User {
  @Expose()
  @ObjectIdColumn()
  _id: string;

  @Expose()
  @Column()
  email: string;
  
  @Expose()
  @Column()
  username: string;
  
  @Expose()
  @Column()
  password: string;

  @Expose()
  @Column()
  roles: [Role];
  
  @Expose()
  @Column()
  createdAt: number;
  
  @Expose()
  @Column()
  updatedAt: number;

  constructor(user: Partial<User>) {
    if (user) {
      Object.assign(
        this,
        plainToClass(User, user, {
          excludeExtraneousValues: true
        })
      );
      this._id = this._id || uuid.v1();
      
      this.createdAt = this.createdAt || +new Date();
      this.updatedAt = +new Date();
    }
  }
}
