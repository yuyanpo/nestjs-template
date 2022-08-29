import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { LocalStorage } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { JwtStorage } from './jwt.strategy';

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('SECRET', 'yyp_123456'),
      signOptions: { expiresIn: '4h' },
    };
  },
});

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule, jwtModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStorage, JwtStorage],
  exports: [jwtModule],
})
export class AuthModule {}
