const { default: axios } = require("axios");
const { quickBook } = require("../../../config/keys");
const clientModel = require("../../../models/Client");

const createCustomer = async (req, res) => {
  try {
    const { qb, db_id, qb_invoice } = req.body;
    const response = await axios.post(
      `${quickBook.quickBookBaseURL}/v3/company/${quickBook.realmID}/customer?minorversion=65`,
      qb,
      {
        headers: {
          Authorization: `Bearer ${req.middlewareData}`,
          "Content-Type": "application/json",
        },
      }
    );
    await clientModel.findByIdAndUpdate(
      db_id,
      {
        qbCustomerID: response.data.Customer.Id,
      },
      { new: true }
    );
    try {
      const responseInvoice = await axios.post(
        `${quickBook.quickBookBaseURL}/v3/company/${quickBook.realmID}/invoice?minorversion=65`,
        {
          ...qb_invoice,
          CustomerRef: {
            value: response.data.Customer.Id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${req.middlewareData}`,
            "Content-Type": "application/json",
          },
        }
      );
      await clientModel.findByIdAndUpdate(
        db_id,
        {
          qbInvoiceID: responseInvoice.data.Invoice.Id,
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Customer created successfully with generated invoice.",
        response: response.data,
        redirect_url: `${quickBook.quickBookBaseRedirectURL}/app/customerdetail?nameId=${response?.data?.Customer?.Id}`,
      });
    } catch (inv_error) {
      return res.status(200).json({
        success: true,
        message: "Customer created successfully.",
        response: response.data,
        redirect_url: `${quickBook.quickBookBaseRedirectURL}/app/customerdetail?nameId=${response?.data?.Customer?.Id}`,
      });
    }
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Something went wrong",
      err,
    });
  }
};

module.exports = createCustomer;
