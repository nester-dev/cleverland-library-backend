import { Container } from 'inversify';
import { IBootstrapReturn, TYPES } from './types';
import { App } from './app';
import { appBindings } from './bindings';

const bootstrap = async (): Promise<IBootstrapReturn> => {
	const appContainer = new Container();
	appContainer.load(appBindings);

	const app = appContainer.get<App>(TYPES.Application);
	await app.init();

	return { appContainer, app };
};

bootstrap();
