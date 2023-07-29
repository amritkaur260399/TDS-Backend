const stripe = require("stripe")(
  "sk_test_51Mc22rSBdYwT0SZRLQTSo0CTXR5PutzcI7Hr5c5Z49XbTb59STjegQU7bhGXQmz528xd0Qr93FysZ2LCPdoPclCz00mTzjltKS"
);
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

const paymentSheet = async (req, res, next) => {
  try {
    const { price } = req.body;

    console.log("price", parseInt(price?.toString()?.split(".")[0]) * 100);

    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2022-11-15" }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(price?.toString()?.split(".")[0]) * 100,
      currency: "inr",
      customer: customer.id,

      payment_method_types: ["card"],
      //   automatic_payment_methods: {
      //     enabled: true,
      //   },
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey:
        "pk_test_51Mc22rSBdYwT0SZR3nBWKPuykRnVpvbMM3PZ0SW15pyg6V9M8HFP6pTdnoyY4cAULSWsBmxSdP4CM0Z0nJJlCvR900tWgitvLX",
    });
  } catch (err) {
    next(err);
    console.log("err", err);
  }
};

module.exports = paymentSheet;
