import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { ICommentModel } from './types/comment.model.interface';

const CommentSchema: Schema<ICommentModel> = new mongoose.Schema(
	{
		id: { type: String, required: [true, 'Id is required'] },
		rating: {
			type: Number,
		},
		text: {
			type: String,
			required: [true, 'Text is required'],
		},
		user: {
			commentUserId: { type: String, required: [true, 'userId is required'] },
			firstName: { type: String, required: true },
			lastName: { type: String, required: true },
			avatarUrl: String,
		},
	},
	{ timestamps: true },
);

export default mongoose.model<ICommentModel>('Comment', CommentSchema);
