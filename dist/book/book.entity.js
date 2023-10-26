"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    constructor(id, title, rating, authors, categories, images, issueYear, description, publish, pages, cover, weight, format, ISBN, producer) {
        this.id = id;
        this.title = title;
        this.rating = rating;
        this.authors = authors;
        this.categories = categories;
        this.images = images;
        this.issueYear = issueYear;
        this.description = description;
        this.publish = publish;
        this.pages = pages;
        this.cover = cover;
        this.weight = weight;
        this.format = format;
        this.ISBN = ISBN;
        this.producer = producer;
    }
    get getCategories() {
        return this.categories;
    }
}
exports.Book = Book;
