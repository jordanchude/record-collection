// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv/config')
const artistRouter = require('./controllers/artists');
const recordRouter = require('./controllers/records');

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use('/artists', artistRouter);
app.use('/', recordRouter);

// CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB!")
)

// LISTEN TO SERVER
app.listen(3000, () => {console.log("Listening on port 3000!")});