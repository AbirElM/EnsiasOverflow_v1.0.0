const express = require("express");
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const corse = require("cors");


dotenv.config();

/**Import routes
 */
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const tagRoute = require("./routes/tags");

// Connect to DataBase

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://ilham:mongodb@73$@cluster0.2slfn.mongodb.net/ensiasoverflow?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
// mongoose.connect(uri,
//     {   useNewUrlParser: true,
//             useUnifiedTopology: true},()=>{
//             console.log('Connected to DB');

// });
// mongoose.connection.on("error", function(error) {
//     console.log(error)
//   })

// const uri = "mongodb+srv://ilham:mongodb@73$@cluster0.2slfn.mongodb.net/ensiasoverflow?retryWrites=true&w=majority";
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
  }
);

/**
 * Express .JSON
 */
app.use(express.json()); // to be able to read the json data posted

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

/**
 * Cross origin resource sharing
 */
app.use(corse());
app.use(express.static(__dirname + "/public"));

/**Routes Middleware */
app.use("/api/user", authRoute); /* Prefix for the routes in ./routes/auth.js */
app.use("/api/posts", postRoute);
app.use("/api/tags", tagRoute);

/** Start Node Server */
app.listen(5000, () =>
  console.log(" //*/*/ \\ *// Server Up and running ^o^ p : 5000 /*//_/**** ")
);
