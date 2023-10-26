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
exports.CommentRepository = void 0;
const inversify_1 = require("inversify");
const Comment_model_1 = __importDefault(require("../models/Comment.model"));
const types_1 = require("../types");
let CommentRepository = class CommentRepository {
    constructor(userRepository, bookRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }
    createComment(userId, bookId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdComment = yield Comment_model_1.default.create(comment);
            if (!createdComment) {
                return null;
            }
            const isSuccess = yield this.addCommentToUserAndBook(userId, bookId, createdComment);
            return isSuccess ? createdComment : null;
        });
    }
    updateComment(commentId, userId, bookId, text, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedComment = yield Comment_model_1.default.findOneAndUpdate({ id: commentId }, { $set: { rating, text } }, { new: true });
            if (!updatedComment) {
                return null;
            }
            const isSuccess = yield this.updateCommentToUserAndBook(userId, commentId, bookId, text, rating);
            return isSuccess ? updatedComment : null;
        });
    }
    addCommentToUserAndBook(userId, bookId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedBook = yield this.bookRepository.addCommentToBook(bookId, comment);
            const updatedUser = yield this.userRepository.addCommentToUser(userId, bookId, comment);
            return !(!updatedBook || !updatedUser);
        });
    }
    updateCommentToUserAndBook(userId, commentId, bookId, text, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedBook = yield this.bookRepository.updateCommentToBook(bookId, commentId, text, rating);
            const updatedUser = yield this.userRepository.updateUserComment(userId, commentId, text, rating);
            return !(!updatedBook || !updatedUser);
        });
    }
};
exports.CommentRepository = CommentRepository;
exports.CommentRepository = CommentRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.UserRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.BookRepository)),
    __metadata("design:paramtypes", [Object, Object])
], CommentRepository);
