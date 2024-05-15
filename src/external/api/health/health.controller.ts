import { Controller, Get } from '@nestjs/common';
// import { initDatabase } from 'src/external/infra/database/sequelize';
import { responseError } from 'src/external/infra/errors/reponse.error';
// import { DatabaseException } from 'src/internal/application/errors';

@Controller('health')
export class HealthController {
    @Get()
    async checkHealth() {
        try {
            // const db = await initDatabase()            
            // if(!db) {
            //     throw new DatabaseException('Sequelize connection not exists.');
            // }
            return { status: 'ok' };
        } catch(error: any) {
            return responseError(error);
        }
    }
}
