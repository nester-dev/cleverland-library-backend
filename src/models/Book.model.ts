import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IBookModel } from './types/book.model.interface';

const BookSchema: Schema<IBookModel> = new mongoose.Schema({
	id: { type: String, required: [true, 'Id is required'] },
	title: { type: String, required: [true, 'Title is required'] },
	rating: Number,
	issueYear: { type: String, required: [true, 'Issue year is required'] },
	description: { type: String, required: [true, 'Description is required'] },
	publish: String,
	pages: { type: String, required: [true, 'Pages is required'] },
	cover: { type: String, required: [true, 'Cover is required'] },
	weight: String,
	format: String,
	ISBN: String,
	producer: String,
	authors: { type: [String], required: [true, 'Authors is required'] },
	categories: [String],
	images: [{ id: String, url: String, default: [] }],
	comments: [
		{
			id: { type: String, required: [true, 'Id is required'] },
			rating: Number,
			text: { type: String, required: [true, 'Text is required'] },
			createdAt: Date,
			user: {
				commentUserId: { type: String, required: [true, 'userId is required'] },
				firstName: { type: String, required: [true, 'firstName is required'] },
				lastName: { type: String, required: [true, 'lastName is required'] },
				avatarUrl: { type: String, default: null },
			},
			default: [],
		},
	],

	booking: {
		id: String,
		order: Boolean,
		dateOrder: Date,
		customerId: String,
		customerFirstName: String,
		customerLastName: String,
	},
});

export default mongoose.model<IBookModel>('Book', BookSchema);
