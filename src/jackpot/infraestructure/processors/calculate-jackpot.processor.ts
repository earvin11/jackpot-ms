import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QueueName } from 'src/shared/enums/queue-names.enum';

@Processor(QueueName.CALCULATE_JACKPOT)
export class CalculateJackpotProcessor extends WorkerHost {

    process(job: Job, token?: string): Promise<any> {
        const { data } = job;
        // Llama al servicio de calculo de jackpot
        console.log({ data });
        throw new Error('Method not implemented.');
    }
}