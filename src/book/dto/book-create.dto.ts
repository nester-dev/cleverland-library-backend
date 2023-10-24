import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IImage } from '../../models/types/book.model.interface';

export class BookCreateDto {
	@IsString({ message: 'Title should be a string' })
	@IsNotEmpty({ message: 'Title should not be empty' })
	title: string;
	@IsNumber({}, { message: 'Rating should be a number' })
	rating: number;
	@IsString({ message: 'Issue year should be a string' })
	issueYear: string;
	@IsString({ message: 'Description should be a string' })
	@IsNotEmpty({ message: 'Description should not be empty' })
	description: string;
	@IsString({ message: 'Publish should be a string' })
	publish: string;
	@IsString({ message: 'Pages should be a string' })
	pages: string;
	@IsString({ message: 'Cover should be a string' })
	cover: string;
	@IsString({ message: 'Weight should be a string' })
	weight: string;
	@IsString({ message: 'Format should be a string' })
	format: string;
	@IsString({ message: 'ISBN should be a string' })
	ISBN: string;
	@IsString({ message: 'Producer should be a string' })
	producer: string;
	authors: string[];
	@IsNotEmpty({ message: 'Categories should not be empty' })
	categories: string[];
	images: IImage[];
}
