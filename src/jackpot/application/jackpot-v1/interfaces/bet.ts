import { BetFields } from "src/shared/interfaces/bet.interface";

export interface IBetV1 {
    __v:               number;
    _id:               string;
    bet:               BetFields;
    createdAt:         Date;
    currency:          Currency;
    isPaid:            boolean;
    isWinner:          boolean;
    openPay:           boolean;
    roulette:          string;
    round:             string;
    totalAmount:       number;
    totalAmountPayoff: number;
    updatedAt:         Date;
}

export interface Bet {
    _id:     string;
    amount:  number;
    type?:   string;
    number?: number;
}

export interface Currency {
    __v:            number;
    _id:            string;
    createdAt:      Date;
    exchangeApi:    boolean;
    exchangeApiURL: null;
    name:           string;
    short:          string;
    status:         boolean;
    symbol:         string;
    updatedAt:      Date;
    usdExchange:    number;
    uuid:           string;
}
