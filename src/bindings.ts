import { ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { LoggerService } from './logger/logger.service';
import { IUsersController } from './users/types/users.controller.interface';
import { UsersController } from './users/users.controller';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { MongodbService } from './database/mongodb.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { IUserService } from './users/types/user.service.interface';
import { UserService } from './users/user.service';
import { IUserRepository } from './users/types/user.repository.interface';
import { UserRepository } from './users/user.repository';
import { ICategoriesController } from './categories/categories.controller.interface';
import { CategoriesController } from './categories/categories.controller';
import { ICategoriesRepository } from './categories/categories.repository.interface';
import { CategoriesRepository } from './categories/categories.repository';
import { ICategoriesService } from './categories/categories.service.interface';
import { CategoriesService } from './categories/categories.service';
import { App } from './app';
import { IBooksController } from './book/types/book.controller.interface';
import { BookController } from './book/book.controller';
import { IBookRepository } from './book/types/book.repository.interface';
import { BookRepository } from './book/book.repository';
import { IBookService } from './book/types/book.service.interface';
import { BookService } from './book/book.service';
import { MulterService } from './multer/multer.service';
import { ICommentController } from './comment/types/comment.controller.interface';
import { CommentController } from './comment/comment.controller';
import { ICommentRepository } from './comment/types/comment.repository.interface';
import { CommentRepository } from './comment/comment.repository';
import { ICommentService } from './comment/types/comment.service.interface';
import { CommentService } from './comment/comment.service';
import { IBookingController } from './booking/types/booking.controller.interface';
import { BookingController } from './booking/booking.controller';
import { IBookingRepository } from './booking/types/booking.repository.interface';
import { BookingRepository } from './booking/booking.repository';
import { IBookingService } from './booking/types/booking.service.interface';
import { BookingService } from './booking/booking.service';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IUsersController>(TYPES.UsersController).to(UsersController);
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter).inSingletonScope();
	bind<MongodbService>(TYPES.MongoDBService).to(MongodbService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
	bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
	bind<ICategoriesController>(TYPES.CategoriesController)
		.to(CategoriesController)
		.inSingletonScope();
	bind<ICategoriesRepository>(TYPES.CategoriesRepository)
		.to(CategoriesRepository)
		.inSingletonScope();
	bind<ICategoriesService>(TYPES.CategoriesService).to(CategoriesService).inSingletonScope();
	bind<IBooksController>(TYPES.BookController).to(BookController).inSingletonScope();
	bind<IBookRepository>(TYPES.BookRepository).to(BookRepository).inSingletonScope();
	bind<IBookService>(TYPES.BookService).to(BookService).inSingletonScope();
	bind<MulterService>(TYPES.MulterService).to(MulterService);
	bind<ICommentController>(TYPES.CommentController).to(CommentController).inSingletonScope();
	bind<ICommentRepository>(TYPES.CommentRepository).to(CommentRepository).inSingletonScope();
	bind<ICommentService>(TYPES.CommentService).to(CommentService).inSingletonScope();
	bind<IBookingController>(TYPES.BookingController).to(BookingController).inSingletonScope();
	bind<IBookingRepository>(TYPES.BookingRepository).to(BookingRepository).inSingletonScope();
	bind<IBookingService>(TYPES.BookingService).to(BookingService).inSingletonScope();
	bind<App>(TYPES.Application).to(App).inSingletonScope();
});
