import { RouletteEntity } from "../interfaces/data-from-roulette";
import { Analysis, totalToPayInitial, TotalToyPayWithMul } from "../interfaces/jackpot-promises";
import { BET_ENUMS, RoundBetsNumber } from "../interfaces/round-bets";

export class JackpotUtils {
    constructor(){}

      returnPercentageByResult = (
        numbers: RoundBetsNumber[],
        totalAmount: number,
        roulette: RouletteEntity,
        betNumbers: number[]
    ) => {
        const {
            pleno,
            semipleno,
            calle,
            linea,
            cuadro,
            cubre,
            columna,
            chanceSimple,
            docena,
            multisAllowed,
            specialCalle
        } = roulette;
        const analysis: Analysis[] = [];
        betNumbers.forEach((number: number) => {
            const analisNumber: Analysis = {
                posibleResult: number,
                bets: {},
                totalAmount,
                totalToPay: 0,
                winPercent: 0,
                rtp: 0,
                noPlenoAmount: 0,
                ...totalToPayInitial,
            };
            // betNumbers and betNumber are not the same naming issue i know ;)
            const betNumber = numbers.find((n) => n.number === number);
            if (betNumber) {
                const betsKeys = Object.keys(betNumber.bets);
                betsKeys.forEach((betKey) => {
                    switch (betKey) {
                        case BET_ENUMS.plenoAmount: {
                            const mult = pleno;
                            const totalAmountInBet =
                                (betNumber.bets.plenoAmount as number) * mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber, {
                                    bets: {
                                        [BET_ENUMS.plenoAmount]:
                                            totalAmountInBet,
                                        ...analisNumber.bets,
                                    },
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.semiPlenoAmount: {
                            const mult = semipleno;
                            const totalAmountInBet =
                                (betNumber.bets.semiPlenoAmount as number) *
                                mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.semiPlenoAmount]:
                                        totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.calleAmount: {
                            const mult = calle;
                            const totalAmountInBet =
                                (betNumber.bets.calleAmount as number) * mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.calleAmount]: totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.cuadroAmount: {
                            const mult = cuadro;
                            const totalAmountInBet =
                                (betNumber.bets.cuadroAmount as number) * mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.cuadroAmount]: totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.lineaAmount: {
                            const mult = linea;
                            const totalAmountInBet =
                                (betNumber.bets.lineaAmount as number) * mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.lineaAmount]: totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.cubreFirst: {
                            const mult = cubre;
                            const totalAmountInBet =
                                (betNumber.bets.cubre0_1_2 as number) * mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.cubreFirst]: totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.cubreSecond: {
                            const mult = cubre;
                            const totalAmountInBet =
                                (betNumber.bets.cubre0_2_3 as number) * mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.cubreSecond]: totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.oddAmount: {
                            const mult = chanceSimple;
                            const totalAmountInBet =
                                (betNumber.bets.oddAmount as number) * mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.oddAmount]: totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.evenAmount: {
                            const mult = chanceSimple;
                            const totalAmountInBet =
                                (betNumber.bets.evenAmount as number) * mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.evenAmount]: totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.firstColumnAmount: {
                            const mult = columna;
                            const totalAmountInBet =
                                (betNumber.bets.firstColumnAmount as number) *
                                mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.firstColumnAmount]:
                                        totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.secondColumnAmount: {
                            const mult = columna;
                            const totalAmountInBet =
                                (betNumber.bets.secondColumnAmount as number) *
                                mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.secondColumnAmount]:
                                        totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.thirdColumnAmount: {
                            const mult = columna;
                            const totalAmountInBet =
                                (betNumber.bets.thirdColumnAmount as number) *
                                mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.thirdColumnAmount]:
                                        totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.firstDozenAmount: {
                            const mult = docena;
                            const totalAmountInBet =
                                (betNumber.bets.firstDozenAmount as number) *
                                mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.firstDozenAmount]:
                                        totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.secondDozenAmount: {
                            const mult = docena;
                            const totalAmountInBet =
                                (betNumber.bets.secondDozenAmount as number) *
                                mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.secondDozenAmount]:
                                        totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.thirdDozenAmount: {
                            const mult = docena;
                            const totalAmountInBet =
                                (betNumber.bets.thirdDozenAmount as number) *
                                mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.thirdDozenAmount]:
                                        totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.chanceSimple1_18: {
                            const mult = chanceSimple;
                            const totalAmountInBet =
                                (betNumber.bets.chanceSimple1_18 as number) *
                                mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.chanceSimple1_18]:
                                        totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.chanceSimple19_36: {
                            const mult = chanceSimple;
                            const totalAmountInBet =
                                (betNumber.bets.chanceSimple19_36 as number) *
                                mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.chanceSimple19_36]:
                                        totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.redAmount: {
                            const mult = chanceSimple;
                            const totalAmountInBet =
                                (betNumber.bets.redAmount as number) * mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.redAmount]: totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.blackAmount: {
                            const mult = chanceSimple;
                            const totalAmountInBet =
                                (betNumber.bets.blackAmount as number) * mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.blackAmount]: totalAmountInBet,
                                });
                            }
                        }
                        break;
                                                case BET_ENUMS.cubre0_37_2: {
                            const mult = cubre;
                            const totalAmountInBet =
                                (betNumber.bets.cubre0_37_2 as number) * mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.cubre0_37_2]:
                                        totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.cubre37_2_3: {
                            const mult = cubre;
                            const totalAmountInBet =
                                (betNumber.bets.cubre37_2_3 as number) * mult;
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.cubre37_2_3]:
                                        totalAmountInBet,
                                });
                            }
                        }
                        break;
                        case BET_ENUMS.specialCalle: {
                            const mult = specialCalle;
                            const totalAmountInBet =
                                (betNumber.bets.cubre37_2_3 as number) *
                                (mult as number);
                            if (totalAmountInBet) {
                                Object.assign(analisNumber.bets, {
                                    [BET_ENUMS.specialCalle]:
                                        totalAmountInBet,
                                });
                            }
                        }
                        break;
                    }
                });
            }

            let totalToPay = 0;
            Object.values(analisNumber.bets).forEach(
                (val: number) => (totalToPay += val)
            );
            const riskWithoutjack = analisNumber.totalAmount - totalToPay;
            let winPercent = (riskWithoutjack * 100) / analisNumber.totalAmount;
            if (winPercent === Infinity) {
                winPercent = 100;
            }

            const rtp = (totalToPay * 100) / totalAmount;
            const plenoAmount = analisNumber.bets.plenoAmount ?? 0;
            const noPlenoAmount = analisNumber.bets.plenoAmount
                ? totalToPay - analisNumber.bets.plenoAmount
                : totalToPay;
            const totalToPlayWithMuls = {
                ...this.useTotalToPayWithMul(
                    plenoAmount / pleno,
                    noPlenoAmount,
                    multisAllowed
                ),
            };
            Object.assign(analisNumber, {
                winPercent,
                totalToPay,
                rtp,
                noPlenoAmount,
                ...totalToPlayWithMuls,
            });
            analysis.push(analisNumber);
        });

        return analysis;
    };


    useTotalToPayWithMul = (
        plenoAmount: number,
        noPlenoAmounts: number,
        multisAllowed: number[]
    ): TotalToyPayWithMul => {
        const total = {
            ...totalToPayInitial,
        };

        multisAllowed.forEach((mul) => {
            const plenoRisk = plenoAmount * mul;
            const totalToPay = noPlenoAmounts + plenoRisk;

            switch (mul) {
                case 50: {
                    Object.assign(total, {
                        totalToPay_50: totalToPay,
                    });
                    break;
                }
                case 100: {
                    Object.assign(total, {
                        totalToPay_100: totalToPay,
                    });
                    break;
                }
                case 150: {
                    Object.assign(total, {
                        totalToPay_150: totalToPay,
                    });
                    break;
                }
                case 200: {
                    Object.assign(total, {
                        totalToPay_200: totalToPay,
                    });
                    break;
                }
                case 300: {
                    Object.assign(total, {
                        totalToPay_300: totalToPay,
                    });
                    break;
                }
                case 500: {
                    Object.assign(total, {
                        totalToPay_500: totalToPay,
                    });
                    break;
                }
                case 1000: {
                    Object.assign(total, {
                        totalToPay_1000: totalToPay,
                    });
                    break;
                }
            }
        });
        return total;
    };
}