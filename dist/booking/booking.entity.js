"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
class Booking {
    constructor(id, order, dateOrder, book, customer) {
        this.id = id;
        this.order = order;
        this.dateOrder = dateOrder;
        this.book = book;
        this.customer = customer;
    }
}
exports.Booking = Booking;
