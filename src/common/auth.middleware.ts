import { IMiddleware } from './types/middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			const token = req.headers.authorization.replace(/Bearer\s?/, '');

			verify(token, this.secret, (err, payload) => {
				if (err) {
					return next();
				}

				if (payload && typeof payload !== 'string') {
					req.userId = payload.userId;
					next();
				}
			});
		} else {
			next();
		}
	}
}
