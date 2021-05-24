const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

//import Routes
const authRoutes = require("./routes/auth");

//app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"));

//middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(!new Error("Not allowed by CORS "));
    }
  },
};
app.use(cors(corsOptions));
app.use("/api", authRoutes);

// need for production
if (process.env.NODE_ENT === "production") {
  //serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // handle react routing, return all requests to React App
}

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is live on port", port);
});
