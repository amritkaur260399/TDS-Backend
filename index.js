const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const chalk = require("chalk");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { port, hostIP } = require("./config/keys").host;
// const stripe = require ('./routes/stripe')
// const { accountSid, authToken } = require("./config/keys").twilio;
const bodyParser = require("body-parser");
const routes = require("./routes");
const { database } = require("./config/keys");
const socketIO = require("./socket/socketIO");
// const notificationSocket = require("./socketIO");
// const twilio = require("twilio")(accountSid, authToken)

// app.use((req, res, next) => {
//   req.twilio = twilio;
//   next();
// });
var admin = require("firebase-admin");

var serviceAccount = require("./config/b-g-chauffeur-firebase-adminsdk-mb9gc-830eb05ade.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors());

const io = require("socket.io")(http, {
  cors: {
    origin: [
      "http://localhost:8000",
      "http://localhost:8000/",
      "http://localhost:5000",
      "http://127.0.0.1:5000",
      "https://tds-admin-c2f0d.web.app/",
      "https://tds-admin-c2f0d.web.app",
      "https://tds-admin-5c009.web.app/",
    ],
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json({ limit: "50mb", extended: true }));

app.use(express.urlencoded({ limit: "50mb", extended: true }));
const corsOptions = {
  origin: [
    "http://localhost:8000",
    "http://localhost:5000",
    "http://127.0.0.1:5000",
    "https://tds-admin-c2f0d.web.app/",
    "https://tds-admin-c2f0d.web.app",
    "https://tds-admin-5c009.web.app/",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.use('/api/stripe',stripe)
app.use(cookieParser());
app.use(morgan("combined"));
app.use(routes);

// app.use(passport.initialize());
// app.use(passport.session());

// Connect to MongoDB
mongoose.set("useCreateIndex", true);

const url =
  process.env.NODE_ENV === "test"
    ? process.env.DB_CONNECT
    : process.env.LIVE_DB_CONNECT;

mongoose
  .connect(url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() =>
    console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`)
  )
  .then(() => {
    const HOST = "0.0.0.0";
    const PORT =
      process.env.NODE_ENV === "test"
        ? process.env.TEST_PORT
        : process.env.LIVE_PORT;

    http.listen(PORT, HOST, () => {
      console.log(
        `${chalk.green("✓")} ${chalk.blue(
          "Server Started on port"
        )} http://${chalk.bgMagenta.white(HOST)}:${chalk.bgMagenta.white(PORT)}`
      );
    });
    socketIO(io);
  })
  .catch((err) => console.log(err));
