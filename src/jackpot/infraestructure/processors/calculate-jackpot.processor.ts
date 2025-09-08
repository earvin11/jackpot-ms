import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QueueName } from 'src/shared/enums/queue-names.enum';
import { CalculateJackpotUseCaseV2 } from '../../application/jackpot-v2/calculate-jackpot-v2.use-case';

@Processor(QueueName.CALCULATE_JACKPOT)
export class CalculateJackpotProcessor extends WorkerHost {
  constructor(
    private readonly calculateJackpotUseCaseV2: CalculateJackpotUseCaseV2,
  ) {
    super();
  }

  async process(job: Job, token?: string): Promise<any> {
    // Llama al servicio de calculo de jackpot
    return await this.calculateJackpotUseCaseV2.run(job.data);
  }
}
