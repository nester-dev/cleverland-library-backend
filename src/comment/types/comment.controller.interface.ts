import { NextFunction, Request, Response } from 'express';
import { CommentCreateDto } from '../dto/comment-create.dto';

export interface ICommentController {
	createComment(req: Request, res: Response, next: NextFunction): Promise<void>;
	updateComment(
		req: Request<{ commentId: string }, {}, CommentCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void>;
}
