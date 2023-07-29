const {
  createRideValidation,
} = require("../../../services/validations/validation_schema");
const Ride = require("../../../models/Ride");
const GetCoordinates = require("../../../services/GeoLocation/GetCoordinates");
const getRideDistance = require("../../../services/GeoLocation/getRideDistance");
const Chauffeur = require("../../../models/Chauffeur");
const Vehicle = require("../../../models/Vehicle");
const createRideBookingNumber = require("../../../services/createBookingNumber/createRideBookingNumber");
const AdditionalPrice = require("../../../models/AdditionalPrice");

const { ObjectId } = require("mongoose").Types;

const createRide = async (req, res, next) => {
  try {
    const result = await createRideValidation.validateAsync(req.body);

    let {
      chauffeurID,

      price,
      customerId,
      vehicleId,

      pickupLocation,
      pickupPlaceId,

      dropLocation,
      dropPlaceId,

      addStop,

      date,
      rideTime,

      firstName,
      lastName,
      countryCode,
      phoneNo,
      email,

      rideMode,
      rideType,
      passengers,
      luggage,
      luggageCapacityLarge,
      luggageCapacitySmall,
      childSeats,
      vehicleType,
      paymentStatus,
      paymentType,

      numberOfHours,

      airlineName,
      flightNumber,
      addTrailer,
      flightDetails,
    } = result;

    let ridekms;

    let pickUpCoords;
    let dropCoords;

    if (pickupPlaceId) {
      pickUpCoords = await GetCoordinates(pickupPlaceId);
    }

    const stopsOfRide = [];

    if (addStop && addStop?.length > 0) {
      for (let x of addStop) {
        const stopCoords = await GetCoordinates(x.stopPlaceId);

        stopsOfRide.push({
          name: x.stopName,
          stopCoords,
          stopPlaceId: x.stopPlaceId,
        });
      }
    }

    if (dropPlaceId) {
      dropCoords = await GetCoordinates(dropPlaceId);
    }

    /// create unique Ride Booking Number everytime
    let bookingNumber = await createRideBookingNumber();

    let distance = 0;
    if (paymentType != "perHour") {
      // getting ride distance
      distance = await getRideDistance(pickupPlaceId, dropPlaceId, addStop);

      /// if Ride is round trip then double charges other wise normal charges
      distance =
        rideMode == "Round-Trip"
          ? (distance + distance) / 1000
          : distance / 1000;

      if (distance.toString().includes(".")) {
        distance = await parseInt(distance + 1)
          .toString()
          .split(".")[0];
      }
      console.log(distance);
    }

    let ridePrice;

    let chauffeur;

    if (chauffeurID) {
      chauffeur = await Chauffeur.findOne({
        _id: ObjectId(chauffeurID),
      });

      const vehicle = await Vehicle.findOne({
        _id: ObjectId(chauffeur.vehicleId),
      });

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

      ridePrice =
        distance >= vehicle.fixedKm
          ? parseInt(vehicle.fixedPrice) +
            (parseInt(distance) - parseInt(vehicle.fixedKm)) *
              parseInt(vehicle.pricePerKm) +
            addTrailer
            ? 50
            : 0
          : vehicle.fixedPrice;

      console.log("ridePrice", ridePrice);

      if (chauffeur?.notifToken) {
        await sendNotifications({
          title: "You have a new Ride.",
          body: `A new ride has assigned to you at ${new Date(
            date
          ).toLocaleString()}.`,

          receiverId: chauffeurID,
          type: "new-ride",
          token: chauffeur?.notifToken?.toString(),
        });
      }
    }

    const ride = new Ride({
      bookingNo: bookingNumber?.toString(),
      date,
      time: new Date(rideTime).toUTCString(),
      firstName,
      lastName,
      countryCode,
      phoneNo,
      email,

      chauffeurID,

      price,
      customerId,
      vehicleId,

      pickupLocation: {
        name: pickupLocation,
        pickUpCoords,
        placeId: pickupPlaceId,
      },
      dropLocation: {
        name: dropLocation,
        dropCoords,
        placeId: dropPlaceId,
      },
      addStop: stopsOfRide,

      rideMode,
      rideType,
      passengers,
      luggage,
      luggageCapacityLarge,
      luggageCapacitySmall,
      childSeats,
      vehicleType,
      paymentType,
      paymentStatus,
      airlineName,
      flightNumber,
      addTrailer,
      flightDetails,
      totalRideDistance: parseInt(distance),

      numberOfHours,

      price: ridePrice,
    });

    await ride.save();

    // if (chauffeurID) {
    //   const chauffeur = await Chauffeur.findOne({
    //     _id: ObjectId(chauffeurID),
    //   });

    //   await sendNotifications({
    //     title: "You have a new Ride.",
    //     body: `A new ride has assigned to you at ${new Date(
    //       date
    //     ).toLocaleString()}.`,

    //     receiverId: chauffeurID,
    //     type: "new-ride",
    //     token: chauffeur?.notifToken?.toString(),
    //   });
    // }

    res.status(200).json({
      message: "Ride saved successfully",
      success: true,
      ride_id: ride._id,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = createRide;
