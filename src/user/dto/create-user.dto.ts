import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空！' })
  readonly username: string;

  @ApiProperty({ description: '昵称' })
  readonly nickname: string;

  @ApiProperty({ description: '密码' })
  readonly password: string;

  @ApiProperty({ description: '头像' })
  readonly avatar: string;

  @ApiProperty({ description: '邮箱' })
  readonly email: string;

  @ApiProperty({ description: '角色' })
  readonly role: string;
}
