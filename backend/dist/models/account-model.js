"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const accountSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId, // Reference to User model
        ref: 'userModel',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});
exports.Account = mongoose_1.default.model('Account', accountSchema);
