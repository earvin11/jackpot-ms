import { Injectable } from '@nestjs/common';
import { RpcChannels } from 'src/shared/enums/rpc-channels.enum';
import { BetEntity } from 'src/shared/interfaces/bet.interface';
import { RedisRpcService } from 'src/shared/services/redis-rpc.service';

@Injectable()
export class CalculateJackpotUseCaseV1 {
  constructor(private readonly redisRpcService: RedisRpcService) {}

  async run(data: { roundIds: string[] }) {
    const allBets: BetEntity[] = await this.redisRpcService.send(
      RpcChannels.GET_ALL_BETS_ROUNDS_IDS,
      { roundsIds: data.roundIds },
    );

      this.calculateJackpot(data, allBets);
  }

  public calculateJackpot = async (
    data: { roundIds: string[] },
    allBets: BetEntity[],
  ) => {
    console.log('Calculating jackpot for rounds:', data.roundIds);
    console.log('Total bets received:', allBets.length);
  };
}
