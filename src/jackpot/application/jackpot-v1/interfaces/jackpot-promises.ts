import { RouletteEntity, RoundEntity } from "./data-from-roulette";
import { BetsType, RoundBetsNumber } from "./round-bets";
import { IBetV1 } from "./bet";

export interface GetJackpotData {
    round: RoundEntity;
    roulette: RouletteEntity;
    numbers: RoundBetsNumber[];
    totalBets: IBetV1[];
    oldJackpots: JackpotType[];
    doubleZero: boolean;
    betNumbers: number[]
}

export interface JackpotType {
    number: number;
    multiplier: number;
}

export interface Analysis {
    posibleResult: number;
    totalAmount: number; // Total apostado en la ronda
    totalToPay: number; // total a pagar en caso de salir el numero
    bets: BetsType; // con el multiplicador aplicado
    winPercent: number; //porcentaje de ganancia, si es negativo es perdida dah
    rtp: number; // porcentaje de pago si es mas de 100% es perdida
    noPlenoAmount: number;
    totalToPay_50: number;
    totalToPay_100: number;
    totalToPay_150: number;
    totalToPay_200: number;
    totalToPay_300: number;
    totalToPay_500: number;
    totalToPay_1000: number;
}

export interface TotalToyPayWithMul {
  totalToPay_50: number;
  totalToPay_100: number;
  totalToPay_150: number;
  totalToPay_200: number;
  totalToPay_300: number;
  totalToPay_500: number;
  totalToPay_1000: number;
}


export const totalToPayInitial: TotalToyPayWithMul = {
  totalToPay_50: 0,
  totalToPay_100: 0,
  totalToPay_150: 0,
  totalToPay_200: 0,
  totalToPay_300: 0,
  totalToPay_500: 0,
  totalToPay_1000: 0,
};