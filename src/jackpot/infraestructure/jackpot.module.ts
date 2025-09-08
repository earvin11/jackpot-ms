import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { QueueName } from 'src/shared/enums/queue-names.enum';
import { CalculateJackpotUseCaseV2 } from '../application/jackpot-v2/calculate-jackpot-v2.use-case';
import { CalculateJackpotProcessor } from './processors/calculate-jackpot.processor';
import { SharedModule } from 'src/shared/shared.module';
import { CalculateJackpotUseCaseV1 } from '../application/jackpot-v1/calculate-jackpot-v1.use-case';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { RoundBets } from '../application/jackpot-v1/utils/round-bets-utils';
import { JackpotUtils } from '../application/jackpot-v1/utils/jackpot-utils';

@Module({
  imports: [
    BullModule.registerQueue({ name: QueueName.CALCULATE_JACKPOT }),
    SharedModule,
    LoggerModule,
  ],
  providers: [
    CalculateJackpotUseCaseV1, 
    CalculateJackpotUseCaseV2, 
    CalculateJackpotProcessor,
    RoundBets,
    JackpotUtils
  ],
})
export class JackpotModule {}
