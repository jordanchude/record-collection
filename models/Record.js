const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: yes
    },
    releaseDate: {
        type: String,
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
           ref: 'Artists'
        }
    ]
})