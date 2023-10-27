import { ICategoriesModel } from '../../models/types/categories.model.interface';
import { CategoriesCreateDto } from '../dto/categories-create.dto';
import { IBookModel } from '../../models/types/book.model.interface';

export interface ICategoriesRepository {
	getCategories(): Promise<ICategoriesModel[] | null>;
	getCategory(name: string): Promise<ICategoriesModel | null>;
	getBooksByCategoryId(id: string): Promise<IBookModel[] | null>;
	createCategory(dto: CategoriesCreateDto): Promise<ICategoriesModel>;
}
