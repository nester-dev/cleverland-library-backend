import { IUserModel } from '../models/user.model.interface';

export interface ICommentUserInfo {
	commentUserId: string | null;
	firstName: string | null;
	lastName: string | null;
	avatarUrl?: string | null;
}
export class Comment {
	private user: ICommentUserInfo = {
		commentUserId: null,
		firstName: null,
		lastName: null,
		avatarUrl: null,
	};
	constructor(
		private id: string,
		private rating: number,
		private text: string,
		private userId: string,
		private bookId: string,
	) {}

	getId(): string {
		return this.bookId;
	}

	setUserInfo(userModel: IUserModel): void {
		this.user.commentUserId = userModel.id;
		this.user.firstName = userModel.firstName;
		this.user.lastName = userModel.lastName;
		this.user.avatarUrl = userModel.avatar;
	}
}
