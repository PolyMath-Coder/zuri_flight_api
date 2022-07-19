const mongoose = require('mongoose');
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

module.exports = { connect };
