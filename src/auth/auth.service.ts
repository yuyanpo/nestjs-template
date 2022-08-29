import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UserService) {}

  // 生成token
  createToken(user: Partial<UserEntity>) {
    return this.jwtService.sign(user);
  }

  async login(user: Partial<UserEntity>) {
    const token = this.createToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });
    return { token };
  }

  async getUser(user) {
    return await this.userService.findOne(user.id);
  }
}
