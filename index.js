const express = require('express');
require('dotenv').config();
const { json } = require('express');
const nodemailer = require('nodemailer');
const AUTH_PASSWORD = process.env.PASSWORD;
const GOOGLE_CLIENTID = process.env.OAUTH_CLIENTID;
const GOOGLE_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const GOOGLE_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;

const { email, mailGenerator } = require('./email');
const AUTH_EMAIL = process.env.EMAIL_ADDRESS;
const app = express();
const PORT = process.env.PORT;

app.use(json());

const routes = require('./routes/flightRoute');
app.use('/api', routes);

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // type: 'OAuth2',
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
    clientId: GOOGLE_CLIENTID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    refreshToken: GOOGLE_REFRESH_TOKEN,
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
