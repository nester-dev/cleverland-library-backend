import { IsString } from 'class-validator';

export class UserLoginDto {
	@IsString({ message: 'Invalid login' })
	identifier: string;

	@IsString({ message: 'Invalid password' })
	password: string;
}
