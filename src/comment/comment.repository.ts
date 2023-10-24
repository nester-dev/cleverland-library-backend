import { inject, injectable } from 'inversify';
import { ICommentRepository } from './types/comment.repository.interface';
import { ICommentModel } from '../models/comment.model.interface';
import { Comment } from './comment.entity';
import CommentModel from '../models/Comment.model';
import { TYPES } from '../types';
import { IUserRepository } from '../users/types/user.repository.interface';
import { IBookRepository } from '../book/types/book.repository.interface';

@injectable()
export class CommentRepository implements ICommentRepository {
	constructor(
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
		@inject(TYPES.BookRepository) private bookRepository: IBookRepository,
	) {}

	async createComment(
		userId: string,
		bookId: string,
		comment: Comment,
	): Promise<ICommentModel | null> {
		const createdComment = await CommentModel.create(comment);
		if (!createdComment) {
			return null;
		}

		const isSuccess = await this.addCommentToUserAndBook(userId, bookId, createdComment);

		return isSuccess ? createdComment : null;
	}
	async updateComment(
		commentId: string,
		userId: string,
		bookId: string,
		text: string,
		rating: number,
	): Promise<ICommentModel | null> {
		const updatedComment = await CommentModel.findOneAndUpdate(
			{ id: commentId },
			{ $set: { rating, text } },
			{ new: true },
		);

		if (!updatedComment) {
			return null;
		}

		const isSuccess = await this.updateCommentToUserAndBook(
			userId,
			commentId,
			bookId,
			text,
			rating,
		);

		return isSuccess ? updatedComment : null;
	}

	async addCommentToUserAndBook(
		userId: string,
		bookId: string,
		comment: ICommentModel,
	): Promise<boolean> {
		const updatedBook = await this.bookRepository.addCommentToBook(bookId, comment);
		const updatedUser = await this.userRepository.addCommentToUser(userId, bookId, comment);

		return !(!updatedBook || !updatedUser);
	}

	async updateCommentToUserAndBook(
		userId: string,
		commentId: string,
		bookId: string,
		text: string,
		rating: number,
	): Promise<boolean> {
		const updatedBook = await this.bookRepository.updateCommentToBook(
			bookId,
			commentId,
			text,
			rating,
		);
		const updatedUser = await this.userRepository.updateUserComment(
			userId,
			commentId,
			text,
			rating,
		);

		return !(!updatedBook || !updatedUser);
	}
}
