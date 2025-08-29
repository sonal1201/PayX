import { Request, Response } from "express";
import { userValidator, User } from "../validator/userVaildator";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user";
import dotenv from "dotenv";
import { safeParse } from "zod";
import { Account } from "../models/account-model";
dotenv.config();


//SignUp user
export const registerUser = async (req: Request, res: Response) => {
  const userdata = userValidator.safeParse(req.body);

  try {
    if (!userdata.success) {
      const errors = userdata.error.format();
      res.status(400).json({
        message: "Validation faileed",
        errors,
      });

      return;
    }

    const result: User = userdata.data;

    const existingUser = await userModel.findOne({
      $or: [{ username: result.username }, { gmail: result.gmail }],
    });

    if (existingUser) {
      res.status(400).send({
        message: "User already Exist",
      });
      return;
    }

    const createdUser = await userModel.create(result);
    const userId = createdUser._id;

    await Account.create({
      userId,
      balance: 1 + Math.random() * 1000
    })


    res.status(200).json({
      message: "user Created Successfully",
      data: { ...createdUser, password: "********" },

    });
  } catch (error) {
    console.error("Error in controller:", error);

    res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};


//SignIn User
export const signInUser = async (req: Request, res: Response) => {
  const { usernameOremail, password } = req.body;

  try {
    if (!usernameOremail && !password) {
      res.status(400).json({
        message: "Please provide username and password",
      });
      return;
    }

    const finduser = await userModel.findOne({
      $or: [{ username: usernameOremail }, { gmail: usernameOremail }],
    });

    if (!finduser) {
      res.status(404).json({
        message: "User not found Please provide correct credentials",
      });
      return;
    }

    if (finduser!.password !== password) {
      console.log("DB password:", finduser!.password);
      console.log("User input:", password);
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }


    const token = jwt.sign(
      { id: finduser!._id.toString() },
      process.env.JWT_SECRET!
    );

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Invaild network Error",
      data: error
    })
    return;
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { firstname, lastname, password } = req.body;
  const userId = req.body?.id || req.params.userId;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }


    const updateData: Partial<{ firstname: string; lastname: string; password: string }> = {};
    if (firstname) updateData.firstname = firstname;
    if (lastname) updateData.lastname = lastname;
    if (password) {
      updateData.password = password;
    }
    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      data: await userModel.findById(userId),
    });
  } catch (error) {
    res.status(500).json({
      message: "Invaild network Error",
      data: error
    })
    return;
  }
};
