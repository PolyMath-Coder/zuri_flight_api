const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const flightSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    trime: true,
  },
});

const FlightModel = mongoose.model('flight', flightSchema);
module.exports = FlightModel;
