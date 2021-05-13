// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv/config')
const artistRouter = require('./routes/artists');
const recordRouter = require('./routes/records');

// FIREBASE
var admin = require("firebase-admin");

var serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;

admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });

// Initialize the default app
var admin = require('firebase-admin');
var app = admin.initializeApp();

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use('/artists', artistRouter);
app.use('/', recordRouter);

// app.get('/', (req, res) => {
//     res.send("This is the first route");
// })

// CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB!")
)

// LISTEN TO SERVER
app.listen(3000);