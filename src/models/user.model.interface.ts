import { Document } from 'mongoose';

export interface IUserModel extends Document {
	username: string;
	email: string;
	blocked: boolean;
	firstName: string;
	lastName: string;
	phone: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
}
