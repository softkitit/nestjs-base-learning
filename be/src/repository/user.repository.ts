import {User} from '@models';
import {Injectable} from '@nestjs/common';
import {AbstractRepository} from 'repository/abstract.repository';

@Injectable()
export class UserRepository extends AbstractRepository<User> {

  constructor() {
    super(User);
  }

  public findOneByEmail(email: string): Promise<User> {

    return this.mongoRepository.findOne({
      where: {
        email
      }
    });
  }

}
