import { IUserModel } from '../models/types/user.model.interface';

export interface IUserResponse {
	id: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
	createdAt?: Date;
	updatedAt?: Date;
	avatar?: string;
	blocked: boolean;
}

export const getUserResponseFields = (user: IUserModel): IUserResponse => {
	return {
		id: user.id,
		username: user.username,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		phone: user.phone,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
		avatar: user.avatar?.avatarUrl,
		blocked: user.blocked,
	};
};
