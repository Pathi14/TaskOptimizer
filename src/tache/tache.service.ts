import { Injectable } from '@nestjs/common';

@Injectable()
export class TacheService {
    getTache(): string {
        return 'tache créé!';
    }
}
