const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect');

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => console.log('server running on port 5000'))
  } catch (err) {
    console.log(err);
  }
}

start();
