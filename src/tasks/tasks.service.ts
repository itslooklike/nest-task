import { Injectable } from '@nestjs/common'
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

  // FIXME: что-то сделать с undefined
  getTaskById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id)
  }

  // FIXME: что-то сделать с undefined
  deleteTask(id: string): Task | undefined {
    const taskToDelete = this.tasks.find(task => task.id === id)

    if (taskToDelete) {
      this.tasks = this.tasks.filter(task => task.id !== id)
    }

    return taskToDelete
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

  updateTask(id: string, status: TaskStatus): Task | undefined {
    const taskToUpdate = this.getTaskById(id)

    if (taskToUpdate) {
      taskToUpdate.status = status
    }

    return taskToUpdate
  }
}
