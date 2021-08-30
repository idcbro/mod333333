const { Activity } = require('discord.js');
const mongoose = require('mongoose');

const penal = mongoose.Schema({
Afk: {type: Boolean, default: false},
Reason: String,
datenow: {type: Number, default: Date.now()},
memberID: String,
uyarilar: Array
});

module.exports = mongoose.model("shinoaAfk", penal);