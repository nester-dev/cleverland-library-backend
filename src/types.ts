import { Container } from 'inversify';
import { App } from './app';

export const TYPES = {
	ILogger: Symbol.for('Logger'),
	Application: Symbol.for('Application'),
	UsersController: Symbol.for('UsersController'),
	ExceptionFilter: Symbol.for('ExceptionFilter'),
	MongoDBService: Symbol.for('MongoDBService'),
	ConfigService: Symbol.for('ConfigService'),
	UserService: Symbol.for('UserService'),
	UserRepository: Symbol.for('UserRepository'),
	CategoriesController: Symbol.for('CategoriesController'),
	CategoriesRepository: Symbol.for('CategoriesRepository'),
	CategoriesService: Symbol.for('CategoriesService'),
	BookController: Symbol.for('BookController'),
	BookRepository: Symbol.for('BookRepository'),
	BookService: Symbol.for('BookService'),
	MulterService: Symbol.for('MulterService'),
};

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export enum Paths {
	Login = '/login',
	Register = '/register',
	GetMe = '/me',
	Categories = '/api/categories',
	Books = '/api/books',
}
