import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QueueName } from 'src/shared/enums/queue-names.enum';
import { CalculateJackpotUseCase } from '../../application/calculate-jackpot.use-case';

@Processor(QueueName.CALCULATE_JACKPOT)
export class CalculateJackpotProcessor extends WorkerHost {
  constructor(
    private readonly calculateJackpotUseCase: CalculateJackpotUseCase,
  ) {
    super();
  }

  async process(job: Job, token?: string): Promise<any> {
    // Llama al servicio de calculo de jackpot
    return await this.calculateJackpotUseCase.run(job.data);
  }
}
