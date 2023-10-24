import { IBookModel, IImage } from '../../models/types/book.model.interface';
import { Book } from '../book.entity';
import { ICommentModel } from '../../models/types/comment.model.interface';

export interface IBookRepository {
	getBooks(): Promise<IBookModel[] | null>;
	getBookById(id: string): Promise<IBookModel | null>;
	createBook(book: Book): Promise<IBookModel | null>;
	addImagesToBook(id: string, newImages: IImage[]): Promise<IBookModel | null>;
	addCommentToBook(bookId: string, comment: ICommentModel): Promise<IBookModel | null>;
	updateCommentToBook(
		bookId: string,
		commentId: string,
		text: string,
		rating: number,
	): Promise<IBookModel | null>;
}
