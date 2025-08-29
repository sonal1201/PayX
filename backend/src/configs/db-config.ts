import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectToDB() {
  try {
    const DATABASE_URL = process.env.DATABASE_URL;
    await mongoose.connect(DATABASE_URL!);
    console.log("Successfully connected to MongoDB database");
  } catch (error) {
    console.log("Unable to connect to the database server");
    console.log("Error:", error);
    process.exit(1);
  }
}
