import { User } from './user.entity';
import { IUserModel } from '../models/user.model.interface';

export interface IUserRepository {
	createUser(user: User): Promise<IUserModel | null>;
	findUserByUsername(identifier: string): Promise<IUserModel | null>;
	findUserById(userId: string): Promise<IUserModel | null>;
}
