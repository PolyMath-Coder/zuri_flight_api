const express = require('express');

const router = express.Router();
const {
  addFlight,
  getAllFlights,
  getOneFlight,
  EditFlightInfo,
  deleteFlightInfo,
} = require('../controllers/flightController');

router.post('/add', addFlight);

router.get('/flights', getAllFlights);

router.get('/:id', getOneFlight);

router.patch('/:id', EditFlightInfo);

router.delete('/:id', deleteFlightInfo);

module.exports = router;
