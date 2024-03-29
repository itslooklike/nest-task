import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import config from 'config'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserRepository } from './user.repository'
import { JwtStrategy } from './jwt.strategy'

const jwtConfig = config.get('jwt') as { secret: string; expiresIn: string }

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
