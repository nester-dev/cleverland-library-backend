import { IBookModel, IImage } from '../models/book.model.interface';
import { Book } from './book.entity';

export interface IBookRepository {
	getBooks(): Promise<IBookModel[] | null>;
	getBookById(id: string): Promise<IBookModel | null>;
	createBook(book: Book): Promise<IBookModel | null>;
	addImagesToBook(id: string, newImages: IImage[]): Promise<IBookModel | null>;
}
