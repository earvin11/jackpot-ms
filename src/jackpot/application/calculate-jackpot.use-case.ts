import { Injectable } from '@nestjs/common';
import { RedisRpcService } from 'src/shared/services/redis-rpc.service';

@Injectable()
export class CalculateJackpotUseCase {
    constructor(
        private readonly redisRpcService: RedisRpcService
    ) {}
    async run(data: any) {

        const dataByJackpot = await this.redisRpcService.send('get-data-jackpot', {});

        return {
            hello: 'world',
            dataByJackpot
        }
    }
}