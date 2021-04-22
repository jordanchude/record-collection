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
        res.status(500).json({message: err.message});
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
        res.status(500).json({message: err.message});
    }
});

// DELETE ARTIST
// ADD A WAY TO DELETE ARTIST FROM RECORD OBJECTS
router.delete('/:artistId', async (req, res) => {
    try {
        const deletedArtist = await Artist.deleteOne({_id: req.params.artistId});
        res.status(200).json(deletedArtist);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// REPLACE ARTIST
// UPDATE RECORD OBJECT IF CHANGED
router.put('/:artistId', async (req, res) => {
    try {
        const replacedArtist = await Artist.findByIdAndUpdate(req.params.artistId, req.body, {new: true});
        res.status(200).json(replacedArtist);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;