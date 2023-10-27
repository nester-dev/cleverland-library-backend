import { inject, injectable } from 'inversify';
import { IBookModel } from '../models/types/book.model.interface';
import { TYPES } from '../types';
import { Book } from './book.entity';
import { IBookRepository } from './types/book.repository.interface';
import { IBookService } from './types/book.service.interface';
import { BookCreateDto } from './dto/book-create.dto';
import { v4 as uuid } from 'uuid';
import { IStorageService } from '../storage/types/storage.service.interface';
import { getBookResponseFields } from '../utils/getBookResponseFields';

@injectable()
export class BookService implements IBookService {
	constructor(
		@inject(TYPES.BookRepository) private bookRepository: IBookRepository,
		@inject(TYPES.StorageService) private storageService: IStorageService,
	) {}
	async getBooks(): Promise<Partial<IBookModel>[] | null> {
		const books = await this.bookRepository.getBooks();

		if (!books) {
			return null;
		}

		return getBookResponseFields(books);
	}
	async getBookById(id: string): Promise<Partial<IBookModel> | null> {
		const book = await this.bookRepository.getBookById(id);

		if (!book) {
			return null;
		}

		const transformedImages = book.images.map((image) => ({
			url: image.url,
		}));

		return {
			id: book.id,
			title: book.title,
			rating: book.rating,
			authors: book.authors,
			categories: book.categories,
			images: transformedImages,
			issueYear: book.issueYear,
			description: book.description,
			publish: book.publish,
			pages: book.pages,
			cover: book.cover,
			weight: book.weight,
			format: book.format,
			ISBN: book.ISBN,
			producer: book.producer,
		};
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
		const result = await this.storageService.uploadImagesToStorage(images);

		if (!result) {
			return null;
		}

		return await this.bookRepository.addImagesToBook(id, result);
	}
}
