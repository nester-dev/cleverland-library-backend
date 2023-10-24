import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CommentCreateDto {
	@IsString({ message: 'Text should be a string' })
	@IsNotEmpty({ message: 'Text should not be empty' })
	text: string;

	@IsNumber({}, { message: 'Rating should be a number' })
	@Min(0, { message: 'Rating should be at least 0' })
	@Max(5, { message: 'Rating should be maximum 5' })
	rating: number;

	@IsString({ message: 'BookId should be a string' })
	@IsNotEmpty({ message: 'BookId should not be empty' })
	bookId: string;

	@IsString({ message: 'UserId should be a string' })
	@IsNotEmpty({ message: 'UserId should not be empty' })
	userId: string;
}
