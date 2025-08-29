"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const zod_1 = require("zod");
exports.userValidator = zod_1.z.object({
    firstname: zod_1.z.string(),
    lastname: zod_1.z.string(),
    username: zod_1.z.string().min(4, "username must be greater than 4 char"),
    gmail: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(8, "password must be greater than 6")
});
