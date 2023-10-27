import { BookCreateDto } from '../dto/book-create.dto';
import { IBookModel } from '../../models/types/book.model.interface';

export interface IBookService {
	createBook(book: BookCreateDto): Promise<IBookModel | null>;
	getBooks(): Promise<Partial<IBookModel>[] | null>;
	getBookById(id: string): Promise<Partial<IBookModel> | null>;
	addImagesToBook(
		id: string,
		images?: Express.Multer.File[] | { [p: string]: Express.Multer.File[] } | undefined,
	): Promise<IBookModel | null>;
}
