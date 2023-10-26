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
exports.CommentService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../types");
const comment_entity_1 = require("./comment.entity");
const uuid_1 = require("uuid");
let CommentService = class CommentService {
    constructor(commentRepository, userRepository, bookRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }
    createComment({ text, rating, userId, bookId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentId = (0, uuid_1.v4)();
            const comment = new comment_entity_1.Comment(commentId, rating, text, userId, bookId);
            const [commentUser, book] = yield Promise.all([
                this.userRepository.findUserById(userId),
                this.bookRepository.getBookById(bookId),
            ]);
            if (!commentUser || !book) {
                return null;
            }
            comment.setUserInfo(commentUser);
            const createdComment = yield this.commentRepository.createComment(userId, bookId, comment);
            if (!createdComment) {
                return null;
            }
            return comment;
        });
    }
    updateComment(commentId, { text, rating, userId, bookId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedComment = yield this.commentRepository.updateCommentToUserAndBook(userId, commentId, bookId, text, rating);
            if (!updatedComment) {
                return null;
            }
            return updatedComment;
        });
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.CommentRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UserRepository)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.BookRepository)),
    __metadata("design:paramtypes", [Object, Object, Object])
], CommentService);
