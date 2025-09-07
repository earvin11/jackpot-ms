import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { QueueName } from 'src/shared/enums/queue-names.enum';
import { CalculateJackpotUseCase } from '../application/calculate-jackpot.use-case';
import { CalculateJackpotProcessor } from './processors/calculate-jackpot.processor';
import { JackpotController } from './jackpot.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports: [
        BullModule.registerQueue(
            { name: QueueName.CALCULATE_JACKPOT }
        ),
        SharedModule,
    ],
    providers: [
        CalculateJackpotUseCase,
        CalculateJackpotProcessor
    ],
    controllers: [JackpotController]
})
export class JackpotModule {}