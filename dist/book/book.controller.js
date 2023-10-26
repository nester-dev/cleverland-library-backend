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
exports.BookController = void 0;
const base_controller_1 = require("../common/base.controller");
const inversify_1 = require("inversify");
const auth_guard_1 = require("../common/auth.guard");
const book_create_dto_1 = require("./dto/book-create.dto");
const types_1 = require("../types");
const http_error_class_1 = require("../errors/http-error.class");
const validate_middleware_1 = require("../common/validate.middleware");
const add_images_dto_1 = require("./dto/add-images.dto");
const multer_service_1 = require("../multer/multer.service");
const multer_1 = __importDefault(require("multer"));
const upload_middleware_1 = require("../common/upload.middleware");
let BookController = class BookController extends base_controller_1.BaseController {
    constructor(bookService, multerService) {
        super();
        this.bookService = bookService;
        this.multerService = multerService;
        this.upload = (0, multer_1.default)({ dest: 'uploads/' });
        this.bindRoutes([
            {
                path: '/',
                method: 'get',
                func: this.getBooks,
                middleware: [new auth_guard_1.AuthGuard()],
            },
            {
                path: '/:id',
                method: 'get',
                func: this.getBookById,
                middleware: [new auth_guard_1.AuthGuard()],
            },
            {
                path: '/',
                method: 'post',
                func: this.createBook,
                middleware: [new auth_guard_1.AuthGuard(), new validate_middleware_1.ValidateMiddleware(book_create_dto_1.BookCreateDto)],
            },
            {
                path: '/',
                method: 'patch',
                func: this.addImagesToBook,
                middleware: [
                    new auth_guard_1.AuthGuard(),
                    new validate_middleware_1.ValidateMiddleware(add_images_dto_1.AddImagesDto),
                    new upload_middleware_1.UploadMiddleware(this.multerService),
                ],
            },
        ]);
    }
    getBooks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.bookService.getBooks();
            if (!result) {
                return next(new http_error_class_1.HttpError(422, 'Cannot get books'));
            }
            res.status(200).send(result);
        });
    }
    getBookById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const result = yield this.bookService.getBookById(id);
            if (!result) {
                return next(new http_error_class_1.HttpError(422, 'Cannot get book by id'));
            }
            res.status(200).send({ result });
        });
    }
    createBook({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.bookService.createBook(body);
            if (!result) {
                return next(new http_error_class_1.HttpError(422, 'Cannot create book'));
            }
            res.status(201).send({ message: 'book created', book: result });
        });
    }
    addImagesToBook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const images = req === null || req === void 0 ? void 0 : req.files;
            try {
                yield this.bookService.addImagesToBook(req.body.id, images);
                res.status(201).send({ message: 'images added' });
            }
            catch (error) {
                return next(error);
            }
        });
    }
};
exports.BookController = BookController;
exports.BookController = BookController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.BookService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.MulterService)),
    __metadata("design:paramtypes", [Object, multer_service_1.MulterService])
], BookController);
