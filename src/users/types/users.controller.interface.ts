import { NextFunction, Request, Response } from 'express';

export interface IUsersController {
	login(req: Request, res: Response, next: NextFunction): void;
	register(req: Request, res: Response, next: NextFunction): void;
	getMe(req: Request, res: Response, next: NextFunction): void;
	updateUser(req: Request, res: Response, next: NextFunction): void;
	updateUserAvatar(req: Request, res: Response, next: NextFunction): void;
}
