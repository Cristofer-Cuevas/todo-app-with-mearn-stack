const mongoose = require('mongoose');

const main = async (callback) => {
  try {
    const URI = process.env.MONGO_URI;
    const connection = () => {
      mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    };

    await callback(connection());
  } catch (e) {
    console.log(e);
    throw new Error('Unable to Connect to Database');
  }
};

module.exports = main;
