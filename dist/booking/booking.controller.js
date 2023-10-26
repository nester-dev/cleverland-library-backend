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
exports.BookingController = void 0;
const base_controller_1 = require("../common/base.controller");
const auth_guard_1 = require("../common/auth.guard");
const validate_middleware_1 = require("../common/validate.middleware");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const booking_dto_1 = require("./dto/booking-dto");
let BookingController = class BookingController extends base_controller_1.BaseController {
    constructor(bookingService) {
        super();
        this.bookingService = bookingService;
        this.bindRoutes([
            {
                path: '/',
                method: 'post',
                func: this.createBooking,
                middleware: [new auth_guard_1.AuthGuard(), new validate_middleware_1.ValidateMiddleware(booking_dto_1.BookingDto)],
            },
            {
                path: '/:bookingId',
                method: 'put',
                func: this.updateBooking,
                middleware: [new auth_guard_1.AuthGuard(), new validate_middleware_1.ValidateMiddleware(booking_dto_1.BookingDto)],
            },
            {
                path: '/:bookingId',
                method: 'delete',
                func: this.deleteBooking,
                middleware: [new auth_guard_1.AuthGuard()],
            },
        ]);
    }
    createBooking({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.bookingService.createBooking(body);
                res.status(201).send({ message: 'booking created', data: result });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateBooking(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.bookingService.updateBooking(req.params.bookingId, req.body);
                res.status(201).send({ message: 'booking updated', data: result });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteBooking({ params: { bookingId } }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.bookingService.deleteBooking(bookingId);
                res.status(200).send({ message: 'booking deleted', data: result });
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.BookingController = BookingController;
exports.BookingController = BookingController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.BookingService)),
    __metadata("design:paramtypes", [Object])
], BookingController);
