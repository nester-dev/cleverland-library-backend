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
exports.UserRepository = void 0;
const inversify_1 = require("inversify");
const User_model_1 = __importDefault(require("../models/User.model"));
let UserRepository = class UserRepository {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_model_1.default.create(user);
        });
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_model_1.default.findOne({ username });
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_model_1.default.findOne({ id: userId });
        });
    }
    addCommentToUser(userId, bookId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_model_1.default.findOneAndUpdate({ id: userId }, {
                $push: {
                    comments: { id: comment.id, rating: comment.rating, text: comment.text, bookId: bookId },
                },
            });
        });
    }
    updateUserComment(userId, commentId, text, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                arrayFilters: [{ 'comment.id': commentId }],
                new: true,
            };
            return User_model_1.default.findOneAndUpdate({
                id: userId,
            }, {
                $set: {
                    'comments.$[comment].text': text,
                    'comments.$[comment].rating': rating,
                },
            }, options);
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, inversify_1.injectable)()
], UserRepository);
