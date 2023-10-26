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
exports.CategoriesController = void 0;
const base_controller_1 = require("../common/base.controller");
const types_1 = require("../types");
const inversify_1 = require("inversify");
const auth_guard_1 = require("../common/auth.guard");
const categories_create_dto_1 = require("./dto/categories-create.dto");
const http_error_class_1 = require("../errors/http-error.class");
const validate_middleware_1 = require("../common/validate.middleware");
let CategoriesController = class CategoriesController extends base_controller_1.BaseController {
    constructor(categoriesService) {
        super();
        this.categoriesService = categoriesService;
        this.bindRoutes([
            {
                path: '/',
                method: 'get',
                func: this.getCategories,
                middleware: [new auth_guard_1.AuthGuard()],
            },
            {
                path: '/',
                method: 'post',
                func: this.createCategory,
                middleware: [new auth_guard_1.AuthGuard(), new validate_middleware_1.ValidateMiddleware(categories_create_dto_1.CategoriesCreateDto)],
            },
        ]);
    }
    getCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoriesService.getCategories();
            if (!categories) {
                return next(new http_error_class_1.HttpError(404, 'Categories not found'));
            }
            res.status(200).send({ categories });
        });
    }
    createCategory({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoriesService.createCategory({
                name: body.name,
                path: body.path,
            });
            if (!category) {
                return next(new http_error_class_1.HttpError(422, 'Category already exists'));
            }
            res.status(201).send({ category, message: 'Category created successfully' });
        });
    }
};
exports.CategoriesController = CategoriesController;
exports.CategoriesController = CategoriesController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.CategoriesService)),
    __metadata("design:paramtypes", [Object])
], CategoriesController);
