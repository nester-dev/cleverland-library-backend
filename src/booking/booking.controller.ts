import { BaseController } from '../common/base.controller';
import { IBookingController } from './types/booking.controller.interface';
import { AuthGuard } from '../common/auth.guard';
import { ValidateMiddleware } from '../common/validate.middleware';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IBookingService } from './types/booking.service.interface';
import { BookingDto } from './dto/booking-dto';

@injectable()
export class BookingController extends BaseController implements IBookingController {
	constructor(@inject(TYPES.BookingService) private bookingService: IBookingService) {
		super();
		this.bindRoutes([
			{
				path: '/',
				method: 'post',
				func: this.createBooking,
				middleware: [new AuthGuard(), new ValidateMiddleware(BookingDto)],
			},

			{
				path: '/:bookingId',
				method: 'put',
				func: this.updateBooking,
				middleware: [new AuthGuard(), new ValidateMiddleware(BookingDto)],
			},

			{
				path: '/:bookingId',
				method: 'delete',
				func: this.deleteBooking,
				middleware: [new AuthGuard()],
			},
		]);
	}

	async createBooking(
		{ body }: Request<{}, {}, BookingDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const result = await this.bookingService.createBooking(body);

			res.status(201).send({ message: 'booking created', data: result });
		} catch (error) {
			next(error);
		}
	}

	async updateBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.bookingService.updateBooking(req.params.bookingId, req.body);

			res.status(201).send({ message: 'booking updated', data: result });
		} catch (error) {
			next(error);
		}
	}

	async deleteBooking(
		{ params: { bookingId } }: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const result = await this.bookingService.deleteBooking(bookingId);

			res.status(200).send({ message: 'booking deleted', data: result });
		} catch (error) {
			next(error);
		}
	}
}
