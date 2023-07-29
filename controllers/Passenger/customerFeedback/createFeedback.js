const Feedback = require("../../.././models/CustomerFeedback");

const feedback = async (req, res) => {
  try {
    const { customerName, customerId, feedback , rateCount } = req.body;

    const customerFeedback = new Feedback({
      customerName,
      customerId,
      feedback,
      rateCount
    });

    await customerFeedback.save();

    res.status(200).json({
      success: true,
      message: "Successfully!",
      data: customerFeedback,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = feedback;
