import { Injectable } from '@nestjs/common';
import { BetsTypes } from 'src/shared/enums/bets-types.enum';
import { RpcChannels } from 'src/shared/enums/rpc-channels.enum';
import { RedisRpcService } from 'src/shared/services/redis-rpc.service';
import { Jackpot } from './jackpot-v2/Jackpot';
import { BetEntity } from 'src/shared/interfaces/bet.interface';

@Injectable()
export class CalculateJackpotUseCase {
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
    for (let roundId of data.roundIds) {
      const jackpot = new Jackpot(this.config);
      const bets = allBets.filter(
        (curr) => curr.round.toString() === roundId.toString(),
      );
      const brokenDownBets = this.breakDownBets(bets);
      for (let i = 0; i < brokenDownBets.length; i++) {
        const currentBet = brokenDownBets[i];

        switch (currentBet.type) {
          case BetsTypes.PLENO:
            jackpot.betStraight(`${currentBet.value}`, currentBet.amount);
            break;
          case BetsTypes.SEMI_PLENO:
            jackpot.betSplit(+currentBet.value, currentBet.amount);
            break;
          case BetsTypes.CALLE:
            jackpot.betStreet(+currentBet.value, currentBet.amount);
            break;
          case BetsTypes.LINEA:
            jackpot.betDoubleStreet(+currentBet.value, currentBet.amount);
            break;
          case BetsTypes.CUADRO:
            jackpot.betCorner(+currentBet.value, currentBet.amount);
            break;
          case BetsTypes.CHANCE_SIMPLE:
            jackpot.betHighLow(
              currentBet.value as 'low' | 'high',
              currentBet.amount,
            );
            break;
          case BetsTypes.COLOR:
            jackpot.betColor(
              currentBet.value as 'red' | 'black',
              currentBet.amount,
            );
            break;
          case BetsTypes.DOZEN:
            jackpot.betDozen(currentBet.value as 1 | 2 | 3, currentBet.amount);
            break;
          case BetsTypes.EVEN_ODD:
            jackpot.betEvenOdd(
              currentBet.value as 'even' | 'odd',
              currentBet.amount,
            );
            break;
          case BetsTypes.SPECIAL_CALLE:
            jackpot.betBasket(currentBet.amount);
            break;
          case BetsTypes.COLUMN:
            jackpot.betColumn(currentBet.value as 1 | 2 | 3, currentBet.amount);
            break;
          case 'cubre':
            break;
          default:
            break;
        }
      }

      const resolve = jackpot.resolve(300);
      const jackpots = resolve.result;
      console.log('JACKPOTS: ', jackpots);
    }
  };

  private breakDownBets = (bets: BetEntity[]) => {
    const brokenDownBets: {
      value: string | number;
      amount: number;
      type: string;
    }[] = [];

    for (let bet of bets) {
      Object.keys(bet.bet).forEach((key) => {
        const apuestas = bet.bet[key];

        if (apuestas.length > 0) {
          apuestas.forEach((apuesta) => {
            switch (key) {
              case BetsTypes.PLENO: {
                brokenDownBets.push({
                  value: apuesta.number,
                  amount: apuesta.amount * apuesta.currency.usdExchange,
                  type: BetsTypes.PLENO,
                });
                break;
              }
              case BetsTypes.SEMI_PLENO: {
                brokenDownBets.push({
                  value: apuesta.number,
                  amount: apuesta.amount * apuesta.currency.usdExchange,
                  type: BetsTypes.SEMI_PLENO,
                });
                break;
              }
              case BetsTypes.CALLE: {
                brokenDownBets.push({
                  value: apuesta.numbers,
                  amount: apuesta.amount * apuesta.currency.usdExchange,
                  type: BetsTypes.CALLE,
                });
                break;
              }
              case BetsTypes.CUADRO: {
                brokenDownBets.push({
                  value: apuesta.numbers,
                  amount: apuesta.amount * apuesta.currency.usdExchange,
                  type: BetsTypes.CUADRO,
                });
                break;
              }

              case BetsTypes.LINEA: {
                brokenDownBets.push({
                  value: apuesta.numbers,
                  amount: apuesta.amount * apuesta.currency.usdExchange,
                  type: BetsTypes.LINEA,
                });
                break;
              }

              case BetsTypes.EVEN_ODD: {
                brokenDownBets.push({
                  value: apuesta.type === 'EVEN' ? 'even' : 'odd',
                  amount: apuesta.amount * apuesta.currency.usdExchange,
                  type: BetsTypes.EVEN_ODD,
                });
                break;
              }

              case BetsTypes.COLOR: {
                brokenDownBets.push({
                  value: apuesta.type === 'RED' ? 'red' : 'black',
                  amount: apuesta.amount * apuesta.currency.usdExchange,
                  type: BetsTypes.COLOR,
                });
                break;
              }

              case BetsTypes.COLUMN: {
                brokenDownBets.push({
                  value:
                    apuesta.type === 'FIRST'
                      ? 1
                      : apuesta.type === 'SECOND'
                        ? 2
                        : 3,
                  amount: apuesta.amount * apuesta.currency.usdExchange,
                  type: BetsTypes.COLUMN,
                });
                break;
              }

              case BetsTypes.DOZEN: {
                brokenDownBets.push({
                  value:
                    apuesta.type === 'FIRST'
                      ? 1
                      : apuesta.type === 'SECOND'
                        ? 2
                        : 3,
                  amount: apuesta.amount * apuesta.currency.usdExchange,
                  type: BetsTypes.DOZEN,
                });
                break;
              }

              case BetsTypes.CHANCE_SIMPLE: {
                brokenDownBets.push({
                  value: apuesta.type === '1-18' ? 'low' : 'high',
                  amount: apuesta.amount * apuesta.currency.usdExchange,
                  type: BetsTypes.CHANCE_SIMPLE,
                });
                break;
              }

              case BetsTypes.CUBRE: {
                console.log('TODO: CUBRE');
                break;
              }

              case BetsTypes.SPECIAL_CALLE: {
                brokenDownBets.push({
                  value: 1, // no es necesario, pero algo tengo que poner XD
                  amount: apuesta.amount * apuesta.currency.usdExchange,
                  type: BetsTypes.SPECIAL_CALLE,
                });
              }
            }
          });
        }
      });
    }

    return brokenDownBets;
  };

  private config /*:IConfigJackpot*/ = {
    virtualBank_min: 150,
    virtualBank_max: 500,
    virtualBank_part: 18,
    collectionOfMultipliers: [50, 100, 150, 200, 300, 500, 1000],
    sizeJackpots: 5,
    betPrizeMoney: {
      straightUp: 32,
      split: 18,
      street: 12,
      corner: 8,
      line: 6,
      dozen: 3,
      column: 3,
      redBlack: 1,
      evenOdd: 1,
      lowHigh: 1,
      basket: 7,
    },
  };
}
