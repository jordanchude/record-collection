// DEPENDENCIES
const express = require('express');
const { findByIdAndUpdate } = require('../models/Artist');
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
});

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

// DELETE RECORDS
router.delete('/records/:recordId', async (req, res) => {
    try {
        // DELETE RECORD
        const deletedRecord = await Record.deleteOne({_id: req.params.recordId});
        
        // UPDATE ARTIST
        await Artist.updateMany(
            {}, 
            {$pull: {records: {$in: [req.params.recordId]}}},
            {multi: true});

        res.status(200).json(deletedRecord);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// UPDATE RECORD
router.put('/:recordId', async (req, res) => {
    try {
        // UPDATE RECORD
        const updatedRecord = await Record.findByIdAndUpdate(req.params.recordId, req.body, {new: true});
        
        // UPDATE ARTIST
        // check to see if artists in the array have the updated record
        // add record, if it doesn't
        // remove the record from all other artists

        const artists = updatedRecord.artists;

        // check to see if id is already added
        const addedRecord = artists.map(element => 
            console.log(Artist.findById(element))
            // Artist.updateOne({_id: element}, {$push: {records: req.params.recordId}})
            
        );

        //  await Promise.all(artist);
        


        res.status(200).json(updatedRecord);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;