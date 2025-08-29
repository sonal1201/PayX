"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Router = void 0;
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./user-router");
exports.v1Router = express_1.default.Router();
exports.v1Router.use('/user', user_router_1.userRouter);
// v1Router.use('./payment',)
