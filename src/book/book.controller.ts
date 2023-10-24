import { IBooksController } from './types/book.controller.interface';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { AuthGuard } from '../common/auth.guard';
import { BookCreateDto } from './dto/book-create.dto';
import { TYPES } from '../types';
import { IBookService } from './types/book.service.interface';
import { HttpError } from '../errors/http-error.class';
import { ValidateMiddleware } from '../common/validate.middleware';
import { AddImagesDto } from './dto/add-images.dto';
import { MulterService } from '../multer/multer.service';
import multer from 'multer';
import { UploadMiddleware } from '../common/upload.middleware';

@injectable()
export class BookController extends BaseController implements IBooksController {
	upload: any;
	constructor(
		@inject(TYPES.BookService) private bookService: IBookService,
		@inject(TYPES.MulterService) private multerService: MulterService,
	) {
		super();
		this.upload = multer({ dest: 'uploads/' });
		this.bindRoutes([
			{
				path: '/',
				method: 'get',
				func: this.getBooks,
				middleware: [new AuthGuard()],
			},

			{
				path: '/:id',
				method: 'get',
				func: this.getBookById,
				middleware: [new AuthGuard()],
			},

			{
				path: '/',
				method: 'post',
				func: this.createBook,
				middleware: [new AuthGuard(), new ValidateMiddleware(BookCreateDto)],
			},

			{
				path: '/',
				method: 'patch',
				func: this.addImagesToBook,
				middleware: [
					new AuthGuard(),
					new ValidateMiddleware(AddImagesDto),
					new UploadMiddleware(this.multerService),
				],
			},
		]);
	}
	async getBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.bookService.getBooks();

		if (!result) {
			return next(new HttpError(422, 'Cannot get books'));
		}
		res.status(200).send({ result });
	}
	async getBookById(req: Request, res: Response, next: NextFunction): Promise<void> {
		const id = req.params.id;
		const result = await this.bookService.getBookById(id);

		if (!result) {
			return next(new HttpError(422, 'Cannot get book by id'));
		}

		res.status(200).send({ result });
	}
	async createBook(
		{ body }: Request<{}, {}, BookCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.bookService.createBook(body);

		if (!result) {
			return next(new HttpError(422, 'Cannot create book'));
		}

		res.status(201).send({ message: 'book created', book: result });
	}

	addImagesToBook(req: Request, res: Response, next: NextFunction): void {
		const images = req?.files;
		const result = this.bookService.addImagesToBook(req.body.id, images);

		if (!result) {
			return next(new HttpError(422, 'Cannot add images to book'));
		}

		res.status(201).send({ message: 'images added' });
	}
}
