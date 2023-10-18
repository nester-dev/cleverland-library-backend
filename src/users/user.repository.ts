import { IUserRepository } from './user.repository.interface';
import { User } from './user.entity';
import { injectable } from 'inversify';
import UserModel from '../models/User.model';
import { IUserModel } from '../models/user.model.interface';

@injectable()
export class UserRepository implements IUserRepository {
	async createUser(user: User): Promise<IUserModel> {
		return UserModel.create(user);
	}

	async findUserByUsername(username: string): Promise<IUserModel | null> {
		return UserModel.findOne({ username });
	}

	async findUserById(userId: string): Promise<IUserModel | null> {
		return UserModel.findById(userId);
	}
}
