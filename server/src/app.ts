import path from "path";
import express, { Application } from "express";
const cors = require("cors");
const app: Application = express();
import userRouter from "../src/modules/user/user.router";
import rideRouter from "../src/modules/ride/ride.router";
import paymentRouter from "./modules/payment/payment.router";

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
// using cors

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "client")));

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Router
app.use("/api/v1/user", userRouter);
app.use("/api/v1/ride", rideRouter);
app.use("/api/v1/payment", paymentRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

export default app;
