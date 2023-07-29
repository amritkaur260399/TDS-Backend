const radar = require("flightradar24-client/lib/radar");
const flight = require("flightradar24-client/lib/flight");

const flightdata = require("flight-data");

const getFlightDetails = async (req, res, next) => {
  try {
    flight("2fab5dba")
      .then((res) => {
        console.log("Res ", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
    // flightdata
    //   .flights({
    //     API_TOKEN: "302b244cf60eba1c60f335e8d2e69aba",
    //     options: {
    //       limit: 1,
    //       flight_number: "QF1501",
    //       flight_date: "20203-03-23",
    //       arr_iata: "SEA",
    //     },
    //   })
    //   .then((response) => {
    //     console.log("response", response);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    // //   });

    // radar(53, 13, 52, 14).then(console.log).catch(console.error);
  } catch (err) {
    next(err);
    console.log("err", err);
  }
};

module.exports = getFlightDetails;
