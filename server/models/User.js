const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nickname: {
        type: String,
        trim: true,
        unique: 1,
        maxlength: 7,
    },
    firebaseId: {
        type: String,
    },
    role: {
        type: Number,
        default: 0,
    },
}, {
    versionKey: false 
});

const User = mongoose.model('User', userSchema);
module.exports = { User };
