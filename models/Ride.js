const { Schema, model } = require("mongoose");

const Ride = new Schema(
  {
    bookingNo: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    countryCode: {
      type: String,
    },
    phoneNo: {
      type: Number,
    },
    email: {
      type: String,
    },
    date: {
      type: Date,
    },
    time: {
      type: Date,
    },
    clientID: {
      type: Schema.Types.ObjectId,
      ref: "Passenger",
    },
    chauffeurID: {
      type: Schema.Types.ObjectId,
      ref: "Chauffeur",
    },

    price: {
      type: Number,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },

    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: "vehicle",
    },
    pickupLocation: {
      type: Object,
      required: true,
    },
    dropLocation: {
      type: Object,
      // required: true,
    },

    addStop: [
      {
        type: Object,
        // required: true,
      },
    ],

    paymentType: {
      type: String,
      enum: ["perKm", "perHour"],
    },

    paymentStatus: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Completed"],
    },

    totalRideDistance: {
      type: Number,
      // required: true,
    },

    numberOfHours: {
      type: Number,
    },

    chauffeurStatus: {
      type: String,
      default: "Pending",
      enum: [
        "Pending",
        "Started",
        "Completed",
        "Rejected",
        "Booked",
        "On-the-way",
        "Arrived",
      ],
    },

    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Started", "Completed", "Cancelled", "Booked"],
    },
    rejectedBy: [
      {
        _id: false,
        type: String,
      },
    ],
    rideMode: {
      type: String,
      enum: ["One-Way-Ride", "Round-Trip", "Instant-Ride"],
    },
    rideType: {
      type: String,
      enum: ["Point-to-Point", "Airport-Pickup", "Airport-Drop", "Event"],
    },
    passengers: {
      type: Number,
      // enum: [01, 02, 03, 04, 05, 06],
    },
    luggage: {
      type: Number,
      // enum: [01, 02, 03, 04, 05, 06],
    },
    luggageCapacityLarge: {
      type: Number,
      // enum: [01, 02, 03, 04, 05, 06],
    },
    luggageCapacitySmall: {
      type: Number,
      // enum: [01, 02, 03, 04, 05, 06],
    },
    childSeats: [{ type: Object }],

    vehicleType: {
      type: String,
      default: "SEDAN",
      enum: ["SEDAN", "SED", "SUV", "VAN", "BUS", "STR", "ROSA_BUS"],
    },
    airlineName: {
      type: String,
    },
    flightNumber: {
      type: String,
    },
    addTrailer: {
      type: Boolean,
    },
    flightDetails: {
      type: Object,
    },
  },

  { timestamps: true }
);

module.exports = model("ride", Ride, "ride");
