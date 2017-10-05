const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const config = require("./config/database");

//database connection
mongoose.connect(config.database,{ useMongoClient: true });

//on connection
mongoose.connection.on("connected", () => {
    console.log("Connected to the Database " + config.database);
});

//on error
mongoose.connection.on("error", (err) => {
    console.log("Database error: " + err);
});

const app = express();

const users = require("./routes/users");

//initialize port
const port = 3000;

//cors middleware 
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//body parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);

//index route 
app.get("/", (req, res) => {
    res.send("Invalid Endpoint");
});

//start server
app.listen(port, () => {
    console.log("server started on port " + port);
});