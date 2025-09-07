import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from 'src/config/envs';
import { RedisRpc } from './shared/services/redis-rpc.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot(envs.dbUri, {
      dbName: envs.dbName,
    }),
    BullModule.forRoot({
      connection: {
        host: envs.redisUri,
        port: envs.redisPort,
        password: envs.redisPassword
      },
    }),
  ],
  providers: [RedisRpc],
  controllers: [AppController]
})
export class AppModule {}
