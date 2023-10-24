import { CommentCreateDto } from '../dto/comment-create.dto';
import { Comment } from '../comment.entity';

export interface ICommentService {
	createComment(dto: CommentCreateDto): Promise<Comment | null>;
	updateComment(commentId: string, dto: CommentCreateDto): Promise<Comment | null>;
}
