const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require("../config/confg.json");

const usersSchema = new mongoose.Schema({

    "first_name": { type: String, text: true },
    "last_name": { type: String },
    "email": { type: String },
    "password": { type: String },
    // "usertype": { type: String },
    "salt": { type: String },
    "hash": { type: String },
    "status": { type: String, enum : ['Y','N'], default:'Y'}, 
    "user_type": { type: String, enum : ['user','admin'], default: 'user' },
    "date":{type:Date,default: Date.now}

})

usersSchema.methods.setPassword = function(password) {

    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 50, 32, 'sha512').toString('hex')
}

usersSchema.methods.validatePassword = function(password) {

    var hash = crypto.pbkdf2Sync(password, this.salt, 50, 32, 'sha512').toString('hex')
    return hash === this.hash

}

usersSchema.methods.generateJWT = function () {
    return jwt.sign({ _id: this._id }, config.secretkey);
  };

module.exports = mongoose.model('users', usersSchema)
