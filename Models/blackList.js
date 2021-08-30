const { Activity } = require('discord.js');
const mongoose = require('mongoose');

const penal = mongoose.Schema({
blackList: {type: Boolean, default: false},
victimID: String,
dateNow: Number
});

module.exports = mongoose.model("shinoaBlackList", penal);