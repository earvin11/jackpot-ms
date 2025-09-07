import { Controller, Get } from '@nestjs/common';
import { CalculateJackpotUseCase } from '../application/calculate-jackpot.use-case';

@Controller('jackpot')
export class JackpotController {
    constructor(
        private readonly calculateJackpotUseCase: CalculateJackpotUseCase
    ) {}
    @Get()
    async handleGet() {
        return await this.calculateJackpotUseCase.run({});
    }
}