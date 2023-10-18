import * as mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class MongodbService {
	mongoose: typeof mongoose;
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.mongoose = mongoose;
	}

	async connect(): Promise<void> {
		const url = this.configService.get('DB_URL') || '';

		try {
			await this.mongoose.connect(url);
			this.logger.log('Connected to MongoDB', 'MongodbService');
		} catch (error) {
			this.logger.error('Could not connect to MongoDB', 'MongodbService');
		}
	}
}
