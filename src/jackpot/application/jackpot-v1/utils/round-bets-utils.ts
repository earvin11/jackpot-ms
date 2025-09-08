import { IBetV1 } from '../interfaces/bet';
import {
  BET_ENUMS,
  RED_NUMBERS,
  RoundBetsNumber,
} from '../interfaces/round-bets';

export class RoundBets {
  constructor() {}

  public useRoundsBets = (
    roundBetsNumber: RoundBetsNumber[],
    currentBet: IBetV1,
  ): RoundBetsNumber[] => {
    const bet = currentBet.bet;
    const roundsNumbers: RoundBetsNumber[] = [];

    roundBetsNumber.forEach((roundBet) => {
      const betsKeys = Object.keys(roundBet.bets);
      const newbets = { ...roundBet.bets };

      betsKeys.forEach((betKey) => {
        switch (betKey) {
          /* ---------- PLENO ---------- */
          case BET_ENUMS.plenoAmount: {
            const pleno = bet.plenoNumbers.find(
              (p) => p.number === roundBet.number,
            );
            if (!pleno) break;
            newbets.plenoAmount =
              roundBet.bets.plenoAmount +
              pleno.amount * currentBet.currency.usdExchange;
            break;
          }

          /* ---------- SEMI-PLENO ---------- */
          case BET_ENUMS.semiPlenoAmount: {
            const pairAmount = new Map<number, number>();
            for (const sp of bet.semiPlenoNumbers) {
              const usd = sp.amount * currentBet.currency.usdExchange;
              pairAmount.set(sp.number, (pairAmount.get(sp.number) || 0) + usd);
            }
            const usd = pairAmount.get(roundBet.number);
            if (usd !== undefined) {
              newbets.semiPlenoAmount = roundBet.bets.semiPlenoAmount + usd;
            }
            break;
          }

          /* ---------- CALLE ---------- */
          case BET_ENUMS.calleAmount: {
            const calleMap = new Map<number, number>();
            for (const c of bet.calleNumbers) {
              const usd = c.amount * currentBet.currency.usdExchange;
              calleMap.set(c.number, (calleMap.get(c.number) || 0) + usd);
            }
            const usd = calleMap.get(roundBet.number);
            if (usd !== undefined) {
              newbets.calleAmount = roundBet.bets.calleAmount + usd;
            }
            break;
          }

          /* ---------- CUADRO ---------- */
          case BET_ENUMS.cuadroAmount: {
            const cuadroMap = new Map<number, number>();
            for (const c of bet.cuadroNumbers) {
              const usd = c.amount * currentBet.currency.usdExchange;
              cuadroMap.set(c.number, (cuadroMap.get(c.number) || 0) + usd);
            }
            const usd = cuadroMap.get(roundBet.number);
            if (usd !== undefined) {
              newbets.cuadroAmount = roundBet.bets.cuadroAmount + usd;
            }
            break;
          }

          /* ---------- LÍNEA ---------- */
          case BET_ENUMS.lineaAmount: {
            const lineaMap = new Map<number, number>();
            for (const l of bet.lineaNumbers) {
              const usd = l.amount * currentBet.currency.usdExchange;
              lineaMap.set(l.number, (lineaMap.get(l.number) || 0) + usd);
            }
            const usd = lineaMap.get(roundBet.number);
            if (usd !== undefined) {
              newbets.lineaAmount = roundBet.bets.lineaAmount + usd;
            }
            break;
          }

          /* ---------- CUBRE 0-1-2 ---------- */
          case BET_ENUMS.cubreFirst: {
            const triada = bet.cubre.find((c) => c.type === '0-1-2');
            if (!triada) break;
            const usd = triada.amount * currentBet.currency.usdExchange;
            if ([0, 1, 2].includes(roundBet.number)) {
              newbets.cubre0_1_2 = roundBet.bets.cubre0_1_2 + usd;
            }
            break;
          }

          /* ---------- CUBRE 0-2-3 ---------- */
          case BET_ENUMS.cubreSecond: {
            const triada = bet.cubre.find((c) => c.type === '0-2-3');
            if (!triada) break;
            const usd = triada.amount * currentBet.currency.usdExchange;
            if ([0, 2, 3].includes(roundBet.number)) {
              newbets.cubre0_2_3 = roundBet.bets.cubre0_2_3 + usd;
            }
            break;
          }
          /* ---------- ODD ---------- */
          case BET_ENUMS.oddAmount: {
            const oddBet = bet.even_odd.find((eo) => eo.type === 'ODD');
            if (!oddBet) break;
            const usd = oddBet.amount * currentBet.currency.usdExchange;
            if (roundBet.number % 2 === 1 && roundBet.number !== 0) {
              newbets.oddAmount = roundBet.bets.oddAmount + usd;
            }
            break;
          }

          /* ---------- EVEN ---------- */
          case BET_ENUMS.evenAmount: {
            const evenBet = bet.even_odd.find((eo) => eo.type === 'EVEN');
            if (!evenBet) break;
            const usd = evenBet.amount * currentBet.currency.usdExchange;
            if (roundBet.number % 2 === 0 && roundBet.number !== 0) {
              newbets.evenAmount = roundBet.bets.evenAmount + usd;
            }
            break;
          }
          /* ---------- FIRST COLUMN ---------- */
          case BET_ENUMS.firstColumnAmount: {
            const col = bet.columns.find((c) => c.type === 'FIRST');
            if (!col) break;
            const usd = col.amount * currentBet.currency.usdExchange;
            if (roundBet.number % 3 === 1 && roundBet.number !== 0) {
              newbets.firstColumnAmount = roundBet.bets.firstColumnAmount + usd;
            }
            break;
          }

          /* ---------- SECOND COLUMN ---------- */
          case BET_ENUMS.secondColumnAmount: {
            const col = bet.columns.find((c) => c.type === 'SECOND');
            if (!col) break;
            const usd = col.amount * currentBet.currency.usdExchange;
            if (roundBet.number % 3 === 2 && roundBet.number !== 0) {
              newbets.secondColumnAmount =
                roundBet.bets.secondColumnAmount + usd;
            }
            break;
          }

          /* ---------- THIRD COLUMN ---------- */
          case BET_ENUMS.thirdColumnAmount: {
            const col = bet.columns.find((c) => c.type === 'THIRD');
            if (!col) break;
            const usd = col.amount * currentBet.currency.usdExchange;
            if (roundBet.number % 3 === 0 && roundBet.number !== 0) {
              newbets.thirdColumnAmount = roundBet.bets.thirdColumnAmount + usd;
            }
            break;
          }
          /* ---------- DOZENS ---------- */
          case BET_ENUMS.firstDozenAmount: {
            const d = bet.dozens.find((x) => x.type === 'FIRST');
            if (!d) break;
            const usd = d.amount * currentBet.currency.usdExchange;
            if (roundBet.number >= 1 && roundBet.number <= 12) {
              newbets.firstDozenAmount = roundBet.bets.firstDozenAmount + usd;
            }
            break;
          }
          case BET_ENUMS.secondDozenAmount: {
            const d = bet.dozens.find((x) => x.type === 'SECOND');
            if (!d) break;
            const usd = d.amount * currentBet.currency.usdExchange;
            if (roundBet.number >= 13 && roundBet.number <= 24) {
              newbets.secondDozenAmount = roundBet.bets.secondDozenAmount + usd;
            }
            break;
          }
          case BET_ENUMS.thirdDozenAmount: {
            const d = bet.dozens.find((x) => x.type === 'THIRD');
            if (!d) break;
            const usd = d.amount * currentBet.currency.usdExchange;
            if (roundBet.number >= 25 && roundBet.number <= 36) {
              newbets.thirdDozenAmount = roundBet.bets.thirdDozenAmount + usd;
            }
            break;
          }

          /* ---------- CHANCE SIMPLE ---------- */
          case BET_ENUMS.chanceSimple1_18: {
            const c = bet.chanceSimple.find((x) => x.type === '1-18');
            if (!c) break;
            const usd = c.amount * currentBet.currency.usdExchange;
            if (roundBet.number >= 1 && roundBet.number <= 18) {
              newbets.chanceSimple1_18 = roundBet.bets.chanceSimple1_18 + usd;
            }
            break;
          }
          case BET_ENUMS.chanceSimple19_36: {
            const c = bet.chanceSimple.find((x) => x.type === '19-36');
            if (!c) break;
            const usd = c.amount * currentBet.currency.usdExchange;
            if (roundBet.number >= 19 && roundBet.number <= 36) {
              newbets.chanceSimple19_36 = roundBet.bets.chanceSimple19_36 + usd;
            }
            break;
          }

          /* ---------- COLOR ---------- */
          case BET_ENUMS.redAmount: {
            const c = bet.color.find((x) => x.type === 'RED');
            if (!c) break;
            const usd = c.amount * currentBet.currency.usdExchange;
            if (RED_NUMBERS.has(roundBet.number)) {
              newbets.redAmount = roundBet.bets.redAmount + usd;
            }
            break;
          }
          case BET_ENUMS.blackAmount: {
            const c = bet.color.find((x) => x.type === 'BLACK');
            if (!c) break;
            const usd = c.amount * currentBet.currency.usdExchange;
            if (
              !RED_NUMBERS.has(roundBet.number) &&
              roundBet.number >= 1 &&
              roundBet.number <= 36
            ) {
              newbets.blackAmount = roundBet.bets.blackAmount + usd;
            }
            break;
          }
          //   PARA RULETAS AMERICANAS:
          /* ---------- CUBRE 0-37-2 ---------- */
          case BET_ENUMS.cubre0_37_2: {
            const cub = bet.cubre?.find((c) => c.type === '0-37-2');
            if (!cub) break;
            const usd = cub.amount * currentBet.currency.usdExchange;
            if ([0, 37, 2].includes(roundBet.number)) {
              newbets.cubre0_37_2 = roundBet.bets.cubre0_37_2 + usd;
            }
            break;
          }

          /* ---------- CUBRE 37-2-3 ---------- */
          case BET_ENUMS.cubre37_2_3: {
            const cub = bet.cubre?.find(
              (c) => c.type === '37-2-3',
            );
            if (!cub) break;
            const usd = cub.amount * currentBet.currency.usdExchange;
            if ([37, 2, 3].includes(roundBet.number)) {
              newbets.cubre37_2_3 = roundBet.bets.cubre37_2_3 + usd;
            }
            break;
          }

          /* ---------- CALLE ESPECIAL 0-37-1-2-3 ---------- */
          case BET_ENUMS.specialCalle: {
            if (!bet.specialCalle?.length) break;
            // acumulamos por si hay varias jugadas
            let totalUsd = 0;
            for (const sc of bet.specialCalle) {
              totalUsd += sc.amount * currentBet.currency.usdExchange;
            }
            if ([0, 37, 1, 2, 3].includes(roundBet.number)) {
              newbets.specialCalle = roundBet.bets.specialCalle + totalUsd;
            }
            break;
          }
        }
      });

      const newNumber: RoundBetsNumber = {
        number: roundBet.number,
        bets: newbets,
      };

      roundsNumbers.push(newNumber);
    });

    return roundsNumbers;
  };
}
