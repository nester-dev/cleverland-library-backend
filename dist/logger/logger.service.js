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
exports.LoggerService = void 0;
const winston_1 = require("winston");
const inversify_1 = require("inversify");
require("reflect-metadata");
const { combine, timestamp, colorize, simple, printf } = winston_1.format;
let LoggerService = class LoggerService {
    constructor() {
        this.logger = (0, winston_1.createLogger)({
            level: 'info',
            format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), simple(), this.changeFormat()),
            transports: [new winston_1.transports.Console()],
        });
    }
    changeFormat() {
        return printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${label}] ${level}: ${message}`;
        });
    }
    log(message, label) {
        this.logger.info(message, { label });
    }
    error(message, label) {
        this.logger.info(message, label);
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], LoggerService);
