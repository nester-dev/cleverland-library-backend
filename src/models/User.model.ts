import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IUserModel } from './user.model.interface';

const emailRegexpPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UserSchema: Schema<IUserModel> = new mongoose.Schema(
	{
		id: { type: String, required: [true, 'Id is required'] },
		username: {
			type: String,
			required: [true, 'Username is required'],
			unique: true,
		},

		password: {
			type: String,
			required: [true, 'Password is required'],
			minlength: [8, 'Password must be at least 8 characters'],
		},

		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
			validate: {
				validator: function (value: string): boolean {
					return emailRegexpPattern.test(value);
				},
				message: 'Invalid email',
			},
		},

		firstName: {
			type: String,
			required: [true, 'First name is required'],
		},

		lastName: {
			type: String,
			required: [true, 'Last name is required'],
		},

		blocked: {
			type: Boolean,
			default: false,
		},

		phone: {
			type: String,
			required: [true, 'Phone number is required'],
		},

		avatar: {
			type: String,
			default: null,
		},

		comments: [
			{
				id: { type: String, required: [true, 'Id is required'] },
				rating: Number,
				text: { type: String, required: [true, 'Text is required'] },
				bookId: { type: String, required: [true, 'BookId is required'] },
			},
		],
	},
	{ timestamps: true },
);

export default mongoose.model<IUserModel>('User', UserSchema);
