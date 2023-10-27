import { ICategoriesService } from './types/categories.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ICategoriesRepository } from './types/categories.repository.interface';
import { CategoriesCreateDto } from './dto/categories-create.dto';
import { ICategoriesModel } from '../models/types/categories.model.interface';
import { IBookModel } from '../models/types/book.model.interface';
import { getBookResponseFields } from '../utils/getBookResponseFields';

@injectable()
export class CategoriesService implements ICategoriesService {
	constructor(
		@inject(TYPES.CategoriesRepository) private categoriesRepository: ICategoriesRepository,
	) {}

	async createCategory(dto: CategoriesCreateDto): Promise<ICategoriesModel | null> {
		const isCategoryExists = await this.categoriesRepository.getCategory(dto.name);

		if (isCategoryExists) {
			return null;
		}

		return await this.categoriesRepository.createCategory(dto);
	}

	async getCategories(): Promise<Partial<ICategoriesModel>[] | null | undefined> {
		const result = await this.categoriesRepository.getCategories();

		return result?.map((category) => {
			return {
				id: category._id,
				name: category.name,
				path: category.path,
				booksCount: category.booksCount,
			};
		});
	}

	async getBooksByCategory(categoryName: string): Promise<Partial<IBookModel>[] | null> {
		const books = await this.categoriesRepository.getBooksByCategoryId(categoryName);

		if (!books) {
			return null;
		}

		return getBookResponseFields(books);
	}
}
