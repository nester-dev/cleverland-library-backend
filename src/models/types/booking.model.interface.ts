import { Document } from 'mongoose';

export interface IBookingModel extends Document {
	id: string;
	order: boolean;
	dateOrder: Date;
	book: string;
	customer: string;
}
