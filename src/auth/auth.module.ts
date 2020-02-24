import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserRepository } from './user.repository'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
