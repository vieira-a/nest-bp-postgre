import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Config } from '@infra/config/util/config.type';
import { factory } from '@infra/config/util/config.factory';
import { ConfigModule } from '@infra/config/config.module';
import { ConfigService } from '@infra/config/service/config.service';
import { dataSourceOptionsFactory } from './typeorm-datasource.factory';

config();

const getDataSource = async () => {
  const configModule = await NestFactory.createApplicationContext(
    ConfigModule.forRoot({
      load: [factory],
    }),
  );
  const configService = configModule.get<ConfigService<Config>>(ConfigService);
  return new DataSource(dataSourceOptionsFactory(configService));
};

export default getDataSource();
