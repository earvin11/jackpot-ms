import { Injectable } from '@nestjs/common';
import { RpcChannels } from 'src/shared/enums/rpc-channels.enum';
import { RedisRpcService } from 'src/shared/services/redis-rpc.service';

@Injectable()
export class CalculateJackpotUseCase {
    constructor(
        private readonly redisRpcService: RedisRpcService
    ) {}
    async run(data: any) {

        const dataByJackpot = await this.redisRpcService.send(RpcChannels.GET_DATA_JACKPOT, {});

        return {
            hello: 'world',
            dataByJackpot
        }
    }
}