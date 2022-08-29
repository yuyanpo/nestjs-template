import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async register(createUserDto: CreateUserDto) {
    const { username } = createUserDto;

    const existUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id);
    // TypeOrm 0.3.0 已经不支持直接传 id 查询
    /* return await this.userRepository.findOne({
      where: { id },
    }); */
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
