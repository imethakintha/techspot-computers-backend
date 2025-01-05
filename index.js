import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userRouter from "./routes/userRouter.js";


dotenv.config();

let app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  let token = req.headers("Authorization");

  if(token != null){
    token = token.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(!err){
            req.user = decoded;
        }
    })
  }
  next();
})

let mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/api/users", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
