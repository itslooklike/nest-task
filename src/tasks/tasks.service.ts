import { Injectable } from '@nestjs/common'
import * as nanoid from 'nanoid'
import { Task, TaskStatus } from './tasks.model'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks() {
    return this.tasks
  }

  createTask(title: string, description: string) {
    const task: Task = {
      id: nanoid(),
      title,
      description,
      status: TaskStatus.OPEN,
    }

    this.tasks.push(task)
    return task
  }
}
