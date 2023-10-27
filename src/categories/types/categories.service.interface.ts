import { CategoriesCreateDto } from '../dto/categories-create.dto';
import { ICategoriesModel } from '../../models/types/categories.model.interface';
import { IBookModel } from '../../models/types/book.model.interface';

export interface ICategoriesService {
	getCategories(): Promise<Partial<ICategoriesModel>[] | null | undefined>;
	getBooksByCategory(categoryName: string): Promise<Partial<IBookModel>[] | null>;
	createCategory(dto: CategoriesCreateDto): Promise<ICategoriesModel | null>;
}
