const createError = require("http-errors");
const AdditionalPrice = require("../../models/AdditionalPrice");
const Ride = require("../../models/Ride");

const Vehicle = require("../../models/Vehicle");
const { ObjectId } = require("mongoose").Types;

const getAllVehicles = async (req, res, next) => {
  try {
    const { className, seats, rideId } = req.query;

    let searchCriteria = {};

    let addPriceCriteria = {};

    if (rideId) {
      /// Calling ride by its id to get ride details
      const ride = await Ride.findOne({ _id: ObjectId(rideId) });

      let kms = ride.totalRideDistance;

      /// searching vehicles by passengers requirement.
      searchCriteria["$and"] = [
        { infant: { $gte: parseInt(ride.childSeats[0].infant) } },

        { toddler: { $gte: parseInt(ride.childSeats[1].toddler) } },

        { booster: { $gte: parseInt(ride.childSeats[2].booster) } },

        { luggageQuantity: { $gte: parseInt(ride.luggage) } },

        { capacity: { $gte: parseInt(ride.passengers) } },
      ];

      /// Called additional prices to add on ride charges
      const additionalPrices = await AdditionalPrice.find();

      let addAdditionalPrices = 0;
      let eventCharges = 0;
      let airportToll = 0;

      await additionalPrices.map((item) => {
        /// getting additional charges to add in ride everyTime

        if (item?.rateName == "GST" || item?.rateName == "ADMIN-FEE") {
          addAdditionalPrices =
            parseInt(addAdditionalPrices) + parseInt(item?.amount);
        } else if (item?.rateName == "EVENT-FEE") {
          /// getting Event charges to add in Event type rides

          eventCharges = parseInt(eventCharges) + parseInt(item?.amount);
        } else if (item?.rateName == "AIRPORT-TOLL") {
          /// getting Airport charges to add in Airport type rides

          airportToll = parseInt(airportToll) + parseInt(item?.amount);
        }
      });

      /// adding price per Km
      addPriceCriteria =
        ride?.paymentType == "perKm"
          ? perKmPrice(
              kms,
              ride,
              addAdditionalPrices,
              additionalPrices,
              eventCharges,
              airportToll
            )
          : perHourPrice(
              ride?.numberOfHours,
              ride,
              airportToll,
              addAdditionalPrices,
              eventCharges,
              additionalPrices
            );

      console.log("addAdditionalPrices", eventCharges, airportToll);
    }

    const vehicles = await Vehicle.aggregate([
      {
        $match: searchCriteria,
      },
      {
        $addFields: addPriceCriteria,
      },
      {
        $project: {
          _id: 1,
          vehicleName: 1,
          category: 1,

          price: 1,
          pricingDetails: 1,

          vehicleLogo: 1,
          vehicleImage: 1,
          category: 1,
          capacity: 1,
          luggageQuantity: 1,
          trailerOption: 1,
          vehicleOwner: 1,
        },
      },
      {
        $sort: { price: 1 },
      },
    ]);

    res.json({
      message: "Successfully Fetched vehicles for passenger.",
      count: vehicles.length,
      data: vehicles,
    });
  } catch (err) {
    next(err);
    console.log("err", err);
  }
};

module.exports = getAllVehicles;

function perKmPrice(
  kms,
  ride,
  addAdditionalPrices,
  additionalPrices,
  eventCharges,
  airportToll
) {
  /// if kms will be greater than fixedkms only then price will be calculated otherwise fixedPrice will be returned

  /// Calculated price from simple pick up to drop
  /// formula is
  /// fixPrice + ((rideKms - fixKms) * pricePerKm);
  const pointToPointSum = {
    $cond: [
      { $gte: [kms, { $toDouble: "$fixedKm" }] },
      {
        $sum: {
          $add: [
            { $toDouble: "$fixedPrice" },

            {
              $multiply: [
                {
                  $subtract: [{ $toDouble: kms }, { $toDouble: "$fixedKm" }],
                },
                { $toDouble: "$pricePerKm" },
              ],
            },
            ride.addTrailer ? 50 : 0,
            ride?.rideType == "Airport-Pickup" ||
            ride?.rideType == "Airport-Drop"
              ? airportToll
              : 0,
          ],
        },
      },
      {
        $toDouble: "$fixedPrice",
      },
    ],
  };

  /// calculated additional Charges to add up every time in ride prices
  /// formula is:
  /// (addAdditionalPrices * pointToPointSum) / 100
  const additionalCharges = {
    $sum: {
      $divide: [
        {
          $multiply: [
            {
              $add: [
                {
                  $toDouble: addAdditionalPrices,
                },

                {
                  /// Adding 'Event Fee' extra if ride is Event type
                  $toDouble: ride.rideType == "Event" ? eventCharges : 0,
                },
              ],
            },

            {
              $toDouble: pointToPointSum,
            },
          ],
        },
        {
          $toDouble: 100,
        },
      ],
    },
  };

  let addPriceCriteria = {
    price: {
      $sum: {
        $add: [
          {
            $toDouble: additionalCharges,
          },
          {
            $toDouble: pointToPointSum,
          },
        ],
      },
    },

    pricingDetails: {
      ridePrice: pointToPointSum,
      gst:
        additionalPrices?.find((item) => item?.rateName == "GST")?.amount + "%",
      adminFee:
        additionalPrices?.find((item) => item?.rateName == "ADMIN-FEE")
          ?.amount + "%",
      eventCharges: ride.rideType == "Event" ? eventCharges : 0,
      airportToll:
        ride?.rideType == "Airport-Pickup" || ride?.rideType == "Airport-Drop"
          ? airportToll
          : 0,

      trailer: ride.addTrailer ? 50 : 0,
    },
  };

  return addPriceCriteria;
}

function perHourPrice(
  hours,
  ride,
  airportToll,
  addAdditionalPrices,
  eventCharges,
  additionalPrices
) {
  /// Calculated price from simple pick up to drop
  /// formula is
  /// (hours * pricePerKm) + additional(if any);
  const pointToPointSum = {
    $cond: [
      { $gt: [hours, { $toDouble: 1 }] },
      {
        $sum: {
          $add: [
            // { $toDouble: "$pricePerHour" },

            {
              $multiply: [{ $toDouble: hours }, { $toDouble: "$pricePerHour" }],
            },
            ride.addTrailer ? 50 : 0,
            ride?.rideType == "Airport-Pickup" ||
            ride?.rideType == "Airport-Drop"
              ? airportToll
              : 0,
          ],
        },
      },
      {
        $toDouble: "$pricePerHour",
      },
    ],
  };

  /// calculated additional Charges to add up every time in ride prices
  /// formula is:
  /// (addAdditionalPrices * pointToPointSum) / 100
  const additionalCharges = {
    $sum: {
      $divide: [
        {
          $multiply: [
            {
              $add: [
                {
                  $toDouble: addAdditionalPrices,
                },

                {
                  /// Adding 'Event Fee' extra if ride is Event type
                  $toDouble: ride.rideType == "Event" ? eventCharges : 0,
                },
              ],
            },

            {
              $toDouble: pointToPointSum,
            },
          ],
        },
        {
          $toDouble: 100,
        },
      ],
    },
  };

  let addPriceCriteria = {
    price: {
      $sum: {
        $add: [
          {
            $toDouble: additionalCharges,
          },
          {
            $toDouble: pointToPointSum,
          },
        ],
      },
    },

    pricingDetails: {
      ridePrice: pointToPointSum,
      gst:
        additionalPrices?.find((item) => item?.rateName == "GST")?.amount + "%",
      adminFee:
        additionalPrices?.find((item) => item?.rateName == "ADMIN-FEE")
          ?.amount + "%",
      eventCharges: ride.rideType == "Event" ? eventCharges : 0,
      airportToll:
        ride?.rideType == "Airport-Pickup" || ride?.rideType == "Airport-Drop"
          ? airportToll
          : 0,

      trailer: ride.addTrailer ? 50 : 0,
    },
  };

  return addPriceCriteria;
}
