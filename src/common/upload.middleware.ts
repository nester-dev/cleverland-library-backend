import { IMiddleware } from './types/middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { TYPES } from '../types';
import { MulterService } from '../multer/multer.service';

export class UploadMiddleware implements IMiddleware {
	constructor(@inject(TYPES.MulterService) private multerService: MulterService) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		return this.multerService.array('files')(req, res, next);
	}
}
