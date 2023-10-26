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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryStorageService = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const inversify_1 = require("inversify");
const types_1 = require("../types");
const http_error_class_1 = require("../errors/http-error.class");
const streamifier_1 = __importDefault(require("streamifier"));
let CloudinaryStorageService = class CloudinaryStorageService {
    constructor(configService) {
        this.configService = configService;
        this.cloudinaryConfig = {
            cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
        };
        cloudinary_1.default.v2.config(this.cloudinaryConfig);
    }
    uploadImagesToStorage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let files = [];
            if (Array.isArray(data)) {
                files = data;
            }
            else if (typeof data === 'object') {
                Object.values(data).forEach((value) => {
                    files = files.concat(value);
                });
            }
            return Promise.all(files.map((file) => {
                const { originalname } = file;
                return new Promise((res, rej) => {
                    const cld_upload_stream = cloudinary_1.default.v2.uploader.upload_stream({ folder: 'cleverland' }, (error, result) => {
                        if (error) {
                            rej(new http_error_class_1.HttpError(500, 'Error uploading image'));
                        }
                        if (result) {
                            const url = cloudinary_1.default.v2.url(result === null || result === void 0 ? void 0 : result.public_id, {
                                format: originalname.substring(originalname.lastIndexOf('.') + 1),
                            });
                            res({ id: result === null || result === void 0 ? void 0 : result.public_id, url });
                        }
                    });
                    streamifier_1.default.createReadStream(file.buffer).pipe(cld_upload_stream);
                });
            }));
        });
    }
    deleteFileLocation(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(fileName);
        });
    }
};
exports.CloudinaryStorageService = CloudinaryStorageService;
exports.CloudinaryStorageService = CloudinaryStorageService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __metadata("design:paramtypes", [Object])
], CloudinaryStorageService);
