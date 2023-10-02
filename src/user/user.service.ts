import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  private readonly users: Array<User> = [
    {
      uuid: "1",
      email: 'john',
      password: 'changeme',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
    {
      uuid: '2',
      email: 'maria',
      password: 'guess',
      updatedAt: new Date(),
      createdAt: new Date(),
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}
