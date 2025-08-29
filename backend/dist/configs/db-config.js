"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = connectToDB;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function connectToDB() {
    try {
        const DATABASE_URL = process.env.DATABASE_URL;
        await mongoose_1.default.connect(DATABASE_URL);
        console.log("Successfully connected to MongoDB database");
    }
    catch (error) {
        console.log("Unable to connect to the database server");
        console.log("Error:", error);
        process.exit(1);
    }
}
