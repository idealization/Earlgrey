const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mintedSchema = mongoose.Schema(
{
    createdUser: {
        type: Schema.Types.ObjectID,
        ref: 'User',
    },
    createdAt: {
        type: String,
    },
    mintedUser: {
        type: Schema.Types.ObjectID,
        ref: 'User',
    },
    mintedAt: {
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
