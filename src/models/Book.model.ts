import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IBookModel } from './types/book.model.interface';

const BookSchema: Schema<IBookModel> = new mongoose.Schema({
	id: { type: String, required: [true, 'Id is required'] },
	title: { type: String, required: [true, 'Title is required'] },
	rating: { type: Number, required: [true, 'Rating is required'] },
	issueYear: { type: String, required: [true, 'Issue year is required'] },
	description: { type: String, required: [true, 'Description is required'] },
	publish: { type: String, required: [true, 'Publish is required'] },
	pages: { type: String, required: [true, 'Pages is required'] },
	cover: { type: String, required: [true, 'Cover is required'] },
	weight: { type: String, required: [true, 'Weight is required'] },
	format: { type: String, required: [true, 'Format is required'] },
	ISBN: { type: String, required: [true, 'ISBN is required'] },
	producer: { type: String, required: [true, 'Producer is required'] },
	authors: { type: [String], required: [true, 'Authors is required'] },
	categories: [String],
	images: [{ id: String, url: String }],
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
		},
	],

	booking: {
		id: { type: String, required: [true, 'BookingId is required'] },
		order: Boolean,
		dateOrder: { type: Date, required: [true, 'Date is required'] },
		customerId: { type: String, required: [true, 'CustomerId is required'] },
		customerFirstName: { type: String, required: [true, 'customerFirstName is required'] },
		customerLastName: { type: String, required: [true, 'customerLastName is required'] },
	},
});

export default mongoose.model<IBookModel>('Book', BookSchema);
