const express = require('express');
const { json } = require('express');
const mongoose = require('mongoose');

// const flights = require("./controllers/flightController");

const routes = require('./routes/flightRoute');
const app = express();
require('dotenv').config();
const mongoString = process.env.DATABASE_KEY;

const connect = () => {
  mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  database = mongoose.connection;
  database.on('error', (err) => {
    console.error(err);
    console.error(`Ooopss! An error Just Occurred!`);
  });

  database.once('connected', () => {
    console.log('Database now connected...');
  });
};

app.use(json());

app.use('/api', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

connect();
