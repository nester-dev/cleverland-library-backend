import { IsString, Length } from 'class-validator';

export class UserLoginDto {
	@IsString({ message: 'Invalid login' })
	identifier: string;

	@IsString({ message: 'Invalid password' })
	@Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
	password: string;
}
