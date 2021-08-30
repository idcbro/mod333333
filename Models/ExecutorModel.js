const { Activity } = require('discord.js');
const mongoose = require('mongoose');

const penal = mongoose.Schema({
guildID: String,
execID: String,
cezaID: Number,
victimID: String,
dateNow: {type: Number, default: Date.now()},
activity: {type: Boolean, default: true},
Temporary: {type: Boolean, default: false},
Reason: String,
Type: String,
finishDate: Number
});

module.exports = mongoose.model("shinoaPenal", penal);