import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateJackpotUseCase {
    async run(data: any) {
        return {
            hello: 'world'
        }
    }
}