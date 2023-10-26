import { ICategoriesModel } from '../../models/types/categories.model.interface';
import { CategoriesCreateDto } from '../dto/categories-create.dto';

export interface ICategoriesRepository {
	getCategories(): Promise<ICategoriesModel[] | null>;
	getCategory(name: string): Promise<ICategoriesModel | null>;
	createCategory(dto: CategoriesCreateDto): Promise<ICategoriesModel>;
}
