const mongoose = require('mongoose');

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

module.exports = mongoose.model('Record', RecordSchema);