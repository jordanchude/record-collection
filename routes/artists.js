// DEPENDENCIES
const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const Record = require('../models/Record');

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
router.delete('/:artistId', async (req, res) => {
    try {
        // DELETE ARTIST
        const deletedArtist = await Artist.deleteOne({_id: req.params.artistId});

        // REMOVE ARTIST FROM RECORDS
        await Record.updateMany(
            {}, 
            {$pull: {artists: {$in: [req.params.artistId]}}},
            {multi: true});

        // REMOVE RECORDS WITH NO ARTIST    
        await Record.deleteMany({artists: {$exists: true, $size: 0}});

        res.status(200).json(deletedArtist);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// UPDATE ARTIST
// UPDATE RECORD OBJECT IF CHANGED
router.put('/:artistId', async (req, res) => {
    try {
        // UPDATE ARTIST
        const replacedArtist = await Artist.findByIdAndUpdate(req.params.artistId, req.body, {new: true});

        const records = replacedArtist.records;
        console.log(records)

        // UPDATE RECORDS WITH ARTIST
        for (element of records) {
            const record = await Record.findById(element);

            if (!record.artists.includes(req.params.recordId)) {
                await Record.updateOne({_id: element}, {$push: {artists: req.params.artistId}})
            }
        }

        // REMOVE ARTIST FROM RECORD NOT IN ARTISTS
        await Record.updateMany(
            {_id: {$nin: records}}, 
            {$pull: {artists: {$in: [req.params.artistId]}}},
            {multi: true}
        );
        
        res.status(200).json(replacedArtist);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;