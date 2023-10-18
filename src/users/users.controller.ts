import { BaseController } from '../common/base.controller';
import { IUsersController } from './users.controller.interface';
import { Paths, TYPES } from '../types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { UserRegisterDto } from './dto/user-register.dto';
import { ValidateMiddleware } from '../common/validate.middleware';
import { UserLoginDto } from './dto/user-login.dto';
import { IUserService } from './user.service.interface';
import { HttpError } from '../errors/http-error.class';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { AuthGuard } from '../common/auth.guard';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super();
		this.bindRoutes([
			{
				path: Paths.Login,
				method: 'post',
				func: this.login,
				middleware: [new ValidateMiddleware(UserLoginDto)],
			},

			{
				path: Paths.Register,
				method: 'post',
				func: this.register,
				middleware: [new ValidateMiddleware(UserRegisterDto)],
			},

			{
				path: Paths.GetMe,
				method: 'get',
				func: this.getMe,
				middleware: [new AuthGuard()],
			},
		]);
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const user = await this.userService.validateUser(body);

		if (!user) {
			return next(new HttpError(401, 'Invalid credentials'));
		}

		const secret = this.configService.get('JWT_SECRET');

		const jwt = await this.signJWT(user.id, secret);

		res.status(200).send({ jwt, user, message: 'login successful' });
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);

		if (!result) {
			return next(new HttpError(422, 'User already exists'));
		}

		res.status(201).send({ user: result });
	}

	async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
		if (!req.userId) {
			return next(new HttpError(401, 'not authorized'));
		}

		const user = await this.userService.getUserInfo(req.userId);

		if (!user) {
			return next(new HttpError(404, 'User not found'));
		}

		res.status(200).send({ user });
	}

	private signJWT(userId: string, secret: string): Promise<string> {
		return new Promise<string>((res, rej) => {
			sign(
				{ userId, iat: Math.floor(Date.now() / 1000) },
				secret,
				(err: Error | null, token: string | undefined): void => {
					if (err) {
						rej(err);
					}

					if (!token) {
						rej(new Error('Token not found'));
					} else {
						res(token);
					}
				},
			);
		});
	}
}
