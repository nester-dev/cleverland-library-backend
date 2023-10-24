import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { Paths, TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { UsersController } from './users/users.controller';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { json } from 'body-parser';
import cors from 'cors';
import { MongodbService } from './database/mongodb.service';
import { IConfigService } from './config/config.service.interface';
import { AuthMiddleware } from './common/auth.middleware';
import { CategoriesController } from './categories/categories.controller';
import { BookController } from './book/book.controller';
import { CommentController } from './comment/comment.controller';

@injectable()
export class App {
	app: Express;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UsersController) private usersController: UsersController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.MongoDBService) private mongodbService: MongodbService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.CategoriesController) private categoriesController: CategoriesController,
		@inject(TYPES.BookController) private bookController: BookController,
		@inject(TYPES.CommentController) private commentController: CommentController,
	) {
		this.app = express();
		this.port = +this.configService.get('PORT') || 8002;
	}

	useMiddleware(): void {
		this.app.use(json());
		this.app.use(cors());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use('/uploads', express.static('uploads'));
		const authMiddleware = new AuthMiddleware(this.configService.get('JWT_SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes(): void {
		this.app.use('/auth', this.usersController.getRouter());
		this.app.use(Paths.Categories, this.categoriesController.getRouter());
		this.app.use(Paths.Books, this.bookController.getRouter());
		this.app.use(Paths.Comments, this.commentController.getRouter());
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();

		await this.mongodbService.connect();
		this.app.listen(this.port);
		this.logger.log(`Server started on ${this.port}`, 'App');
	}
}
