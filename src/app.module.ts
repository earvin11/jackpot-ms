import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { envs } from 'src/config/envs';
import { JackpotModule } from './jackpot/infraestructure/jackpot.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: envs.redisHost,
        port: envs.redisPort,
        password: envs.redisPassword
      },
    }),
    JackpotModule,
    SharedModule,
  ],
})
export class AppModule {}
