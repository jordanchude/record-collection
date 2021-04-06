// DEPENDENCIES
const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');

// GET ARTISTS
router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).json(artists);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
});

// SUBMIT ARTIST
router.post('/', async (req, res) => {
    const artist = new Artist({
        name: req.body.name,
        birthday: req.body.birthday,
        image: req.body.image
    });
    try {
        const savedArtist = await artist.save();
        res.status(200).json(artist);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
})

module.exports = router;