import { IBookingModel } from '../../models/types/booking.model.interface';
import { BookingDto } from '../dto/booking-dto';

export interface IBookingService {
	createBooking(data: BookingDto): Promise<IBookingModel | Error>;
	updateBooking(bookingId: string, data: BookingDto): Promise<IBookingModel | Error | null>;
	deleteBooking(id: string): Promise<IBookingModel | Error | null>;
}
