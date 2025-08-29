"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.signInUser = exports.registerUser = void 0;
const userVaildator_1 = require("../validator/userVaildator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const dotenv_1 = __importDefault(require("dotenv"));
const account_model_1 = require("../models/account-model");
dotenv_1.default.config();
//SignUp user
const registerUser = async (req, res) => {
    const userdata = userVaildator_1.userValidator.safeParse(req.body);
    try {
        if (!userdata.success) {
            const errors = userdata.error.format();
            res.status(400).json({
                message: "Validation faileed",
                errors,
            });
            return;
        }
        const result = userdata.data;
        const existingUser = await user_1.userModel.findOne({
            $or: [{ username: result.username }, { gmail: result.gmail }],
        });
        if (existingUser) {
            res.status(400).send({
                message: "User already Exist",
            });
            return;
        }
        const createdUser = await user_1.userModel.create(result);
        const userId = createdUser._id;
        await account_model_1.Account.create({
            userId,
            balance: 1 + Math.random() * 1000
        });
        res.status(200).json({
            message: "user Created Successfully",
            data: { ...createdUser, password: "********" },
        });
    }
    catch (error) {
        console.error("Error in controller:", error);
        res.status(500).json({
            message: "Something went wrong",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.registerUser = registerUser;
//SignIn User
const signInUser = async (req, res) => {
    const { usernameOremail, password } = req.body;
    try {
        if (!usernameOremail && !password) {
            res.status(400).json({
                message: "Please provide username and password",
            });
            return;
        }
        const finduser = await user_1.userModel.findOne({
            $or: [{ username: usernameOremail }, { gmail: usernameOremail }],
        });
        if (!finduser) {
            res.status(404).json({
                message: "User not found Please provide correct credentials",
            });
            return;
        }
        if (finduser.password !== password) {
            console.log("DB password:", finduser.password);
            console.log("User input:", password);
            return res.status(400).json({
                message: "Password is incorrect",
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: finduser._id.toString() }, process.env.JWT_SECRET);
        res.status(200).json({
            message: "User logged in successfully",
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Invaild network Error",
            data: error
        });
        return;
    }
};
exports.signInUser = signInUser;
const updateProfile = async (req, res) => {
    const { firstname, lastname, password } = req.body;
    const userId = req.body?.id || req.params.userId;
    try {
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const updateData = {};
        if (firstname)
            updateData.firstname = firstname;
        if (lastname)
            updateData.lastname = lastname;
        if (password) {
            updateData.password = password;
        }
        const updatedUser = await user_1.userModel.findByIdAndUpdate(userId, updateData);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "Profile updated successfully",
            data: await user_1.userModel.findById(userId),
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Invaild network Error",
            data: error
        });
        return;
    }
};
exports.updateProfile = updateProfile;
