const { default: axios } = require("axios");
const { quickBook } = require("../../../config/keys");

const deleteInvoice = async (req, res) => {
  try {
    const response = await axios.post(
      `${quickBook.quickBookBaseURL}/v3/company/${quickBook.realmID}/invoice?operation=delete&minorversion=65`,
      qb,
      {
        headers: {
          Authorization: `Bearer ${req.headers["quickbooks_authorization"]}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.status(200).json({
      success: true,
      message: "Delete invoice successfully.",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error,
      message: "Invoice not able to delete.",
    });
  }
};

module.exports = deleteInvoice;
