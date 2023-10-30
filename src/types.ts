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
	CommentController: Symbol.for('CommentController'),
	CommentRepository: Symbol.for('CommentRepository'),
	CommentService: Symbol.for('CommentService'),
	BookingController: Symbol.for('BookingController'),
	BookingRepository: Symbol.for('BookingRepository'),
	BookingService: Symbol.for('BookingService'),
	StorageService: Symbol.for('StorageService'),
};

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export enum Paths {
	Auth = '/api',
	Login = '/auth/login',
	Register = '/auth/register',
	GetMe = '/users/me',
	Categories = '/api/categories',
	Books = '/api/books',
	Comments = '/api/comments',
	Bookings = '/api/bookings',
	Users = '/users',
	Upload = '/upload',
}
