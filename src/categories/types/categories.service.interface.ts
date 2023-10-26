import { CategoriesCreateDto } from '../dto/categories-create.dto';
import { ICategoriesModel } from '../../models/types/categories.model.interface';

export interface ICategoriesService {
	getCategories(): Promise<ICategoriesModel[] | null>;
	createCategory(dto: CategoriesCreateDto): Promise<ICategoriesModel | null>;
}
