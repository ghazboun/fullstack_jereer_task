const mongoose = require('mongoose');

const config = require('config');

const db = config.get('mongoURI');

//Connecting to DB
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log('Mongo DB Connected');
  } catch (err) {
    console.log(err);
    //Exit porccess with failure
    process.exit(1);
  }
};

module.exports = connectDB;
