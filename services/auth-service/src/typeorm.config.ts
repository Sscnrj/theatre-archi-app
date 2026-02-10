import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './users/users.entity';

export function buildTypeOrmConfig(): TypeOrmModuleOptions {
  const driver = process.env.DB_DRIVER ?? 'sqlite';

  if (driver === 'postgres') {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: false, // ✅ base existante
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      logging: false,
    };
  }

  // default: sqlite
  return {
    type: 'sqlite',
    database: process.env.SQLITE_PATH ?? 'auth.dev.sqlite',
    entities: [User],
    synchronize: true, // ✅ ok en dev
    logging: false,
  };
}
