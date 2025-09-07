import { Controller, Get } from "@nestjs/common";
import { RedisRpc } from "./shared/services/redis-rpc.service";

@Controller('test')
export class AppController {

    constructor(
        private readonly redisRpcService: RedisRpc
    ) {}

    @Get('test')
    async test() {
        const data = await this.redisRpcService.send('get-data-jackpot', { roulette: '6' });
        return data;
    }
}