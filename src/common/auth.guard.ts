import { IMiddleware } from './types/middleware.interface';
import { NextFunction, Request, Response } from 'express';

export class AuthGuard implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req?.userId) {
			return next();
		}
		res.status(401).send({ message: 'not authorized' });
	}
}
