export const betsInitialValues = {
  plenoAmount: 0,
  semiPlenoAmount: 0,
  calleAmount: 0,
  cuadroAmount: 0,
  lineaAmount: 0,
  cubre0_1_2: 0,
  cubre0_2_3: 0,
  cubre0_37_2: 0,
  cubre37_2_3: 0,
  oddAmount: 0,
  evenAmount: 0,
  firstColumnAmount: 0,
  secondColumnAmount: 0,
  thirdColumnAmount: 0,
  firstDozenAmount: 0,
  secondDozenAmount: 0,
  thirdDozenAmount: 0,
  chanceSimple1_18: 0,
  chanceSimple19_36: 0,
  redAmount: 0,
  blackAmount: 0,
  specialCalle: 0
}

export const RED_NUMBERS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);

export enum BET_ENUMS {
    plenoAmount= "plenoAmount",
    semiPlenoAmount= "semiPlenoAmount",
    calleAmount= "calleAmount",
    cuadroAmount= "cuadroAmount",
    lineaAmount= "lineaAmount",
    cubreFirst= "cubre0_1_2",
    cubreSecond= "cubre0_2_3",
    cubre0_37_2 = "cubre0_37_2",
    cubre37_2_3 = "cubre37_2_3",
    specialCalle = "specialCalle",
    oddAmount= "oddAmount",
    evenAmount= "evenAmount",
    firstColumnAmount= "firstColumnAmount",
    secondColumnAmount= "secondColumnAmount",
    thirdColumnAmount= "thirdColumnAmount",
    firstDozenAmount= "firstDozenAmount",
    secondDozenAmount= "secondDozenAmount",
    thirdDozenAmount= "thirdDozenAmount",
    chanceSimple1_18= "chanceSimple1_18",
    chanceSimple19_36= "chanceSimple19_36",
    redAmount= "redAmount",
    blackAmount= "blackAmount",
};

export type BetTypeKeys = keyof typeof betsInitialValues;

export interface RoundBetsNumber {
  number: number;          // 0-36 (europea) ó 0-37 (americana -> 37 == 00)
  bets: Record<BET_ENUMS, number>;
}

export interface BetsType {
  plenoAmount?: number;
  semiPlenoAmount?: number;
  calleAmount?: number;
  cuadroAmount?: number;
  lineaAmount?: number;
  cubre0_1_2?: number;
  cubre0_2_3?: number;
  oddAmount?: number;
  evenAmount?: number;
  firstColumnAmount?: number;
  secondColumnAmount?: number;
  thirdColumnAmount?: number;
  firstDozenAmount?: number;
  secondDozenAmount?: number;
  thirdDozenAmount?: number;
  chanceSimple1_18?: number;
  chanceSimple19_36?: number;
  redAmount?: number;
  blackAmount?: number;
}

export interface RoundBetsNumersByRoundId {
  roundId:string,
  numbers: RoundBetsNumber[]
}