import { TYPESOLUTION } from '../enums/TYPESOLUTION';

export interface ReportInterface {
  virtualBank: number;
  balanceAvailableForRewards: number;
  fragmentNoBets: number;
  fragmentBetsNotStraight: number;
  fragmentBetsStraight: number;
  stakeAmount: number;
  solution: TYPESOLUTION;
  path: string;
}
