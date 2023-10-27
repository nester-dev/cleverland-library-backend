import { Document } from 'mongoose';

export interface ICategoriesModel extends Document {
	name: string;
	path: string;
	booksCount: number;
}
