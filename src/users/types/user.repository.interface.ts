import { User } from '../user.entity';
import { IUserModel } from '../../models/types/user.model.interface';
import { ICommentModel } from '../../models/types/comment.model.interface';

export interface IUserRepository {
	createUser(user: User): Promise<IUserModel | null>;
	findUserByUsername(identifier: string): Promise<IUserModel | null>;
	findUserById(userId: string): Promise<IUserModel | null>;
	addCommentToUser(
		userId: string,
		bookId: string,
		comment: ICommentModel,
	): Promise<IUserModel | null>;
	updateUserComment(
		userId: string,
		commentId: string,
		text: string,
		rating: number,
	): Promise<IUserModel | null>;
}
