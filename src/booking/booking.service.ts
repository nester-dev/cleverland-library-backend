import { Booking } from './booking.entity';
import { IBookingService } from './types/booking.service.interface';
import { IBookingModel } from '../models/types/booking.model.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IBookingRepository } from './types/booking.repository.interface';
import { BookingDto } from './dto/booking-dto';
import { v4 as uuid } from 'uuid';

@injectable()
export class BookingService implements IBookingService {
	constructor(@inject(TYPES.BookingRepository) private bookingRepository: IBookingRepository) {}

	async createBooking({
		book,
		dateOrder,
		order,
		customer,
	}: BookingDto): Promise<IBookingModel | Error> {
		const id = uuid();
		const booking = new Booking(id, order, dateOrder, book, customer);

		return await this.bookingRepository.createBooking(customer, booking);
	}

	async updateBooking(bookingId: string, data: BookingDto): Promise<IBookingModel | Error | null> {
		return await this.bookingRepository.updateBooking(bookingId, data);
	}

	async deleteBooking(id: string): Promise<IBookingModel | Error | null> {
		return await this.bookingRepository.deleteBooking(id);
	}
}
