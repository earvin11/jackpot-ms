import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { QueueName } from 'src/shared/enums/queue-names.enum';
import { CalculateJackpotUseCaseV2 } from '../application/jackpot-v2/calculate-jackpot-v2.use-case';
import { CalculateJackpotProcessor } from './processors/calculate-jackpot.processor';
import { SharedModule } from 'src/shared/shared.module';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: QueueName.CALCULATE_JACKPOT }),
    SharedModule,
    LoggerModule,
  ],
  providers: [CalculateJackpotUseCaseV2, CalculateJackpotProcessor],
})
export class JackpotModule {}
