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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterService = void 0;
const multer_1 = __importDefault(require("multer"));
const inversify_1 = require("inversify");
const uuid_1 = require("uuid");
let MulterService = class MulterService {
    constructor() {
        const storage = multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads/');
            },
            filename(req, file, callback) {
                const { originalname } = file;
                const format = originalname.substring(originalname.lastIndexOf('.') + 1);
                callback(null, `${(0, uuid_1.v4)()}.${format}`);
            },
        });
        this.upload = (0, multer_1.default)({ storage });
    }
    array(fieldName) {
        return this.upload.array(fieldName);
    }
};
exports.MulterService = MulterService;
exports.MulterService = MulterService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], MulterService);
