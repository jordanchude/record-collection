const mongoose = require('mongoose');
const ArtistSchema = require('./Artist');

const RecordSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    link: {
        type: String,
        unique: true,
        required: true
    },
    artists: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Artists',
           required: true
        }
    ]
});

// artistModel = mongoose.model('Artist', ArtistSchema);
recordModel = mongoose.model('Record', RecordSchema);

module.exports = recordModel;