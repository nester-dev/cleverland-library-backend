"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const inversify_1 = require("inversify");
const types_1 = require("./types");
const users_controller_1 = require("./users/users.controller");
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const mongodb_service_1 = require("./database/mongodb.service");
const auth_middleware_1 = require("./common/auth.middleware");
const categories_controller_1 = require("./categories/categories.controller");
const book_controller_1 = require("./book/book.controller");
const comment_controller_1 = require("./comment/comment.controller");
const booking_controller_1 = require("./booking/booking.controller");
let App = class App {
    constructor(logger, usersController, exceptionFilter, mongodbService, configService, categoriesController, bookController, commentController, bookingController) {
        this.logger = logger;
        this.usersController = usersController;
        this.exceptionFilter = exceptionFilter;
        this.mongodbService = mongodbService;
        this.configService = configService;
        this.categoriesController = categoriesController;
        this.bookController = bookController;
        this.commentController = commentController;
        this.bookingController = bookingController;
        this.app = (0, express_1.default)();
        this.port = +this.configService.get('PORT') || 8002;
    }
    useMiddleware() {
        this.app.use((0, body_parser_1.json)());
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use('/uploads', express_1.default.static('uploads'));
        const authMiddleware = new auth_middleware_1.AuthMiddleware(this.configService.get('JWT_SECRET'));
        this.app.use(authMiddleware.execute.bind(authMiddleware));
    }
    useRoutes() {
        this.app.use(types_1.Paths.Auth, this.usersController.getRouter());
        this.app.use(types_1.Paths.Categories, this.categoriesController.getRouter());
        this.app.use(types_1.Paths.Books, this.bookController.getRouter());
        this.app.use(types_1.Paths.Comments, this.commentController.getRouter());
        this.app.use(types_1.Paths.Bookings, this.bookingController.getRouter());
    }
    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.useMiddleware();
            this.useRoutes();
            this.useExceptionFilters();
            yield this.mongodbService.connect();
            this.app.listen(this.port);
            this.logger.log(`Server started on ${this.port}`, 'App');
        });
    }
};
exports.App = App;
exports.App = App = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UsersController)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.ExceptionFilter)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.MongoDBService)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.CategoriesController)),
    __param(6, (0, inversify_1.inject)(types_1.TYPES.BookController)),
    __param(7, (0, inversify_1.inject)(types_1.TYPES.CommentController)),
    __param(8, (0, inversify_1.inject)(types_1.TYPES.BookingController)),
    __metadata("design:paramtypes", [Object, users_controller_1.UsersController, Object, mongodb_service_1.MongodbService, Object, categories_controller_1.CategoriesController,
        book_controller_1.BookController,
        comment_controller_1.CommentController,
        booking_controller_1.BookingController])
], App);
