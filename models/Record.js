const mongoose = require('mongoose');
const isValid = require('mongoose-id-validator');

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

const recordModel = mongoose.model('Record', RecordSchema);

RecordSchema.path('artists').validate(function (value, respond) {

    recordModel.findOne({_id: value}, function (err, doc) {
        if (err || !doc) {
            respond(false);
        } else {
            respond(true);
        }
    });

}, 'Example non existent');

module.exports = recordModel;