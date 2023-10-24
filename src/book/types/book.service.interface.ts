import { BookCreateDto } from '../dto/book-create.dto';
import { IBookModel } from '../../models/types/book.model.interface';
import { Book } from '../book.entity';

export interface IBookService {
	createBook(book: BookCreateDto): Promise<IBookModel | null>;
	getBooks(): Promise<Book[] | null>;
	getBookById(id: string): Promise<Book | null>;
	addImagesToBook(
		id: string,
		images?: Express.Multer.File[] | { [p: string]: Express.Multer.File[] } | undefined,
	): Promise<IBookModel | null>;
}
