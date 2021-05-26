import {User} from '@models';
import {Injectable} from '@nestjs/common';
import {UserRepository} from '../repository';

@Injectable()
export class UserService {

  constructor(private userRepository: UserRepository) {

  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneByEmail(email);
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userRepository.findOneById(id);
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

}
