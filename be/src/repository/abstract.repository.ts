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

  public async findOneById(id: string): Promise<T | null> {
    const result = await this.mongoRepository.findOne({
      where: {
        _id: id
      }
    });

    return result;
  }

  onModuleInit(): any {
    this.mongoRepository = getMongoRepository(this.entity);
  }

}
