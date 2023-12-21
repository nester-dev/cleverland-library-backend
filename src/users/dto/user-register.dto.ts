import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Invalid email' })
	email: string;

	@IsString({ message: 'Invalid username' })
	username: string;

	@IsString({ message: 'Invalid password' })
	@IsNotEmpty({ message: 'Password is required' })
	password: string;

	@IsString({ message: 'Invalid firstName' })
	firstName: string;

	@IsString({ message: 'Invalid lastName' })
	lastName: string;

	@IsString({ message: 'Invalid phone number' })
	phone: string;
}
