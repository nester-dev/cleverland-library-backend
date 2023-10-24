import { NextFunction, Request, Response } from 'express';

export interface IBooksController {
	getBooks(req: Request, res: Response, next: NextFunction): void;
	getBookById(req: Request<{ id: string }, {}, {}>, res: Response, next: NextFunction): void;
	createBook(req: Request, res: Response, next: NextFunction): void;
	addImagesToBook(req: Request, res: Response, next: NextFunction): void;
}
