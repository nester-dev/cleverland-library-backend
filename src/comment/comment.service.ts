import { ICommentService } from './types/comment.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ICommentRepository } from './types/comment.repository.interface';
import { CommentCreateDto } from './dto/comment-create.dto';
import { Comment } from './comment.entity';
import { v4 as uuid } from 'uuid';
import { IUserRepository } from '../users/types/user.repository.interface';
import { IBookRepository } from '../book/types/book.repository.interface';

@injectable()
export class CommentService implements ICommentService {
	constructor(
		@inject(TYPES.CommentRepository) private commentRepository: ICommentRepository,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
		@inject(TYPES.BookRepository) private bookRepository: IBookRepository,
	) {}

	async createComment({ text, rating, userId, bookId }: CommentCreateDto): Promise<Comment | null> {
		const commentId = uuid();
		const comment = new Comment(commentId, rating, text, userId, bookId);
		const [commentUser, book] = await Promise.all([
			this.userRepository.findUserById(userId),
			this.bookRepository.getBookById(bookId),
		]);

		if (!commentUser || !book) {
			return null;
		}
		comment.setUserInfo(commentUser);

		const createdComment = await this.commentRepository.createComment(userId, bookId, comment);

		if (!createdComment) {
			return null;
		}

		return comment;
	}

	async updateComment(
		commentId: string,
		{ text, rating, userId, bookId }: CommentCreateDto,
	): Promise<any> {
		const updatedComment = await this.commentRepository.updateCommentToUserAndBook(
			userId,
			commentId,
			bookId,
			text,
			rating,
		);

		if (!updatedComment) {
			return null;
		}

		return updatedComment;
	}
}
