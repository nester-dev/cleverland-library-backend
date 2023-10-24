import { IBookingRepository } from './types/booking.repository.interface';
import { Booking } from './booking.entity';
import { IBookingModel } from '../models/types/booking.model.interface';
import BookingModel from '../models/Booking.model';
import { injectable } from 'inversify';
import UserModel from '../models/User.model';
import { HttpError } from '../errors/http-error.class';
import BookModel from '../models/Book.model';
import { BookingDto } from './dto/booking-dto';

@injectable()
export class BookingRepository implements IBookingRepository {
	constructor() {}

	async createBooking(customer: string, data: Booking): Promise<IBookingModel | Error> {
		const user = await UserModel.findOne({ id: customer });
		const book = await BookModel.findOne({ id: data.book });

		if (!user) {
			throw new HttpError(404, 'User not found');
		}

		if (!book) {
			throw new HttpError(404, 'Book not found');
		}

		user.booking = data;
		book.booking = {
			id: data.id,
			order: data.order,
			dateOrder: data.dateOrder,
			customerId: customer,
			customerFirstName: user.firstName,
			customerLastName: user.lastName,
		};
		await user.save();
		await book.save();

		return BookingModel.create(data);
	}

	async updateBooking(
		bookingId: string,
		{ order, dateOrder }: BookingDto,
	): Promise<IBookingModel | Error | null> {
		const booking = await BookingModel.findOne({ id: bookingId });

		if (!booking) {
			throw new HttpError(404, 'Booking not found');
		}

		await UserModel.updateOne(
			{ id: booking.customer },
			{ $set: { 'booking.order': order, 'booking.dateOrder': dateOrder } },
		);
		await BookModel.updateOne(
			{ id: booking.book },
			{ $set: { 'booking.order': order, 'booking.dateOrder': dateOrder } },
		);

		return BookingModel.findOneAndUpdate(
			{ id: bookingId },
			{ $set: { order, dateOrder } },
			{ new: true },
		);
	}

	async deleteBooking(id: string): Promise<IBookingModel | Error | null> {
		const booking = await BookingModel.findOne({ id });

		if (!booking) {
			throw new HttpError(404, 'Booking not found');
		}

		await UserModel.updateOne({ id: booking.customer }, { $set: { booking: null } });
		await BookModel.updateOne({ id: booking.book }, { $set: { booking: null } });

		return BookingModel.findOneAndDelete({ id }, { new: true });
	}
}
