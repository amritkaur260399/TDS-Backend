const Chauffeur = require("../../../models/Chauffeur");
const Ride = require("../../../models/Ride");
const Vehicle = require("../../../models/Vehicle");
const GetCoordinates = require("../../../services/GeoLocation/GetCoordinates");
const getRideDistance = require("../../../services/GeoLocation/getRideDistance");
const sendNotifications = require("../../../services/notifications/notification");

const { ObjectId } = require("mongoose").Types;

const updateRide = async (req, res, next) => {
  try {
    const { status, ridePrice } = req.query;

    const {
      chauffeurID,
      rideID,

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
      childSeat,
      paymentType,
      paymentStatus,
      vehicleType,
      airlineName,
      flightNumber,
      addTrailer,
      flightDetails,

      numberOfHours,
    } = req.body;

    if (status) {
      if (status == "cancel") {
        await Ride.findOneAndUpdate(
          { _id: ObjectId(rideID) },
          { status: "Cancelled" },
          { new: true }
        );
      } else if (status == "delete") {
        await Ride.findOneAndUpdate(
          { _id: ObjectId(rideID) },
          { $unset: { customerId: "" } },
          { new: true }
        );
      } else if (status == "price") {
        await Ride.findOneAndUpdate(
          { _id: ObjectId(rideID) },
          {
            vehicleId,
            price,
            paymentStatus,
          }
        );
      }
      res.json({ message: "Ride updated successfully." });
    } else {
      let pickUpCoords;
      let dropCoords;

      if (pickupPlaceId) {
        pickUpCoords = await GetCoordinates(pickupPlaceId);
      }

      if (dropPlaceId) {
        dropCoords = await GetCoordinates(dropPlaceId);
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

      let distance = await getRideDistance(pickupPlaceId, dropPlaceId, addStop);

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

      console.log("finalDistance", distance);

      let ridePrice;

      let chauffeur;

      if (chauffeurID) {
        chauffeur = await Chauffeur.findOne({
          _id: ObjectId(chauffeurID),
        });

        const vehicle = await Vehicle.findOne({
          _id: ObjectId(chauffeur.vehicleId),
        });

        const trailerPrice = addTrailer ? 50 : 0;

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

      await Ride.findOneAndUpdate(
        {
          _id: ObjectId(rideID),
        },
        {
          chauffeurID,

          price,
          customerId,
          vehicleId: vehicleId || chauffeur?.vehicleId,

          date,
          rideTime,
          firstName,
          lastName,
          countryCode,
          phoneNo,
          email,

          pickupLocation: {
            name: pickupLocation,
            pickUpCoords,
          },
          dropLocation: {
            name: dropLocation,
            dropCoords,
          },
          addStop: stopsOfRide,

          rideMode,
          rideType,
          passengers,
          luggage,
          luggageCapacityLarge,
          luggageCapacitySmall,
          childSeat,
          paymentType,
          paymentStatus,
          vehicleType,

          airlineName,
          flightNumber,
          addTrailer,

          flightDetails,
          numberOfHours,

          totalRideDistance: parseInt(distance),
          price: ridePrice,
        },
        { new: true }
      );

      res.json({
        message: "Ride Updated Successfully",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = updateRide;
