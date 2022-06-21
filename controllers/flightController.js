const FlightModel = require('../models/Flight');

exports.addFlight = (req, res) => {
  const newFlight = FlightModel.create(req.body);
  res.status(200).send({ status: 'success', data: newFlight });
};
