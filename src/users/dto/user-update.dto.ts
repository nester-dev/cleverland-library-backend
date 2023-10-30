import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UserUpdateDto {
	@IsOptional()
	@IsEmail({}, { message: 'Invalid email' })
	email: string;

	@IsOptional()
	@IsString({ message: 'Invalid username' })
	username: string;

	@IsOptional()
	@IsString({ message: 'Invalid password' })
	@Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
	password: string;

	@IsOptional()
	@IsString({ message: 'Invalid firstName' })
	firstName: string;

	@IsOptional()
	@IsString({ message: 'Invalid lastName' })
	lastName: string;

	@IsOptional()
	@IsString({ message: 'Invalid phone number' })
	phone: string;
}
