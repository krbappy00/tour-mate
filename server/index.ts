import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
const mongoose = require("mongoose");
const webpush = require("web-push");
import app from "./src/app";
//For env File
dotenv.config();
const dbname = "tour-mate";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uiqovdn.mongodb.net/${dbname}?retryWrites=true&w=majority`;

// CONNECTION
const dbConnect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("db is connected");
    const port = process.env.PORT || 5000;
    app.get("/", (req: Request, res: Response) => {
      res.send("Welcome to Express & TypeScript Server");
    });

    app.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
    });
  } catch (error: any) {
    console.log("db is not connected");
    console.log(error.message);
  }
};
dbConnect();
