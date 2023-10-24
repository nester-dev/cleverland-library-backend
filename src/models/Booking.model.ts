import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IBookingModel } from './types/booking.model.interface';

export const BookingSchema: Schema<IBookingModel> = new mongoose.Schema(
	{
		id: { type: String, required: [true, 'Id is required'] },
		order: { type: Boolean, required: [true, 'Order is required'] },
		dateOrder: { type: Date, required: [true, 'Date is required'] },
		book: { type: String, required: [true, 'BookId is required'] },
		customer: { type: String, required: [true, 'CustomerId is required'] },
	},
	{ timestamps: true },
);

export default mongoose.model<IBookingModel>('Booking', BookingSchema);
