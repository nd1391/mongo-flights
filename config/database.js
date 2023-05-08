require("dotenv").config();

const mongoose = require("mongoose");

// Global configuration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const flights = {
    airline: String,
    flightNo: Number,
    departs: Date
}

module.exports = db