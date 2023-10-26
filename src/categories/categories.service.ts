import { ICategoriesService } from './types/categories.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ICategoriesRepository } from './types/categories.repository.interface';
import { CategoriesCreateDto } from './dto/categories-create.dto';
import { ICategoriesModel } from '../models/types/categories.model.interface';

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

	async getCategories(): Promise<ICategoriesModel[] | null> {
		return this.categoriesRepository.getCategories();
	}
}
