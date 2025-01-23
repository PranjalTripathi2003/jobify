import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
const app = express();
dotenv.config();
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cloudinary from "cloudinary";
// Getting the avatars
const __dirname = dirname(fileURLToPath(import.meta.url));

// Fetching the state of the web app from environment variable, if it is in development mode, then it will use morgan to log the requests.
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Configuring cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Middleware for avatar
app.use(express.static(path.resolve(__dirname, "./public")));
// Middleware to fetch json files
app.use(express.json());
// Middleware to parse the cookie with token
app.use(cookieParser());

// Dummy route to check if the server is running or not.
app.get("/", (req, res) => res.send("Hi, the server spun up!"));

// Dummy post route to check if the server is able to accept the post requests or not.
app.post("/", (req, res) => {});

// Dummy test route
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

// JOB ROUTES
app.use("/api/v1/jobs", authenticateUser, jobRouter);

// AUTH ROUTES
app.use("/api/v1/auth", authRouter);

// USER ROUTES
app.use("/api/v1/users", authenticateUser, userRouter);

// FOR SPINNING UP THE SERVER FROM THE FRONT END
app.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname, './public', 'index.html'))
})
// Handles all the non defined routes, 404 not found for them all.
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// Non routing errors handled by the error handler middleware, handles HTTP 500 internal server errors.
app.use(errorHandlerMiddleware);

// Defining the port
const port = process.env.PORT || 5100;

// Making a connection with the database, present online in mongo cluster , uses mongoose to connect to the database.
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server is listening on ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
