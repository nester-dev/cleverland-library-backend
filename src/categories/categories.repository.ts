import { ICategoriesRepository } from './types/categories.repository.interface';
import CategoriesModel from '../models/Categories.model';
import { ICategoriesModel } from '../models/types/categories.model.interface';
import { injectable } from 'inversify';
import { CategoriesCreateDto } from './dto/categories-create.dto';
import { IBookModel } from '../models/types/book.model.interface';
import BookModel from '../models/Book.model';

@injectable()
export class CategoriesRepository implements ICategoriesRepository {
	async getCategories(): Promise<ICategoriesModel[] | null> {
		return CategoriesModel.find({}, { __v: 0 });
	}

	getCategory(name: string): Promise<ICategoriesModel | null> {
		return CategoriesModel.findOne({ name });
	}

	getBooksByCategoryId(id: string): Promise<IBookModel[] | null> {
		return BookModel.find({ categories: { $in: [id] } }).collation({ locale: 'ru', strength: 2 });
	}

	async createCategory({ name, path }: CategoriesCreateDto): Promise<ICategoriesModel> {
		const category = new CategoriesModel({ name, path });

		await category.save();

		return category;
	}
}
