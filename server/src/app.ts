import express, { Application } from "express";
import cors from "cors";
const app: Application = express();
import userRouter from "../src/modules/user/user.router"

// using cors
app.use(cors({ credentials: true, origin: true }));

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Router
app.use('/api/v1/user', userRouter);

export default app;

