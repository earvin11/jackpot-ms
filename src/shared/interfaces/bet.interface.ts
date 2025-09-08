export interface BetEntity {
  _id?: string;
  transactionId?: string;
  player: string;
  roulette: string;
  round: string;
  type: string;
  endpointError?: boolean;
  geolocation?: string;
  totalAmount: number;
  totalAmountPayoff: number;
  currency: string;
  isPaid?: boolean;
  openPay?: boolean;
  bet: BetFields;
  isWinner?: boolean;
  uuid?: string;
}

export interface NumberBet {
  number: number;
  amount: number;
}
interface EvenOddBet {
  type: 'EVEN' | 'ODD';
  amount: number;
}
interface ColorBet {
  type: 'RED' | 'BLACK';
  amount: number;
}

interface ColumnBet {
  type: 'FIRST' | 'SECOND' | 'THIRD';
  amount: number;
}
interface DozenBet {
  type: 'FIRST' | 'SECOND' | 'THIRD';
  amount: number;
}
interface ChanceSimpleBet {
  type: '1-18' | '19-36';
  amount: number;
}
interface CubreBet {
  type: '0-1-2' | '0-37-2' | '37-2-3';
  amount: number;
}

interface SpecialCalleBet {
  type: '37-0-1-2-3';
  amount: number;
}

export interface BetFields {
  plenoNumbers: NumberBet[];
  semiPlenoNumbers: NumberBet[];
  calleNumbers: NumberBet[];
  cuadroNumbers: NumberBet[];
  lineaNumbers: NumberBet[];
  even_odd: EvenOddBet[];
  color: ColorBet[];
  columns: ColumnBet[];
  dozens: DozenBet[];
  chanceSimple: ChanceSimpleBet[];
  cubre: CubreBet[];
  specialCalle: SpecialCalleBet[];
}
