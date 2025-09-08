import { Injectable } from '@nestjs/common';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { RpcChannels } from 'src/shared/enums/rpc-channels.enum';
import { BetEntity } from 'src/shared/interfaces/bet.interface';
import { RedisRpcService } from 'src/shared/services/redis-rpc.service';
import {
  DataFromRoulette,
  RouletteEntity,
  RoundEntity,
} from './interfaces/data-from-roulette';
import {
  betsInitialValues,
  RoundBetsNumber,
  RoundBetsNumersByRoundId,
} from './interfaces/round-bets';
import { IBetV1 } from './interfaces/bet';
import { RoundBets } from './utils/round-bets-utils';
import { GetJackpotData } from './interfaces/jackpot-promises';
import { JackpotUtils } from './utils/jackpot-utils';

@Injectable()
export class CalculateJackpotUseCaseV1 {
  constructor(
    private readonly redisRpcService: RedisRpcService,
    private readonly loggerPort: LoggerPort,
    private readonly roundBets: RoundBets,
    private readonly jackpotUtils: JackpotUtils
  ) {}

  public run = async (data: DataFromRoulette) => {
    this.loggerPort.log('Data received for jackpot calculation:', data);

    const { roulettes, rounds } = data;

    const roundsIds = rounds.map((e) => e._id);

    const allBets: IBetV1[] = await this.redisRpcService.send(
      RpcChannels.GET_ALL_BETS_ROUNDS_IDS,
      { roundsIds },
    );

    this.calculateJackpot({ bets: allBets, roulettes, roundsIds, rounds });
  };

  public calculateJackpot = async ({
    bets,
    roundsIds,
    roulettes,
    rounds,
  }: {
    bets: IBetV1[];
    roundsIds: string[];
    roulettes: RouletteEntity[];
    rounds: RoundEntity[];
  }) => {
    const isThereDoubleZero = Boolean(roulettes.find((r) => r.doubleZero));

    const EUROPEAN_NUMBERS = this.createEmptyRounds(false);
    let AMERICAN_NUMBERS = [];

    if (isThereDoubleZero) {
      AMERICAN_NUMBERS = this.createEmptyRounds(true);
    }

    let roundNumbersByRoundId: RoundBetsNumersByRoundId[] = [];

    for (let i = 0; i < roundsIds.length; i++) {
      const roundId = roundsIds[i];

      const betsRound = bets.filter(
        (t) => t.round.toString() === roundId.toString(),
      );

      for (let bet of betsRound) {
        const roulette = roulettes.find((r) => bet.roulette === r._id);
        let numbers = [];

        if (roulette.doubleZero) {
          numbers = this.roundBets.useRoundsBets(AMERICAN_NUMBERS, bet);
        } else {
          numbers = this.roundBets.useRoundsBets(EUROPEAN_NUMBERS, bet);
        }

        roundNumbersByRoundId.push({
          roundId,
          numbers,
        });
      }
    }

    const jackpotPromises = rounds.map((round) => {
      const rouletteFiltered = roulettes.find((r) => r._id === round.roulette);
      const dataPromise = {
        round,
        roulette: rouletteFiltered!,
        numbers: roundNumbersByRoundId.length ? roundNumbersByRoundId.find(
          (r) => r.roundId === round?._id?.toString(),
        )!.numbers! : [],
        totalBets: bets.filter(
          (t) => t.round.toString() === round._id.toString(),
        ),
        oldJackpots: [],
        doubleZero: rouletteFiltered.doubleZero!,
        betNumbers: rouletteFiltered.doubleZero ? Array.from({ length: 38 }, (_, index) => index) : Array.from({ length: 37 }, (_, index) => index)
      };
      return this.getJackpotPromise(dataPromise);
    });

    const data = await Promise.all(jackpotPromises);
    this.loggerPort.log('AFTER PROMISES',{
      data
    })
  };

  private getJackpotPromise = async (data: GetJackpotData) => {

    return new Promise( (res) => {

    const { round, roulette, numbers, totalBets, doubleZero, oldJackpots,betNumbers } =
      data;

      const totalAmount = totalBets.reduce((acc,curr) => acc += curr.totalAmount * curr.currency.usdExchange,0)

      const analisis = this.jackpotUtils.returnPercentageByResult(numbers,totalAmount,roulette,betNumbers)
      
      res({totalAmount,analisis})
    })
  };

  private createEmptyRounds = (isAmerican: boolean): RoundBetsNumber[] => {
    const max = isAmerican ? 38 : 37; // 0..36 ó 0..37
    return Array.from({ length: max }, (_, idx) => ({
      number: idx,
      bets: { ...betsInitialValues },
    }));
  };
}
