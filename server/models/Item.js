const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = mongoose.Schema(
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
});

const Item = mongoose.model('Item', itemSchema);
module.exports = { Item };
