import { ICommentModel } from './comment.model.interface';

export interface IImage {
	url: string;
}

export interface IBookModel {
	id: string;
	title: string;
	rating: number;
	issueYear: string;
	description: string;
	publish: string;
	pages: string;
	cover: string;
	weight: string;
	format: string;
	ISBN: string;
	producer: string;
	authors: string[];
	categories: string[];
	images: IImage[];
	comments: ICommentModel[];
}
