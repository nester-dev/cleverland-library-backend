import { Router } from 'express';
import { IControllerRoute } from './types/route.interface';
import { injectable } from 'inversify';

@injectable()
export abstract class BaseController {
	private readonly router: Router;

	constructor() {
		this.router = Router();
	}

	getRouter(): Router {
		return this.router;
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			const middlewares = route.middleware?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this);

			const pipeline = middlewares ? [...middlewares, handler] : handler;

			this.router[route.method](route.path, pipeline);
		}
	}
}
