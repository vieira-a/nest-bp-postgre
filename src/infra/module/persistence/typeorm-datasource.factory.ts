import { Config } from '@infra/config/util/config.type';
import { ConfigService } from '@infra/config/service/config.service';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { join } from 'path';

export const dataSourceOptionsFactory = (
  configService: ConfigService<Config>,
): PostgresConnectionOptions => ({
  type: 'postgres',
  host: configService.get('database.host'),
  port: 5432,
  username: configService.get('database.username'),
  password: configService.get('database.password'),
  database: configService.get('database.database'),
  synchronize: false,
  entities: [join(__dirname, '../../../module/**/*.entity.{ts,js}')],
  migrations: [
    join(__dirname, '../../../module/**/persistence/migration/*-migration.ts'),
  ],
  migrationsRun: false,
  migrationsTableName: 'app_migrations',
  logging: false,
});
