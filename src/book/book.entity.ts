import { IImage } from '../models/types/book.model.interface';

export class Book {
	constructor(
		private readonly id: string,
		private readonly title?: string,
		private readonly rating?: number,
		private readonly authors?: string[],
		private readonly categories?: string[],
		private readonly images?: IImage[] | IImage,
		private readonly issueYear?: string,
		private readonly description?: string,
		private readonly publish?: string,
		private readonly pages?: string,
		private readonly cover?: string,
		private readonly weight?: string,
		private readonly format?: string,
		private readonly ISBN?: string,
		private readonly producer?: string,
	) {}

	get getCategories(): string[] | undefined {
		return this.categories;
	}
}
