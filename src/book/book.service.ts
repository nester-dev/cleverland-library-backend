import { inject, injectable } from 'inversify';
import { IBookModel } from '../models/book.model.interface';
import { TYPES } from '../types';
import { Book } from './book.entity';
import { IBookRepository } from './types/book.repository.interface';
import { IBookService } from './types/book.service.interface';
import { BookCreateDto } from './dto/book-create.dto';
import { v4 as uuid } from 'uuid';

@injectable()
export class BookService implements IBookService {
	constructor(@inject(TYPES.BookRepository) private bookRepository: IBookRepository) {}
	async getBooks(): Promise<Book[] | null> {
		const books = await this.bookRepository.getBooks();

		if (!books) {
			return null;
		}

		return books?.map((book) => {
			return new Book(book.id, book.title, book.rating, book.authors, book.categories, book.images);
		});
	}
	async getBookById(id: string): Promise<Book | null> {
		const book = await this.bookRepository.getBookById(id);

		if (!book) {
			return null;
		}

		return new Book(
			book.id,
			book.title,
			book.rating,
			book.authors,
			book.categories,
			book.images,
			book.issueYear,
			book.description,
			book.publish,
			book.pages,
			book.cover,
			book.weight,
			book.format,
			book.ISBN,
			book.producer,
		);
	}
	async createBook(book: BookCreateDto): Promise<IBookModel | null> {
		const id = uuid();
		const newBook = new Book(
			id,
			book.title,
			book.rating,
			book.authors,
			book.categories,
			book.images,
			book.issueYear,
			book.description,
			book.publish,
			book.pages,
			book.cover,
			book.weight,
			book.format,
			book.ISBN,
			book.producer,
		);

		return await this.bookRepository.createBook(newBook);
	}

	async addImagesToBook(
		id: string,
		images: Express.Multer.File[] | { [p: string]: Express.Multer.File[] } | undefined,
	): Promise<IBookModel | null> {
		let imgArray: Express.Multer.File[] = [];

		if (Array.isArray(images)) {
			imgArray = images;
		} else if (typeof images === 'object') {
			Object.values(images).forEach((value) => {
				imgArray = imgArray.concat(value);
			});
		}

		const imagesToSave = imgArray.map((image) => {
			return { url: image.path };
		});

		return await this.bookRepository.addImagesToBook(id, imagesToSave);
	}
}
