const cors = require('cors')
const stripe = require("stripe")(process.env.STRIP_SECRET_KEY);
import express from "express";
const router = express.Router();
const YOUR_DOMAIN = 'http://localhost:4200/';

router.post("/create-checkout-session",cors(), async (req, res) => {
    const {price,seat,rideData}= req.body
    const amountToCharge = (price * 100)

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data:{
                  unit_amount:amountToCharge,
                  currency :'usd',
                  product_data:{
                    name:'Ticket price for '+seat+' passenger',
                    description:'Ride start location is '+rideData.startPlaceName+' and end location is '+rideData.endPlaceName + ' on '+rideData.date + ' at '+rideData.time,
                    images:['https://blog-cdn.el.olx.com.pk/wp-content/uploads/2023/01/03172036/Car-Pool.jpg']
                  },
                },              
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}thankyou`,
            cancel_url: `${YOUR_DOMAIN}`,
          });
        
          return res.status(200).json({
            status: "success",
            data: session.url
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error
        })

    }
});

export default router;