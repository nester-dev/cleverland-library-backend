import { IUserRepository } from './types/user.repository.interface';
import { User } from './user.entity';
import { injectable } from 'inversify';
import UserModel from '../models/User.model';
import { IUserModel } from '../models/types/user.model.interface';
import { ICommentModel } from '../models/types/comment.model.interface';
import { UserUpdateDto } from './dto/user-update.dto';
import BookModel from '../models/Book.model';
import { UploadedImage } from '../storage/types/storage.service.interface';

@injectable()
export class UserRepository implements IUserRepository {
	async createUser(user: User): Promise<IUserModel> {
		return UserModel.create(user);
	}

	async updateUserInfo(userId: string, info: UserUpdateDto): Promise<IUserModel | null> {
		await BookModel.updateMany(
			{ 'comments.user.commentUserId': userId },
			{
				$set: {
					'comments.$.user.lastName': info.lastName,
					'comments.$.user.firstName': info.firstName,
				},
			},
		);
		return UserModel.findOneAndUpdate({ id: userId }, info, { new: true, __v: 0, _id: 0 });
	}

	async updateUserAvatar(userId: string, avatar?: UploadedImage): Promise<IUserModel | null> {
		await BookModel.updateMany(
			{ 'comments.user.commentUserId': userId },
			{
				$set: {
					'comments.$.user.avatarUrl': avatar?.url,
				},
			},
		);

		return UserModel.findOneAndUpdate(
			{ id: userId },
			{ $set: { 'avatar.avatarUrl': avatar?.url, 'avatar.id': avatar?.id } },
			{ new: true, __v: 0, _id: 0 },
		);
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
