import { IsNotEmpty, IsString } from 'class-validator';

export class CategoriesCreateDto {
	@IsString({ message: 'Name must be a string' })
	@IsNotEmpty({ message: 'Name is required' })
	name: string;

	@IsString({ message: 'Path must be a string' })
	@IsNotEmpty({ message: 'Path is required' })
	path: string;
}
