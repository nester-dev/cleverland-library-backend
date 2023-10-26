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
exports.CommentController = void 0;
const base_controller_1 = require("../common/base.controller");
const comment_create_dto_1 = require("./dto/comment-create.dto");
const inversify_1 = require("inversify");
const auth_guard_1 = require("../common/auth.guard");
const validate_middleware_1 = require("../common/validate.middleware");
const types_1 = require("../types");
const http_error_class_1 = require("../errors/http-error.class");
let CommentController = class CommentController extends base_controller_1.BaseController {
    constructor(commentService) {
        super();
        this.commentService = commentService;
        this.bindRoutes([
            {
                path: '/',
                method: 'post',
                func: this.createComment,
                middleware: [new auth_guard_1.AuthGuard(), new validate_middleware_1.ValidateMiddleware(comment_create_dto_1.CommentCreateDto)],
            },
            {
                path: '/:commentId',
                method: 'put',
                func: this.updateComment,
                middleware: [new auth_guard_1.AuthGuard(), new validate_middleware_1.ValidateMiddleware(comment_create_dto_1.CommentCreateDto)],
            },
        ]);
    }
    createComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.commentService.createComment(req.body);
            if (!result) {
                return next(new http_error_class_1.HttpError(422, 'Cannot create comment'));
            }
            res.status(201).send({ message: 'comment created', data: result });
        });
    }
    updateComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.commentService.updateComment(req.params.commentId, req.body);
            if (!result) {
                return next(new http_error_class_1.HttpError(422, 'Cannot update comment'));
            }
            res.status(200).send({ message: 'comment updated' });
        });
    }
};
exports.CommentController = CommentController;
exports.CommentController = CommentController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.CommentService)),
    __metadata("design:paramtypes", [Object])
], CommentController);
