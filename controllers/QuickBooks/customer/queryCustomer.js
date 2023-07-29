const { default: axios } = require("axios");
const { quickBook } = require("../../../config/keys");

const queryCustomer = async (req, res) => {
  const { query } = req.body;
  try {
    const response = await axios.get(
      `${quickBook.quickBookBaseURL}/v3/company/${quickBook.realmID}/query?query=${query}&minorversion=65`,
      {
        headers: {
          Authorization: `Bearer ${req.middlewareData}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.status(200).json({
      success: true,
      response: response.data.QueryResponse.Customer,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Customer query may be wrong.",
      error,
    });
  }
};

module.exports = queryCustomer;

// select * from Customer
