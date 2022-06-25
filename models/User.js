const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username: {
        type: String
    },
    password: {
        type: String
    },
    fullname: {
        type: String
    },
    residentId: {
        type: String
    },
    phone: {
        type: String
    },
    maritalStatus: {
        type: String
    },
    gender: {
        type: String
    },
    apartmentType: {
        type: String
    },
    apartmentInfo: {
        type: String
    },
    dateOfBirth: Date,
    houseAddress: {
        type: String
    },
    zone: {
        type: String
    },
    
});

// username
// password
// fullname
// residentId
// phone
// maritalStatus
// gender
// apartmentType
// apartmentInfo
// dateOfBirth
// houseAddress
// zone

const User = mongoose.model('User', UserSchema);

module.exports = User;