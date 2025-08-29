import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { v1Router } from "./routes/v1";
import { connectToDB } from "./configs/db-config";

const app = express();

app.use(express.json());


app.use("/api/v1", v1Router);
app.get("/ok", (req:Request,res: Response) => {
    res.json({
      message: "server good",
    });
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await connectToDB();
    console.log(`Server is running on  ${PORT}`);
  } catch (error) {
    console.log("Unable to start server:", error);
    process.exit(1);
  }
});
