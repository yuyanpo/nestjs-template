import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';

export interface PostDto {
  list: PostEntity[];
  count: number;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
  ) {}

  // 创建文章
  async create(post: Partial<PostEntity>): Promise<PostEntity> {
    return await this.postsRepository.save(post);
  }

  // 获取文章列表
  async findAll(query): Promise<PostDto> {
    const qb = await this.postsRepository.createQueryBuilder('post');
    qb.where('1 = 1');
    qb.orderBy('post.create_time', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const posts = await qb.getMany();
    return { list: posts, count };
  }

  // 获取指定文章
  async findById(id: number): Promise<PostEntity> {
    const found = await this.postsRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return found;
  }

  // 更新文章
  async updateById(id, post): Promise<PostEntity> {
    const existPost = await this.postsRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    const updatePost = this.postsRepository.merge(existPost, post);
    return this.postsRepository.save(updatePost);
  }

  // 删除文章
  async remove(id) {
    const existPost = await this.postsRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return await this.postsRepository.remove(existPost);
  }
}
