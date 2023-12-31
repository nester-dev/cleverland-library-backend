import { IBookRepository } from './types/book.repository.interface';
import { IBookModel, IImage } from '../models/types/book.model.interface';
import BookModel from '../models/Book.model';
import { Book } from './book.entity';
import { injectable } from 'inversify';
import CategoriesModel from '../models/Categories.model';
import { ICommentModel } from '../models/types/comment.model.interface';

@injectable()
export class BookRepository implements IBookRepository {
	getBooks(): Promise<IBookModel[] | null> {
		return BookModel.find({}, { _id: 0, __v: 0 });
	}
	getBookById(id: string): Promise<IBookModel | null> {
		return BookModel.findOne({ id }, { _id: 0, __v: 0 });
	}
	async createBook(book: Book): Promise<IBookModel | null> {
		const categories = book.getCategories;
		const result = await BookModel.create(book);

		if (result) {
			categories?.forEach(async (category) => {
				await CategoriesModel.findOneAndUpdate({ name: category }, { $inc: { booksCount: 1 } });
			});
		}

		return result;
	}

	async addCommentToBook(bookId: string, comment: ICommentModel): Promise<IBookModel | null> {
		return BookModel.findOneAndUpdate(
			{ id: bookId },
			{ $push: { comments: comment } },
			{ new: true },
		);
	}

	async updateCommentToBook(
		bookId: string,
		commentId: string,
		text: string,
		rating: number,
	): Promise<IBookModel | null> {
		return BookModel.findOneAndUpdate(
			{ id: bookId },
			{ $set: { 'comments.$[comment].text': text, 'comments.$[comment].rating': rating } },
			{ arrayFilters: [{ 'comment.id': commentId }], new: true },
		);
	}

	addImagesToBook(id: string, newImages: IImage[]): Promise<IBookModel | null> {
		return BookModel.findOneAndUpdate(
			{ id },
			{ $push: { images: { $each: newImages } } },
			{ new: true },
		);
	}
}
