import { PipeTransform, BadRequestException } from '@nestjs/common'
import { TaskStatus } from '../tasks-status.enum'

export class TaskStatusValidationPipe implements PipeTransform {
  private readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ]

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status)
    return idx !== -1
  }

  transform(value: any) {
    value = value.toUpperCase()

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value}: is an invalid status`)
    }

    return value
  }
}
