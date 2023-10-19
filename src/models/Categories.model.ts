import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { ICategoriesModel } from './categories.model.interface';

const CategoriesSchema: Schema<ICategoriesModel> = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
	},

	path: {
		type: String,
		required: [true, 'Path is required'],
	},

	booksCount: {
		type: Number,
		default: 0,
	},
});

export default mongoose.model<ICategoriesModel>('Categories', CategoriesSchema);
