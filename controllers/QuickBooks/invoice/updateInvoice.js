const { default: axios } = require("axios");
const { quickBook } = require("../../../config/keys");

const updateInvoice = async (req, res) => {
  try {
    const { update_content } = req.body;
    const findSyncToken = await axios.get(
      `${quickBook.quickBookBaseURL}/v3/company/${quickBook.realmID}/query?query=select * from Invoice where id = '${update_content.Id}'&minorversion=65`,
      {
        headers: {
          Authorization: `Bearer ${req.middlewareData}`,
          "Content-Type": "application/json",
        },
      }
    );
    try {
      const response = await axios.post(
        `${quickBook.quickBookBaseURL}/v3/company/${quickBook.realmID}/invoice?minorversion=65`,
        {
          ...update_content,
          SyncToken: findSyncToken.data.QueryResponse.Invoice[0].SyncToken,
        },
        {
          headers: {
            Authorization: `Bearer ${req.middlewareData}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.status(200).json({
        success: true,
        message: "Update invoice successfully.",
        redirect_url: `${quickBook.quickBookBaseRedirectURL}/app/invoice?txnId=${update_content.Id}`,
        response: response.data,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error,
        message: "Invoice not able to update in quickBooks.",
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Invoice id not found in quickBooks.",
    });
  }
};

module.exports = updateInvoice;
