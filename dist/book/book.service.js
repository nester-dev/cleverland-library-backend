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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const book_entity_1 = require("./book.entity");
const uuid_1 = require("uuid");
let BookService = class BookService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield this.bookRepository.getBooks();
            if (!books) {
                return null;
            }
            return books === null || books === void 0 ? void 0 : books.map((book) => {
                return new book_entity_1.Book(book.id, book.title, book.rating, book.authors, book.categories, book.images);
            });
        });
    }
    getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield this.bookRepository.getBookById(id);
            if (!book) {
                return null;
            }
            return new book_entity_1.Book(book.id, book.title, book.rating, book.authors, book.categories, book.images, book.issueYear, book.description, book.publish, book.pages, book.cover, book.weight, book.format, book.ISBN, book.producer);
        });
    }
    createBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const newBook = new book_entity_1.Book(id, book.title, book.rating, book.authors, book.categories, book.images, book.issueYear, book.description, book.publish, book.pages, book.cover, book.weight, book.format, book.ISBN, book.producer);
            return yield this.bookRepository.createBook(newBook);
        });
    }
    addImagesToBook(id, images) {
        return __awaiter(this, void 0, void 0, function* () {
            let imgArray = [];
            if (Array.isArray(images)) {
                imgArray = images;
            }
            else if (typeof images === 'object') {
                Object.values(images).forEach((value) => {
                    imgArray = imgArray.concat(value);
                });
            }
            const imagesToSave = imgArray.map((image) => {
                return { url: image.path };
            });
            return yield this.bookRepository.addImagesToBook(id, imagesToSave);
        });
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.BookRepository)),
    __metadata("design:paramtypes", [Object])
], BookService);
