"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../controllers/user");
const auth_middleware_1 = require("../../middlewares/auth-middleware");
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/register', user_1.registerUser);
exports.userRouter.post('/signin', user_1.signInUser);
exports.userRouter.put('/updateprofile/:userId', auth_middleware_1.authMiddleware, user_1.updateProfile);
