import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { QueueName } from 'src/shared/enums/queue-names.enum';
import { CalculateJackpotUseCase } from '../application/calculate-jackpot.use-case';
import { CalculateJackpotProcessor } from './processors/calculate-jackpot.processor';

@Module({
    imports: [
        // MongooseModule.forFeature([
        //     {
        //         name:,
        //         schema,
        //     }
        // ])

        BullModule.registerQueue(
            { name: QueueName.CALCULATE_JACKPOT }
        )
    ],
    providers: [
        CalculateJackpotUseCase,
        CalculateJackpotProcessor
    ]
})
export class JackpotModule {}