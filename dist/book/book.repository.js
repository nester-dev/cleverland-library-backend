"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.BookRepository = void 0;
const Book_model_1 = __importDefault(require("../models/Book.model"));
const inversify_1 = require("inversify");
const Categories_model_1 = __importDefault(require("../models/Categories.model"));
let BookRepository = class BookRepository {
    getBooks() {
        return Book_model_1.default.find({}, { _id: 0, __v: 0 });
    }
    getBookById(id) {
        return Book_model_1.default.findOne({ id }, { _id: 0, __v: 0 });
    }
    createBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = book.getCategories;
            const result = yield Book_model_1.default.create(book);
            if (result) {
                categories === null || categories === void 0 ? void 0 : categories.forEach((category) => __awaiter(this, void 0, void 0, function* () {
                    yield Categories_model_1.default.findOneAndUpdate({ name: category }, { $inc: { booksCount: 1 } });
                }));
            }
            return result;
        });
    }
    addCommentToBook(bookId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return Book_model_1.default.findOneAndUpdate({ id: bookId }, { $push: { comments: comment } }, { new: true });
        });
    }
    updateCommentToBook(bookId, commentId, text, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            return Book_model_1.default.findOneAndUpdate({ id: bookId }, { $set: { 'comments.$[comment].text': text, 'comments.$[comment].rating': rating } }, { arrayFilters: [{ 'comment.id': commentId }], new: true });
        });
    }
    addImagesToBook(id, newImages) {
        return Book_model_1.default.findByIdAndUpdate(id, { $push: { images: { $each: newImages } } }, { new: true });
    }
};
exports.BookRepository = BookRepository;
exports.BookRepository = BookRepository = __decorate([
    (0, inversify_1.injectable)()
], BookRepository);
