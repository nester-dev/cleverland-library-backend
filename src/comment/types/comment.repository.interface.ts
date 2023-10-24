import { ICommentModel } from '../../models/comment.model.interface';
import { Comment } from '../comment.entity';

export interface ICommentRepository {
	createComment(userId: string, bookId: string, comment: Comment): Promise<ICommentModel | null>;
	updateComment(
		commentId: string,
		userId: string,
		bookId: string,
		text: string,
		rating: number,
	): Promise<ICommentModel | null>;
	addCommentToUserAndBook(userId: string, bookId: string, comment: ICommentModel): Promise<boolean>;
	updateCommentToUserAndBook(
		userId: string,
		commentId: string,
		bookId: string,
		text: string,
		rating: number,
	): Promise<boolean>;
}
