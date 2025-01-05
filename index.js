import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let app = express();

app.use(bodyParser.json());

let mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
