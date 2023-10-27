import express, { Application } from "express";
const cors = require('cors')
const app: Application = express();
import userRouter from "../src/modules/user/user.router"
import rideRouter from "../src/modules/ride/ride.router"
import paymentRouter from "./modules/payment/payment.router";


const corsOptions ={
    origin:'http://localhost:4200', 
    credentials:true,
    optionSuccessStatus:200
}
// using cors

app.use(cors(corsOptions));



// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Router
app.use('/api/v1/user', userRouter);
app.use('/api/v1/ride', rideRouter);
app.use('/api/v1/payment', paymentRouter);


export default app;

