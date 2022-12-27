const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true 
    },
    email: {
        type: String,
        require: true,
        unique: true 
    },
    password: {},
    identity: {
        type: String,
        unique: true 
    },
    phone: {
        type: String,
        unique: true 
    }
})

module.exports = mongoose.model('User', userSchema)