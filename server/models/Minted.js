const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mintedSchema = mongoose.Schema(
{
    userFrom: {
        type: Schema.Types.ObjectID,
        ref: 'User',
    },
    createdAt: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
});

const Minted = mongoose.model('Minted', mintedSchema);
module.exports = { Minted };
