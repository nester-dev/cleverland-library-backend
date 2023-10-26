"use strict";
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
exports.User = void 0;
const bcryptjs_1 = require("bcryptjs");
class User {
    constructor(id, username, email, blocked, firstName, lastName, phone, createdAt, updatedAt, passwordHash) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.blocked = blocked;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        if (passwordHash) {
            this.password = passwordHash;
        }
    }
    mapUserFields(user) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            blocked: user.blocked,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
        };
    }
    get getPassword() {
        return this.password;
    }
    setPassword(password, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            this.password = yield (0, bcryptjs_1.hash)(password, salt);
        });
    }
    comparePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, bcryptjs_1.compare)(password, this.password);
        });
    }
}
exports.User = User;
