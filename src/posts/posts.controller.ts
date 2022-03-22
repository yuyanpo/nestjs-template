import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 创建文章
  @Post()
  create(@Body() post) {
    return this.postsService.create(post);
  }

  // 获取所有文章 分页
  @Get()
  findAll(@Query() query) {
    return this.postsService.findAll(query);
  }

  // 获取指定文章
  @Get('/:id')
  findById(@Param('id') id) {
    return this.postsService.findById(id);
  }

  // 更新文章
  @Put('/:id')
  update(@Param('id') id, @Body() post) {
    return this.postsService.updateById(id, post);
  }

  // 删除文章
  @Delete('/:id')
  remove(@Param('id') id) {
    return this.postsService.remove(id);
  }
}
