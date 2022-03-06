import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  getHello() {
    return 'hello nestjs';
  }
}
