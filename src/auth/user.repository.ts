import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { Repository, EntityRepository } from 'typeorm'
import bcrypt from 'bcryptjs'

import { User } from './user.entity'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto
    const user = await this.findOne({ username })

    if (user && (await user.validatePassword(password))) {
      return user.username
    } else {
      // return null
      return ''
    }
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto
    const salt = await bcrypt.genSalt()
    const user = new User()

    user.username = username
    user.salt = salt
    user.password = await this.hashPassword(password, salt)

    try {
      await user.save()
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }
}
