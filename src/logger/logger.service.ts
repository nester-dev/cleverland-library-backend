import Format, { createLogger, format, Logger, transports } from 'winston';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { ILogger } from './logger.interface';

const { combine, timestamp, colorize, simple, printf } = format;

@injectable()
export class LoggerService implements ILogger {
	logger: Logger;

	constructor() {
		this.logger = createLogger({
			level: 'info',
			format: combine(
				colorize(),
				timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
				simple(),
				this.changeFormat(),
			),
			transports: [new transports.Console()],
		});
	}

	changeFormat(): Format.Logform.Format {
		return printf(({ level, message, label, timestamp }) => {
			return `${timestamp} [${label}] ${level}: ${message}`;
		});
	}

	log(message: string, label?: string): void {
		this.logger.info(message, { label });
	}

	error(message: string, label?: string): void {
		this.logger.info(message, label);
	}
}
