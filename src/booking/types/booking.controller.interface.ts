import { NextFunction, Request, Response } from 'express';

export interface IBookingController {
	createBooking(req: Request, res: Response, next: NextFunction): void;
	updateBooking(req: Request, res: Response, next: NextFunction): void;
	deleteBooking(req: Request, res: Response, next: NextFunction): void;
}
