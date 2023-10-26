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
exports.CommentCreateDto = void 0;
const class_validator_1 = require("class-validator");
class CommentCreateDto {
}
exports.CommentCreateDto = CommentCreateDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Text should be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Text should not be empty' }),
    __metadata("design:type", String)
], CommentCreateDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Rating should be a number' }),
    (0, class_validator_1.Min)(0, { message: 'Rating should be at least 0' }),
    (0, class_validator_1.Max)(5, { message: 'Rating should be maximum 5' }),
    __metadata("design:type", Number)
], CommentCreateDto.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'BookId should be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'BookId should not be empty' }),
    __metadata("design:type", String)
], CommentCreateDto.prototype, "bookId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'UserId should be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'UserId should not be empty' }),
    __metadata("design:type", String)
], CommentCreateDto.prototype, "userId", void 0);
