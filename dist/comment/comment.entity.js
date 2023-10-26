"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
class Comment {
    constructor(id, rating, text, userId, bookId) {
        this.id = id;
        this.rating = rating;
        this.text = text;
        this.userId = userId;
        this.bookId = bookId;
        this.user = {
            commentUserId: null,
            firstName: null,
            lastName: null,
            avatarUrl: null,
        };
    }
    getId() {
        return this.bookId;
    }
    setUserInfo(userModel) {
        this.user.commentUserId = userModel.id;
        this.user.firstName = userModel.firstName;
        this.user.lastName = userModel.lastName;
        this.user.avatarUrl = userModel.avatar;
    }
}
exports.Comment = Comment;
