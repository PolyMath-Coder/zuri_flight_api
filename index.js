const express = require('express');
require('dotenv').config();
const { json } = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const AUTH_PASSWORD = process.env.PASSWORD;
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
    // clientId:
    //   '360180968985-j0osbkndjam9h2fbmr8oltoajeqa75ce.apps.googleusercontent.com',
    // clientSecret: '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',
    // refreshToken:
    //   '1//04HwcAdszT-cKCgYIARAAGAQSNwF-L9IrGK8_gY6N2AcPTwxTTotYVwmwJXHxTOplRaqa8Ln8kB8kRA6iwMy6azIVEssgzuPD5tU',
  },
});

const Mailgen = require('mailgen');
var mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    // Appears in header & footer of e-mails
    name: 'The Zuri Nodemailer Team',
    link: 'https://mailgen.js/',
    // Optional product logo
    // logo: 'https://mailgen.js/img/logo.png'
  },
});

const email = {
  body: {
    greeting: `Heyy There`,
    intro: [
      `Thanks for your interest in joining the Zuri X HNG Internship .`,
      `We regret to inform you that admission into this year's cohort is closed.`,
    ],

    action: {
      instructions: `Kindly fill out the forms for the waitlist towards 2023`,
      button: {
        color: '', // Optional action button color
        text: '',
        link: '',
      },
    },
    outro: "Kindly ignore if this wasn't you, Thanks in anticipation",
  },
};

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
    console.log('Email sent successfully');
  }
});

// transporter.sendMail(mailOptions, function(err, data) {
//   if (err) {
//     console.log('Error ' + err);
//   } else {
//     console.log('Email sent successfully');
//   }
// });

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
