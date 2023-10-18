import { IExceptionFilter } from './exception.filter.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { HttpError } from './http-error.class';
import { NextFunction, Request, Response } from 'express';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
		if (error instanceof HttpError) {
			this.logger.error(`[HttpError] statusCode: ${error.statusCode}, message: ${error.message}`);
			res.status(error.statusCode).send({ message: error.message });
		} else {
			this.logger.error(`${error.message}`);
			res.status(500).send({ message: error.message });
		}
	}
}
