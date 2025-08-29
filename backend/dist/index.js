"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const v1_1 = require("./routes/v1");
const db_config_1 = require("./configs/db-config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1", v1_1.v1Router);
app.get("/ok", (req, res) => {
    res.json({
        message: "server good",
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        await (0, db_config_1.connectToDB)();
        console.log(`Server is running on  ${PORT}`);
    }
    catch (error) {
        console.log("Unable to start server:", error);
        process.exit(1);
    }
});
