export interface DataFromRoulette {
  roundsIds: string[];
  rounds: RoundEntity[];
  roulettes: RouletteEntity[];
  rouletteFisic: RouletteFisicEntity;
  timeToReleaseJack: number;
  bank: number;
}

export interface RoundEntity {
  _id?: string;
  code: string;
  start_date: Date;
  end_date: Date;
  end_recording_date: Date;
  jackpot_values: JackpotValues[];
  result: number;
  providerId: string;
  roulette: string;
  open: boolean;
  number: number;
  identifierNumber: number;
  crupier: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JackpotValues {
  number: number;
  multiplier: number;
}

export interface RouletteEntity {
  type: string;
  doubleZero: boolean;
  language: string;
  status: boolean;
  lastJackpot: number;
  jackpotRounds: number;
  currenJackpotRound: number;
  jackpotWin: any[];
  rollback: boolean;
  active: boolean;
  manualDisable: boolean;
  jackpotRandom: boolean;
  jackpotVersion: string;
  alertEmails: string[];
  maxRepeatedResults: number;
  multisAllowed: number[];
  isManualRoulette: boolean;
  numbersDistribution: string;
  bank: number;
  isShow: boolean;
  openingTime: string;
  closingTime: string;
  alwaysOpen: boolean;
  cameraVersion: string;
  initialBank: number;
  maximunBank: number;
  _id: string;
  name: string;
  code: string;
  logo: string;
  imgBackground: string;
  color: string;
  providerId: string;
  pleno: number;
  semipleno: number;
  cuadro: number;
  calle: number;
  linea: number;
  columna: number;
  docena: number;
  chanceSimple: number;
  specialCalle: number;
  cubre: number;
  minBet: number;
  maxBet: number;
  maxBetPosition: number;
  urlTransmision: string;
  roundDuration: number;
  minutesToDisable: number;
  animals: any[];
  createdAt: Date;
  updatedAt: Date;
  maxPlenosBet: number;
  numbersOfJackpot: number;
}

export enum NumbersDistributionRoulette {
  AMERICAN = 'AMERICAN',
  EUROPEAN = 'EUROPEAN',
}

export interface RouletteFisicEntity {
  _id?: string;
  name: string;
  providerId: string;
  crupier: string;
  urlTransmision: string;
  roundDuration: number;
  jackpot?: boolean;
  minutesToDisable?: number;
  doubleZero?: boolean;
  timeOne: number;
  timeTwo: number;
  timeThree: number;
  timeFour: number;
  aditionalTime: number;
  timeToReleaseJack: number;
  timeToStartAnimation: number;
  animation: number;
}
