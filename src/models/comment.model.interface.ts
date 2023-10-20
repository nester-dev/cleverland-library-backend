export interface ICommentModel {
	rating: number;
	text: string;
	createdAt: Date;
	user: {
		commentUserId: string;
		firstName: string;
		lastName: string;
		avatarUrl: string;
	};
}
