import { ICategoriesRepository } from './types/categories.repository.interface';
import CategoriesModel from '../models/Categories.model';
import { ICategoriesModel } from '../models/types/categories.model.interface';
import { injectable } from 'inversify';
import { CategoriesCreateDto } from './dto/categories-create.dto';

@injectable()
export class CategoriesRepository implements ICategoriesRepository {
	async getCategories(): Promise<ICategoriesModel[] | null> {
		return CategoriesModel.find();
	}

	getCategory(name: string): Promise<ICategoriesModel | null> {
		return CategoriesModel.findOne({ name });
	}

	async createCategory({ name, path }: CategoriesCreateDto): Promise<ICategoriesModel> {
		const category = new CategoriesModel({ name, path });

		await category.save();

		return category;
	}
}
