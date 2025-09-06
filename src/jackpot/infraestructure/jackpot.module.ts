import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { QueueName } from 'src/shared/enums/queue-names.enum';

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
    ]
})
export class JackpotModule {}