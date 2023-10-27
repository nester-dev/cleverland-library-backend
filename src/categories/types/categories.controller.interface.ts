import { NextFunction, Request, Response } from 'express';

export interface ICategoriesController {
	getCategories(req: Request, res: Response, next: NextFunction): Promise<void>;
	getBooksByCategoryName(req: Request, res: Response, next: NextFunction): Promise<void>;
	createCategory(req: Request, res: Response, next: NextFunction): Promise<void>;
}
