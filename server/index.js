"use strict";

// Basic express setup:

require('dotenv').config();
const PORT          = process.env.PORT || 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGODB_URI = "mongodb://localhost:27017/tweeter";

//env to configure local enviroment variables for dev machine
// const MONGODB_URI = process.env.MONGODB_URI;
const { MongoClient } = require('mongodb');

//connect mongo to local host
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`)
    throw err;
  }
  const DataHelpers = require("./lib/data-helpers.js")(db);

  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);

})


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
