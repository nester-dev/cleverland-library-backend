import { IUserRepository } from './types/user.repository.interface';
import { User } from './user.entity';
import { injectable } from 'inversify';
import UserModel from '../models/User.model';
import { IUserModel } from '../models/user.model.interface';
import { ICommentModel } from '../models/comment.model.interface';

@injectable()
export class UserRepository implements IUserRepository {
	async createUser(user: User): Promise<IUserModel> {
		return UserModel.create(user);
	}

	async findUserByUsername(username: string): Promise<IUserModel | null> {
		return UserModel.findOne({ username });
	}

	async findUserById(userId: string): Promise<IUserModel | null> {
		return UserModel.findOne({ id: userId });
	}

	async addCommentToUser(
		userId: string,
		bookId: string,
		comment: ICommentModel,
	): Promise<IUserModel | null> {
		return UserModel.findOneAndUpdate(
			{ id: userId },
			{
				$push: {
					comments: { id: comment.id, rating: comment.rating, text: comment.text, bookId: bookId },
				},
			},
		);
	}

	async updateUserComment(
		userId: string,
		commentId: string,
		text: string,
		rating: number,
	): Promise<IUserModel | null> {
		const options = {
			arrayFilters: [{ 'comment.id': commentId }],
			new: true,
		};

		return UserModel.findOneAndUpdate(
			{
				id: userId,
			},
			{
				$set: {
					'comments.$[comment].text': text,
					'comments.$[comment].rating': rating,
				},
			},
			options,
		);
	}
}
