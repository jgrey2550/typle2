const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
}, {
    timestamps: true,
});
//user model eporting as a model

const User = mongoose.model('User', userSchema);

module.exports = User;