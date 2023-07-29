const { default: axios } = require("axios");
const { quickBook } = require("../../../config/keys");
const clientModel = require("../../../models/Client");
const driverModel = require("../../../models/Driver");

const createInvoice = async (req, res) => {
  try {
    const { qb_invoice, db_id, driver, qbCustomerID } = req.body;
    const response = await axios.post(
      `${quickBook.quickBookBaseURL}/v3/company/${quickBook.realmID}/invoice?minorversion=65`,
      {
        ...qb_invoice,
        CustomerRef: {
          value: qbCustomerID,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${req.middlewareData}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (driver) {
      await driverModel.findByIdAndUpdate(
        db_id,
        {
          qbInvoiceID: response.data.Invoice.Id,
        },
        { new: true }
      );
    } else {
      await clientModel.findByIdAndUpdate(
        db_id,
        {
          qbInvoiceID: response.data.Invoice.Id,
        },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: "invoice generate successfully.",
      redirect_url: `${quickBook.quickBookBaseRedirectURL}/app/invoice?txnId=${response.data.Invoice.Id}`,
    });
  } catch (inv_error) {
    return res.status(404).json({
      success: false,
      invoice_error: inv_error,
    });
  }
};

module.exports = createInvoice;
