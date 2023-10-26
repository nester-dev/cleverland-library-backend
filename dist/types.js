"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paths = exports.TYPES = void 0;
exports.TYPES = {
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
var Paths;
(function (Paths) {
    Paths["Auth"] = "/api/auth";
    Paths["Login"] = "/login";
    Paths["Register"] = "/register";
    Paths["GetMe"] = "/me";
    Paths["Categories"] = "/api/categories";
    Paths["Books"] = "/api/books";
    Paths["Comments"] = "/api/comments";
    Paths["Bookings"] = "/api/bookings";
})(Paths || (exports.Paths = Paths = {}));
