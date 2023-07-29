const express = require("express");

require("dotenv").config();
const stripe = require("stripe");
const paymentLinkTemplate = require("../../../templates/paymentLink");
const Stripe = stripe(process.env.STRIPE_KEY);
const router = express.Router();
router.post("/create-payment-link", async (req, res) => {
  console.log(req.body);
  const { price, email } = req.body;

  const product = await Stripe.products
    .create({
      name: "Ride",
    })
    .then(async (res) => {
      const price = await Stripe.prices
        .create({
          currency: "aud",
          unit_amount: price,
          product: res.id,
        })
        .then(async (res) => {
          const paymentLink = await Stripe.paymentLinks
            .create({
              line_items: [{ price: res.id, quantity: 1 }],
            })
            .then((val) => {
              console.log("val", val);
            });
        });
    });

  paymentLinkTemplate({ amount: price, link: product?.url });

  res.status(200).send(product);
});
module.exports = router;
