const express = require('express');

const router = express.Router();
const { addFlight } = require('../controllers/flightController');

router.post('/', addFlight);

module.exports = router;
