import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('文章')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 创建文章
  @ApiOperation({ summary: '创建文章' })
  @Post()
  create(@Body() post: CreatePostDto) {
    return this.postsService.create(post);
  }

  // 获取所有文章 分页
  @ApiOperation({ summary: '获取所有文章 分页' })
  @Get()
  findAll(@Query() query) {
    return this.postsService.findAll(query);
  }

  // 获取指定文章
  @ApiOperation({ summary: '获取指定ID文章' })
  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.postsService.findById(id);
  }

  // 更新文章
  @ApiOperation({ summary: '更新文章' })
  @Put('/:id')
  update(@Param('id') id, @Body() post) {
    return this.postsService.updateById(id, post);
  }

  // 删除文章
  @ApiOperation({ summary: '删除文章' })
  @Delete('/:id')
  remove(@Param('id') id) {
    return this.postsService.remove(id);
  }
}
