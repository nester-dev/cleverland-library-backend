export class Booking {
	constructor(
		public readonly id: string,
		public readonly order: boolean,
		public readonly dateOrder: Date,
		public readonly book: string,
		public readonly customer: string,
	) {}
}
