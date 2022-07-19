const express = require('express');
const { json } = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// const flights = require("./controllers/flightController");

const routes = require('./routes/flightRoute');
const app = express();
require('dotenv').config();

app.use(json());

app.use('/api', routes);

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: `ayoluwadeleke@gmail.com`,
    pass: `@Faithie123`,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

let mailOptions = {
  from: `ayoluwadeleke@gmail.com`,
  to: `ayoluwadeleke@gmail.com`,
  subject: 'Nodemailer Project',
  text: 'Hi from your nodemailer project',
};

transporter.sendMail(mailOptions, function(err, data) {
  if (err) {
    console.log('Error ' + err);
  } else {
    console.log('Email sent successfully');
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
