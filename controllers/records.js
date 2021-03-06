// DEPENDENCIES
const express = require('express');
// const { isValidObjectId } = require('mongoose');
const { findByIdAndUpdate } = require('../models/Artist');
const Artist = require('../models/Artist');
const router = express.Router();
const Record = require('../models/Record');

// GET ALL RECORDS
router.get('/records', async (req, res) => {
    try {
        const allRecords = await Record.find();
        res.status(200).json(allRecords);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

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
        // CREATE ARRAY OF EXISTING ARTISTS
        const existingArtists = new Array (await Artist.findById(record.artists));
        
        // COMPARE LENGTH OF ARTISTS IN OBJECT TO EXISTING ARTISTS IN OBJECT
        if (record.artists.length === existingArtists.length) {
            
            const savedRecord = await record.save();

            // FOR OF IN SEQUENCE
            //  for (element of record.artists) {
            //     await Artist.updateOne({_id: element}, {$push: {records: record}});
            //  }

            // PARALLEL SEQUENCE WITH PROMISE.ALL
            const artist = record.artists.map(element => Artist.updateOne({_id: element}, {$push: {records: record}}));
            await Promise.all(artist);

             // SEND STATUS AND SAVE JSON
            res.status(200).json(savedRecord);
        } else {
            throw new Error("Artist record does not exist");
        }

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

        // DELETE ALL RECORDS (FOR TESTING)
        // const deletedRecord = await Record.deleteMany();

        // DELETE ALL RECORDS FROM ARTISTS (FOR TESTING)
        // await Artist.updateMany(
        //     {},
        //     {$set: {records: []}},
        //     {multi: true});
        

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

        const artists = updatedRecord.artists;
        
        // UPDATE ARTISTS ON RECORD
        for (element of artists) {
            const artist = await Artist.findById(element);

            if (!artist.records.includes(req.params.recordId)) {
                await Artist.updateOne({_id: element}, {$push: {records: req.params.recordId}})
            }
        }

        // REMOVE RECORD FROM ARTISTS NOT ON RECORD
        await Artist.updateMany(
            {_id: {$nin: artists}}, 
            {$pull: {records: {$in: [req.params.recordId]}}},
            {multi: true}
        );

        res.status(200).json(updatedRecord);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;