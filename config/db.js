const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.DB_URL;
const dbConnect = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('database connected successfully');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
