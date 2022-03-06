import { Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getHello() {
    return this.taskService.getHello();
  }
}
