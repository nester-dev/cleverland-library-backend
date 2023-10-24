import { IMiddleware } from './types/middleware.interface';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { validate, ValidationError } from 'class-validator';

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}
	execute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = plainToInstance(this.classToValidate, body);

		validate(instance).then((errors: ValidationError[]): void => {
			if (errors.length) {
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	}
}
