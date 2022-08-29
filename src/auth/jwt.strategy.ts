import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, StrategyOptions, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';

export class JwtStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET'),
    } as StrategyOptions);
  }

  async validate(user: UserEntity) {
    // console.log('user: ', user);
    const existUser = await this.authService.getUser(user);
    if (!existUser) {
      throw new UnauthorizedException('Token error');
    }
    return existUser;
  }
}
