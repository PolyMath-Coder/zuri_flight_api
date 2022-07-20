const express = require('express');
require('dotenv').config();
const { json } = require('express');
const nodemailer = require('nodemailer');
const AUTH_PASSWORD = process.env.PASSWORD;
const { email, mailGenerator } = require('./email');
const AUTH_EMAIL = process.env.EMAIL_ADDRESS;
const app = express();

app.use(json());

const routes = require('./routes/flightRoute');
app.use('/api', routes);

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

let mailOptions = {
  from: `"Ayooluwa from Zuri" <ayoluwadeleke@gmail.com>`,
  to: `ayoluwadeleke@gmail.com, aysintita@gmail.com`,
  subject: 'Zuri Training Nodemailer Project',
  html: mailGenerator.generate(email),
};

transporter.sendMail(mailOptions, function(err, data) {
  if (err) {
    console.log('Error ' + err);
  } else {
    console.log(`Email sent successfully, ${data}`);
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
