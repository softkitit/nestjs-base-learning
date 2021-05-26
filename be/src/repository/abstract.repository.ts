import {OnModuleInit} from '@nestjs/common';
import {EntityTarget, getMongoRepository} from 'typeorm';
import {MongoRepository} from 'typeorm/repository/MongoRepository';

export class AbstractRepository<T> implements OnModuleInit {

  protected mongoRepository: MongoRepository<T>;
  protected entity: EntityTarget<T>;

  constructor(entity: EntityTarget<T>) {
    this.entity = entity;
  }

  public save(user: T): Promise<T> {
    return this.mongoRepository.save(user);
  }

  public async findOnById(id: string): Promise<T | null> {
    const result = await this.mongoRepository.findByIds([id]);

    if (result.length === 0) {
      return null;
    } else {
      return result[0];
    }
  }

  onModuleInit(): any {
    this.mongoRepository = getMongoRepository(this.entity);
  }

}
