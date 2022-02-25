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
    () => {console.log("Connected to DB!"); console.log(c)}
)


// const { MongoClient } = require('mongodb');
// const uri = process.env.DB_CONNECTION;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log("connected to DB")

//   // perform actions on the collection object
//   client.close();
// });


// LISTEN TO SERVER
app.listen(4000, () => {console.log("Listening on port 4000!")});