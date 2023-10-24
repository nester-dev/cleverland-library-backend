import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class BookingDto {
	@IsBoolean({ message: 'Order must be a boolean' })
	order: boolean;
	@IsNotEmpty({ message: 'Date must not be empty' })
	dateOrder: Date;
	@IsString({ message: 'BookId must be a string' })
	@IsNotEmpty({ message: 'BookId must not be empty' })
	book: string;
	@IsString({ message: 'CustomerId must be a string' })
	@IsNotEmpty({ message: 'CustomerId must not be empty' })
	customer: string;
}
