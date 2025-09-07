import { Module } from '@nestjs/common';
import { RedisRpcService } from './services/redis-rpc.service';

@Module({
    providers: [RedisRpcService],
    exports: [RedisRpcService]
})
export class SharedModule {}