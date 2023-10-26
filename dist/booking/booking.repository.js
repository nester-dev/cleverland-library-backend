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
exports.BookingRepository = void 0;
const Booking_model_1 = __importDefault(require("../models/Booking.model"));
const inversify_1 = require("inversify");
const User_model_1 = __importDefault(require("../models/User.model"));
const http_error_class_1 = require("../errors/http-error.class");
const Book_model_1 = __importDefault(require("../models/Book.model"));
let BookingRepository = class BookingRepository {
    constructor() { }
    createBooking(customer, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_model_1.default.findOne({ id: customer });
            const book = yield Book_model_1.default.findOne({ id: data.book });
            if (!user) {
                throw new http_error_class_1.HttpError(404, 'User not found');
            }
            if (!book) {
                throw new http_error_class_1.HttpError(404, 'Book not found');
            }
            user.booking = data;
            book.booking = {
                id: data.id,
                order: data.order,
                dateOrder: data.dateOrder,
                customerId: customer,
                customerFirstName: user.firstName,
                customerLastName: user.lastName,
            };
            yield user.save();
            yield book.save();
            return Booking_model_1.default.create(data);
        });
    }
    updateBooking(bookingId, { order, dateOrder }) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield Booking_model_1.default.findOne({ id: bookingId });
            if (!booking) {
                throw new http_error_class_1.HttpError(404, 'Booking not found');
            }
            yield User_model_1.default.updateOne({ id: booking.customer }, { $set: { 'booking.order': order, 'booking.dateOrder': dateOrder } });
            yield Book_model_1.default.updateOne({ id: booking.book }, { $set: { 'booking.order': order, 'booking.dateOrder': dateOrder } });
            return Booking_model_1.default.findOneAndUpdate({ id: bookingId }, { $set: { order, dateOrder } }, { new: true });
        });
    }
    deleteBooking(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const booking = yield Booking_model_1.default.findOne({ id });
            if (!booking) {
                throw new http_error_class_1.HttpError(404, 'Booking not found');
            }
            yield User_model_1.default.updateOne({ id: booking.customer }, { $set: { booking: null } });
            yield Book_model_1.default.updateOne({ id: booking.book }, { $set: { booking: null } });
            return Booking_model_1.default.findOneAndDelete({ id }, { new: true });
        });
    }
};
exports.BookingRepository = BookingRepository;
exports.BookingRepository = BookingRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], BookingRepository);
