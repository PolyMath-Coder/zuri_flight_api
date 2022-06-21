const FlightModel = require('../models/Flight');

exports.addFlight = async (req, res) => {
  try {
    const newFlight = await FlightModel.create(req.body);
    res.status(200).send({
      status: 'Waow! Your flight was just scheduled... ',
      data: newFlight,
    });
  } catch (err) {
    res.status(400).json({ status: 'Oops! An error occurred...', msg: err });
  }
};

exports.getAllFlights = async (req, res) => {
  const flights = await FlightModel.find();
  try {
    res.status(201).json({ status: 'OK', data: flights });
  } catch (err) {
    res.status(400).json({ status: 'error', data: err });
  }
};

exports.getOneFlight = async (req, res) => {
  const { id } = req.params;
  try {
    const flight = await FlightModel.findById(id);
    res.status(200).json({ status: 'success', data: flight });
  } catch (err) {
    res.status(400).json({ status: 'error', msg: err });
  }
};

exports.EditFlightInfo = async (req, res) => {
  const { id } = req.params;
  const options = { new: true };
  const updatedinfo = req.body;
  try {
    const updateinfo = await FlightModel.findByIdAndUpdate(
      id,
      updatedinfo,
      options
    );
    res
      .status(200)
      .json({ status: 'This schedule was just updated...', data: updateinfo });
  } catch (err) {
    res.status(400).json({ status: 'error', msg: err });
  }
};

exports.deleteFlightInfo = async (req, res) => {
  const { id } = req.params;
  const deletedinfo = req.body;
  const deleteinfo = await FlightModel.findByIdAndDelete(id, deletedinfo);
  try {
    res
      .status(200)
      .json({ status: 'This schedule was just deleted...', data: deleteinfo });
  } catch (err) {
    res.status(400).json({ status: 'error', msg: err });
  }
};
