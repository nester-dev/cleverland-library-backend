import { IBookModel } from '../models/types/book.model.interface';

export const getBookResponseFields = (books: IBookModel[]) => {
	return books?.map((book) => {
		return {
			id: book.id,
			authors: book.authors,
			categories: book.categories,
			rating: book.rating,
			title: book.title,
			image: { url: book?.images?.length ? book?.images[0]?.url : '' },
			booking: book.booking,
		};
	});
};
