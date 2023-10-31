import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IImage } from '../../models/types/book.model.interface';

export class BookCreateDto {
	@IsString({ message: 'Title should be a string' })
	@IsNotEmpty({ message: 'Title should not be empty' })
	title: string;
	@IsNumber({}, { message: 'Rating should be a number' })
	@IsOptional()
	rating: number;
	@IsString({ message: 'Issue year should be a string' })
	issueYear: string;
	@IsString({ message: 'Description should be a string' })
	@IsNotEmpty({ message: 'Description should not be empty' })
	description: string;
	@IsString({ message: 'Publish should be a string' })
	@IsOptional()
	publish: string;
	@IsString({ message: 'Pages should be a string' })
	pages: string;
	@IsString({ message: 'Cover should be a string' })
	cover: string;
	@IsString({ message: 'Weight should be a string' })
	@IsOptional()
	weight: string;
	@IsString({ message: 'Format should be a string' })
	@IsOptional()
	format: string;
	@IsString({ message: 'ISBN should be a string' })
	@IsOptional()
	ISBN: string;
	@IsString({ message: 'Producer should be a string' })
	@IsOptional()
	producer: string;
	authors: string[];
	@IsNotEmpty({ message: 'Categories should not be empty' })
	categories: string[];
	images: IImage[];
}
