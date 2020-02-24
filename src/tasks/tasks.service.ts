import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from 'src/auth/user.entity'

import { TaskStatus } from './tasks-status.enum'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { TaskRepository } from './tasks.repository'
import { Task } from './tasks.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto, user)
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    })

    if (!found) {
      throw new NotFoundException(`🛑 Task with ID: ${id} Not Found`)
    }
    return found
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const { affected } = await this.taskRepository.delete({
      id,
      userId: user.id,
    })

    if (!affected) {
      throw new NotFoundException(`🛑 Task with ID: ${id} Not Found`)
    }
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user)
  }

  async updateTask(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user)

    task.status = status
    await task.save()

    return task
  }
}
