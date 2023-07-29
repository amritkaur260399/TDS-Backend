const {Schema, model} = require("mongoose");

const DriverDrugAndAlcoholModal = new Schema(
    {
        driverId: { type: Schema.Types.ObjectId, ref: "Driver", require: true },
        queryDate: {type: Date, required: false},
        expireDate: {type: Date, required: false},
        queryForm: {type: String, required: false}
    },
  { timestamps: true }
)

module.exports = model(
    "DriverDrugAndAlcohol",
    DriverDrugAndAlcoholModal,
    "DriverDrugAndAlcohol"
  );