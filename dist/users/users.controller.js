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
exports.UsersController = void 0;
const base_controller_1 = require("../common/base.controller");
const types_1 = require("../types");
const inversify_1 = require("inversify");
const user_register_dto_1 = require("./dto/user-register.dto");
const validate_middleware_1 = require("../common/validate.middleware");
const user_login_dto_1 = require("./dto/user-login.dto");
const http_error_class_1 = require("../errors/http-error.class");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_guard_1 = require("../common/auth.guard");
let UsersController = class UsersController extends base_controller_1.BaseController {
    constructor(userService, configService) {
        super();
        this.userService = userService;
        this.configService = configService;
        this.bindRoutes([
            {
                path: types_1.Paths.Login,
                method: 'post',
                func: this.login,
                middleware: [new validate_middleware_1.ValidateMiddleware(user_login_dto_1.UserLoginDto)],
            },
            {
                path: types_1.Paths.Register,
                method: 'post',
                func: this.register,
                middleware: [new validate_middleware_1.ValidateMiddleware(user_register_dto_1.UserRegisterDto)],
            },
            {
                path: types_1.Paths.GetMe,
                method: 'get',
                func: this.getMe,
                middleware: [new auth_guard_1.AuthGuard()],
            },
        ]);
    }
    login({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.validateUser(body);
            if (!user || !(user === null || user === void 0 ? void 0 : user.id)) {
                return next(new http_error_class_1.HttpError(401, 'Invalid credentials'));
            }
            const secret = this.configService.get('JWT_SECRET');
            const jwt = yield this.signJWT(user.id, secret);
            res.status(200).send({ jwt, user, message: 'login successful' });
        });
    }
    register({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userService.createUser(body);
            if (!result) {
                return next(new http_error_class_1.HttpError(422, 'User already exists'));
            }
            res.status(201).send({ user: result });
        });
    }
    getMe(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.userId) {
                return next(new http_error_class_1.HttpError(401, 'not authorized'));
            }
            const user = yield this.userService.getUserInfo(req.userId);
            if (!user) {
                return next(new http_error_class_1.HttpError(404, 'User not found'));
            }
            res.status(200).send({ user });
        });
    }
    signJWT(userId, secret) {
        return new Promise((res, rej) => {
            (0, jsonwebtoken_1.sign)({ userId, iat: Math.floor(Date.now() / 1000) }, secret, (err, token) => {
                if (err) {
                    rej(err);
                }
                if (!token) {
                    rej(new Error('Token not found'));
                }
                else {
                    res(token);
                }
            });
        });
    }
};
exports.UsersController = UsersController;
exports.UsersController = UsersController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.UserService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __metadata("design:paramtypes", [Object, Object])
], UsersController);
