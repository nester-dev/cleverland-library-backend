"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appBindings = void 0;
const inversify_1 = require("inversify");
const types_1 = require("./types");
const logger_service_1 = require("./logger/logger.service");
const users_controller_1 = require("./users/users.controller");
const exception_filter_1 = require("./errors/exception.filter");
const mongodb_service_1 = require("./database/mongodb.service");
const config_service_1 = require("./config/config.service");
const user_service_1 = require("./users/user.service");
const user_repository_1 = require("./users/user.repository");
const categories_controller_1 = require("./categories/categories.controller");
const categories_repository_1 = require("./categories/categories.repository");
const categories_service_1 = require("./categories/categories.service");
const app_1 = require("./app");
const book_controller_1 = require("./book/book.controller");
const book_repository_1 = require("./book/book.repository");
const book_service_1 = require("./book/book.service");
const multer_service_1 = require("./multer/multer.service");
const comment_controller_1 = require("./comment/comment.controller");
const comment_repository_1 = require("./comment/comment.repository");
const comment_service_1 = require("./comment/comment.service");
const booking_controller_1 = require("./booking/booking.controller");
const booking_repository_1 = require("./booking/booking.repository");
const booking_service_1 = require("./booking/booking.service");
exports.appBindings = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.ILogger).to(logger_service_1.LoggerService).inSingletonScope();
    bind(types_1.TYPES.UsersController).to(users_controller_1.UsersController);
    bind(types_1.TYPES.ExceptionFilter).to(exception_filter_1.ExceptionFilter).inSingletonScope();
    bind(types_1.TYPES.MongoDBService).to(mongodb_service_1.MongodbService).inSingletonScope();
    bind(types_1.TYPES.ConfigService).to(config_service_1.ConfigService).inSingletonScope();
    bind(types_1.TYPES.UserService).to(user_service_1.UserService).inSingletonScope();
    bind(types_1.TYPES.UserRepository).to(user_repository_1.UserRepository).inSingletonScope();
    bind(types_1.TYPES.CategoriesController)
        .to(categories_controller_1.CategoriesController)
        .inSingletonScope();
    bind(types_1.TYPES.CategoriesRepository)
        .to(categories_repository_1.CategoriesRepository)
        .inSingletonScope();
    bind(types_1.TYPES.CategoriesService).to(categories_service_1.CategoriesService).inSingletonScope();
    bind(types_1.TYPES.BookController).to(book_controller_1.BookController).inSingletonScope();
    bind(types_1.TYPES.BookRepository).to(book_repository_1.BookRepository).inSingletonScope();
    bind(types_1.TYPES.BookService).to(book_service_1.BookService).inSingletonScope();
    bind(types_1.TYPES.MulterService).to(multer_service_1.MulterService);
    bind(types_1.TYPES.CommentController).to(comment_controller_1.CommentController).inSingletonScope();
    bind(types_1.TYPES.CommentRepository).to(comment_repository_1.CommentRepository).inSingletonScope();
    bind(types_1.TYPES.CommentService).to(comment_service_1.CommentService).inSingletonScope();
    bind(types_1.TYPES.BookingController).to(booking_controller_1.BookingController).inSingletonScope();
    bind(types_1.TYPES.BookingRepository).to(booking_repository_1.BookingRepository).inSingletonScope();
    bind(types_1.TYPES.BookingService).to(booking_service_1.BookingService).inSingletonScope();
    bind(types_1.TYPES.Application).to(app_1.App).inSingletonScope();
});
