require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/auth');

app.use(express.json());

app.use('/api/v1/auth', authRouter);

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
