import winston from 'winston';

export interface ILogger {
	logger: winston.Logger;

	log(message: string, label?: string): void;

	error(message: string, label?: string): void;
}
