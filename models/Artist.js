const mongoose = require('mongoose');

const ArtistSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        unique: true,
        required: true
    },
    records: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Records'
        }
    ]
})