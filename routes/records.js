// DEPENDENCIES
const express = require('express');
const Artist = require('../models/Artist');
const router = express.Router();
const Record = require('../models/Record');

// GET ARTIST RECORDS
router.get('/:artistId/records', async (req, res) => {
    try {
        const records = await Record.find({artists: req.params.artistId});
        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

// SUBMIT RECORD
router.post('/records', async (req, res) => {
    let record = new Record({
        name: req.body.name,
        releaseDate: req.body.releaseDate,
        link: req.body.link,
        artists: req.body.artists
    });
    try {
        const savedRecord = await record.save();

        // FOR OF IN SEQUENCE
        //  for (element of record.artists) {
        //     await Artist.updateOne({_id: element}, {$push: {records: record}});
        //  }

        // PARALLEL SEQUENCE WITH PROMISE.ALL
         const artist = record.artists.map(element => Artist.updateOne({_id: element}, {$push: {records: record}}));

         await Promise.all(artist);

        res.status(200).json(savedRecord);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;