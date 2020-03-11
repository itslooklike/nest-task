import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import config from 'config'

const dbConfig = config.get('db') as {
  type: 'postgres'
  host: string
  port: number | undefined
  username: string
  password: string
  database: string
  synchronize: boolean
}

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT
    ? parseInt(process.env.RDS_PORT, 10)
    : dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: !!process.env.TYPEORM_SYNC || dbConfig.synchronize,
}
