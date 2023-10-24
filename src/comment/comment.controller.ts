import { BaseController } from '../common/base.controller';
import { ICommentController } from './types/comment.controller.interface';
import { NextFunction, Request, Response } from 'express';
import { CommentCreateDto } from './dto/comment-create.dto';
import { inject, injectable } from 'inversify';
import { AuthGuard } from '../common/auth.guard';
import { ValidateMiddleware } from '../common/validate.middleware';
import { TYPES } from '../types';
import { ICommentService } from './types/comment.service.interface';
import { HttpError } from '../errors/http-error.class';

@injectable()
export class CommentController extends BaseController implements ICommentController {
	constructor(@inject(TYPES.CommentService) private commentService: ICommentService) {
		super();
		this.bindRoutes([
			{
				path: '/',
				method: 'post',
				func: this.createComment,
				middleware: [new AuthGuard(), new ValidateMiddleware(CommentCreateDto)],
			},

			{
				path: '/:commentId',
				method: 'put',
				func: this.updateComment,
				middleware: [new AuthGuard(), new ValidateMiddleware(CommentCreateDto)],
			},
		]);
	}

	async createComment(
		req: Request<{}, {}, CommentCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.commentService.createComment(req.body);

		if (!result) {
			return next(new HttpError(422, 'Cannot create comment'));
		}

		res.status(201).send({ message: 'comment created', data: result });
	}

	async updateComment(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.commentService.updateComment(req.params.commentId, req.body);

		if (!result) {
			return next(new HttpError(422, 'Cannot update comment'));
		}

		res.status(200).send({ message: 'comment updated' });
	}
}
