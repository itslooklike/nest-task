import { Injectable, NotFoundException } from '@nestjs/common'
import nanoid from 'nanoid'
import { Task, TaskStatus } from './tasks.model'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id)

    if (!found) {
      throw new NotFoundException(`🛑 Task with ID: ${id} Not Found`)
    }

    return found
  }

  getTasksWithFilters(filterDot: GetTasksFilterDto): Task[] {
    const { status, search } = filterDot
    let tasks = this.getAllTasks()

    if (status) {
      tasks = tasks.filter(task => task.status === status)
    }

    if (search) {
      const lowerSearch = search.toLowerCase()
      tasks = tasks.filter(
        task =>
          task.title.toLowerCase().includes(lowerSearch) ||
          task.description.toLowerCase().includes(lowerSearch),
      )
    }

    return tasks
  }

  deleteTask(id: string): void {
    const taskToDelete = this.getTaskById(id)
    this.tasks = this.tasks.filter(task => task.id !== taskToDelete.id)
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto
    const task: Task = {
      id: nanoid(),
      title,
      description,
      status: TaskStatus.OPEN,
    }

    this.tasks.push(task)

    return task
  }

  updateTask(id: string, status: TaskStatus): Task {
    const taskToUpdate = this.getTaskById(id)

    if (taskToUpdate) {
      taskToUpdate.status = status
    }

    return taskToUpdate
  }
}
