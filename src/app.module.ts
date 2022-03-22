import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import envConfig from '../config/env';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        // entities: [TaskEntity], // 手动导入实体
        autoLoadEntities: true, // 自动导入实体
        host: configService.get('DB_HOST', 'localhost'), // 主机 默认为 localhost
        port: configService.get<number>('DB_PORT', 3306), // 端口号
        username: configService.get('DB_USER', 'root'), // 数据库用户名
        password: configService.get('DB_PASSWD', 'root'), // 数据库密码
        database: configService.get('DB_DATABASE', 'tasks'), // 数据库名称
        timezone: '+08:00', // 服务器上配置的时区
        synchronize: true, // 根据实体自动创建数据库表，生产环境建议关闭
      }),
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
