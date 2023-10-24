import { Document } from 'mongoose';

export interface ICommentModel extends Document {
	id: string;
	rating: number;
	text: string;
	createdAt: Date;
	user: {
		commentUserId: string;
		firstName: string;
		lastName: string;
		avatarUrl: string;
	};
}
