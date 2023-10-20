import { ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { LoggerService } from './logger/logger.service';
import { IUsersController } from './users/users.controller.interface';
import { UsersController } from './users/users.controller';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { MongodbService } from './database/mongodb.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { IUserService } from './users/user.service.interface';
import { UserService } from './users/user.service';
import { IUserRepository } from './users/user.repository.interface';
import { UserRepository } from './users/user.repository';
import { ICategoriesController } from './categories/categories.controller.interface';
import { CategoriesController } from './categories/categories.controller';
import { ICategoriesRepository } from './categories/categories.repository.interface';
import { CategoriesRepository } from './categories/categories.repository';
import { ICategoriesService } from './categories/categories.service.interface';
import { CategoriesService } from './categories/categories.service';
import { App } from './app';
import { IBooksController } from './book/book.controller.interface';
import { BookController } from './book/book.controller';
import { IBookRepository } from './book/book.repository.interface';
import { BookRepository } from './book/book.repository';
import { IBookService } from './book/book.service.interface';
import { BookService } from './book/book.service';
import { MulterService } from './multer/multer.service';

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
	bind<App>(TYPES.Application).to(App).inSingletonScope();
});
