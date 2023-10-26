import { BaseController } from '../common/base.controller';
import { TYPES } from '../types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ICategoriesController } from './types/categories.controller.interface';
import { AuthGuard } from '../common/auth.guard';
import { ICategoriesService } from './types/categories.service.interface';
import { CategoriesCreateDto } from './dto/categories-create.dto';
import { HttpError } from '../errors/http-error.class';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class CategoriesController extends BaseController implements ICategoriesController {
	constructor(@inject(TYPES.CategoriesService) private categoriesService: ICategoriesService) {
		super();
		this.bindRoutes([
			{
				path: '/',
				method: 'get',
				func: this.getCategories,
				middleware: [new AuthGuard()],
			},

			{
				path: '/',
				method: 'post',
				func: this.createCategory,
				middleware: [new AuthGuard(), new ValidateMiddleware(CategoriesCreateDto)],
			},
		]);
	}

	async getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
		const categories = await this.categoriesService.getCategories();

		if (!categories) {
			return next(new HttpError(404, 'Categories not found'));
		}

		res.status(200).send(categories);
	}

	async createCategory(
		{ body }: Request<{}, {}, CategoriesCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const category = await this.categoriesService.createCategory({
			name: body.name,
			path: body.path,
		});

		if (!category) {
			return next(new HttpError(422, 'Category already exists'));
		}

		res.status(201).send({ category, message: 'Category created successfully' });
	}
}
