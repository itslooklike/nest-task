import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import config from 'config'
import { AppModule } from './app.module'

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule)

  if (process.env.NODE_ENV === 'development') {
    app.enableCors()
  } else {
    const { origin } = config.get('server') as { origin: string }
    app.enableCors({ origin })
  }

  const serverConfig = config.get('server') as { port: number }

  const port = process.env.PORT || serverConfig.port

  await app.listen(port)
  logger.log(`|> http://localhost:${port}`)
}
bootstrap()
