const stripePromo = require("../../../controllers/adminPanel/Stripe/stripePromoCode");
const router = require("express").Router();
const stripe = require("../../../controllers/adminPanel/Stripe/stripe");
const stripePayment = require("../../../controllers/adminPanel/Stripe/stripepaymentlink");

const getAllPromoCodes = require("../../../controllers/adminPanel/Stripe/getAllPromoCodes");

const deletePromoCode = require("../../../controllers/adminPanel/Stripe/deletePromoCode");

// creating/adding vehicle
router.use("/stripe-promo-code", stripePromo);
router.use("/stripe-payment-link", stripePayment);
router.use("/promoCodes", getAllPromoCodes);
router.use("/deletePromoCode", deletePromoCode);
router.use("/checkout", stripe);
module.exports = router;
