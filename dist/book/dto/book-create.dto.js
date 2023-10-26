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
exports.BookCreateDto = void 0;
const class_validator_1 = require("class-validator");
class BookCreateDto {
}
exports.BookCreateDto = BookCreateDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Title should be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Title should not be empty' }),
    __metadata("design:type", String)
], BookCreateDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Rating should be a number' }),
    __metadata("design:type", Number)
], BookCreateDto.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Issue year should be a string' }),
    __metadata("design:type", String)
], BookCreateDto.prototype, "issueYear", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Description should be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Description should not be empty' }),
    __metadata("design:type", String)
], BookCreateDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Publish should be a string' }),
    __metadata("design:type", String)
], BookCreateDto.prototype, "publish", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Pages should be a string' }),
    __metadata("design:type", String)
], BookCreateDto.prototype, "pages", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Cover should be a string' }),
    __metadata("design:type", String)
], BookCreateDto.prototype, "cover", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Weight should be a string' }),
    __metadata("design:type", String)
], BookCreateDto.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Format should be a string' }),
    __metadata("design:type", String)
], BookCreateDto.prototype, "format", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'ISBN should be a string' }),
    __metadata("design:type", String)
], BookCreateDto.prototype, "ISBN", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Producer should be a string' }),
    __metadata("design:type", String)
], BookCreateDto.prototype, "producer", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Categories should not be empty' }),
    __metadata("design:type", Array)
], BookCreateDto.prototype, "categories", void 0);
