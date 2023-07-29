const UserPortal = require("../../models/userPortal");

const createUserPortal = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email } = req.body;
    const data = new UserPortal({
      firstName,
      lastName,
      phoneNumber,
      email,
    });
    await data.save();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};
module.exports = createUserPortal;
