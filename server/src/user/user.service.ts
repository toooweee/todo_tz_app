import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // проверка на существующего пользователя
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existUser) {
      throw new BadRequestException('User already exists');
    }

    // если все ок => создаем

    const user = await this.userRepository.save({
      email: createUserDto.email,
      username: createUserDto.username,
      password: await argon2.hash(createUserDto.password),
    });

    const token = this.jwtService.sign({ email: createUserDto.email });

    return { user, token };
  }

  async finOne(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
