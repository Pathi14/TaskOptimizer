import { Injectable } from '@nestjs/common';

@Injectable()
export class TacheService {
    getTache(): string {
        throw new Error('Method not implemented.');
    }
}
