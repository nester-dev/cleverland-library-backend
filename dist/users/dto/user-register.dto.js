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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterDto = void 0;
const class_validator_1 = require("class-validator");
class UserRegisterDto {
}
exports.UserRegisterDto = UserRegisterDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email' }),
    __metadata("design:type", String)
], UserRegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid username' }),
    __metadata("design:type", String)
], UserRegisterDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid password' }),
    (0, class_validator_1.Length)(8, 20, { message: 'Password must be between 8 and 20 characters' }),
    __metadata("design:type", String)
], UserRegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid firstName' }),
    __metadata("design:type", String)
], UserRegisterDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid lastName' }),
    __metadata("design:type", String)
], UserRegisterDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Invalid phone number' }),
    __metadata("design:type", String)
], UserRegisterDto.prototype, "phone", void 0);
