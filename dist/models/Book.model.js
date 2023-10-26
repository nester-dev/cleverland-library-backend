"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const BookSchema = new mongoose.Schema({
    id: { type: String, required: [true, 'Id is required'] },
    title: { type: String, required: [true, 'Title is required'] },
    rating: { type: Number, required: [true, 'Rating is required'] },
    issueYear: { type: String, required: [true, 'Issue year is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    publish: { type: String, required: [true, 'Publish is required'] },
    pages: { type: String, required: [true, 'Pages is required'] },
    cover: { type: String, required: [true, 'Cover is required'] },
    weight: { type: String, required: [true, 'Weight is required'] },
    format: { type: String, required: [true, 'Format is required'] },
    ISBN: { type: String, required: [true, 'ISBN is required'] },
    producer: { type: String, required: [true, 'Producer is required'] },
    authors: { type: [String], required: [true, 'Authors is required'] },
    categories: [String],
    images: [{ url: String }],
    comments: [
        {
            id: { type: String, required: [true, 'Id is required'] },
            rating: Number,
            text: { type: String, required: [true, 'Text is required'] },
            createdAt: Date,
            user: {
                commentUserId: { type: String, required: [true, 'userId is required'] },
                firstName: { type: String, required: [true, 'firstName is required'] },
                lastName: { type: String, required: [true, 'lastName is required'] },
                avatarUrl: { type: String, default: null },
            },
        },
    ],
    booking: {
        id: { type: String, required: [true, 'BookingId is required'] },
        order: Boolean,
        dateOrder: { type: Date, required: [true, 'Date is required'] },
        customerId: { type: String, required: [true, 'CustomerId is required'] },
        customerFirstName: { type: String, required: [true, 'customerFirstName is required'] },
        customerLastName: { type: String, required: [true, 'customerLastName is required'] },
    },
});
exports.default = mongoose.model('Book', BookSchema);
