import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { getRepository, Repository } from 'typeorm';
import { LoginUserDto, CreateUserDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne({ email, password }: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email });

    if (!user) return null;
    if (await bcrypt.compare(user.password, password)) return user;

    return null;
  }

  async create(dto: CreateUserDto): Promise<any> {
    const { userName, email, password } = dto;
    // TODO
    const queryBuilder = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.username = :username', { username: userName })
      .orWhere('user.email = :email', { email: email });

    const user = await queryBuilder.getOne();

    if (user)
      throw new HttpException(
        { message: 'error has been' },
        HttpStatus.BAD_REQUEST,
      );

    const newUser = new UserEntity();
    newUser.userName = userName;
    newUser.email = email;
    newUser.password = password;

    const errors = await validate(newUser);

    if (errors.length > 0) {
      throw new HttpException({ message: '' }, HttpStatus.BAD_REQUEST);
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return this.buildUserRO(savedUser);
    }
  }

  private buildUserRO(user: UserEntity) {
    const userRO = {
      id: user.id,
      username: user.userName,
      email: user.email,
      bio: user.bio,
      image: user.image,
    };

    return { user: userRO };
  }
}
