import { Module } from '@nestjs/common';
import { Config } from '@infra/config/util/config.type';
import { dataSourceOptionsFactory } from './typeorm-datasource.factory';
import { ConfigModule } from '@infra/config/config.module';
import { ConfigService } from '@infra/config/service/config.service';
import { TypeOrmPersistenceModule } from 'src/shared/module/typeorm/typeorm-persistence.module';

@Module({
  imports: [
    TypeOrmPersistenceModule.forRoot({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => {
        return dataSourceOptionsFactory(configService);
      },
    }),
  ],
  //providers: [UserRepository],
  //exports: [UserRepository],
})
export class IdentityPersistenceModule {}
