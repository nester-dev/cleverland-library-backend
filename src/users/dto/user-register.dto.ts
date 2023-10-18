import { IsEmail, IsString, Length } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Invalid email' })
	email: string;

	@IsString({ message: 'Invalid username' })
	username: string;

	@IsString({ message: 'Invalid password' })
	@Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
	password: string;

	@IsString({ message: 'Invalid firstName' })
	firstName: string;

	@IsString({ message: 'Invalid lastName' })
	lastName: string;

	@IsString({ message: 'Invalid phone number' })
	phone: string;
}
