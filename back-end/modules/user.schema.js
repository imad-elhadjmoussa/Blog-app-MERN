const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists'],
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'defult-user-1724185200655.png',
        set: function (value) {
            return value === '' ? this.avatar || 'defult-user-1724185200655.png' : value;
        }
    },
});

module.exports = mongoose.model('User', userSchema);