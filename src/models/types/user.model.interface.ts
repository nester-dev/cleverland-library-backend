export interface IUserModel {
	id: string;
	username: string;
	email: string;
	blocked: boolean;
	firstName: string;
	lastName: string;
	phone: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
	avatar?: string | null;
	comments?: {
		id: string;
		rating: number;
		text: string;
		bookId: string;
	}[];
	booking: { id: string; order: boolean; dateOrder: Date } | null;
}
