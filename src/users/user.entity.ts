import { compare, hash } from 'bcryptjs';
import { IUserModel } from '../models/user.model.interface';

export class User {
	private password: string;
	constructor(
		private readonly id: string,
		private readonly username: string,
		private readonly email: string,
		private readonly blocked: boolean,
		private readonly firstName: string,
		private readonly lastName: string,
		private readonly phone: string,
		private readonly createdAt?: Date,
		private readonly updatedAt?: Date,
		passwordHash?: string,
	) {
		if (passwordHash) {
			this.password = passwordHash;
		}
	}

	public mapUserFields(user: IUserModel): Partial<IUserModel> {
		return {
			id: user.id,
			username: user.username,
			email: user.email,
			blocked: user.blocked,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			firstName: user.firstName,
			lastName: user.lastName,
			phone: user.phone,
		};
	}

	get getPassword(): string {
		return this.password;
	}

	public async setPassword(password: string, salt: number): Promise<void> {
		this.password = await hash(password, salt);
	}

	public async comparePassword(password: string): Promise<boolean> {
		return await compare(password, this.password);
	}
}
