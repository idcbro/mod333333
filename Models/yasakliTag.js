const { Activity } = require('discord.js');
const mongoose = require('mongoose');

const penal = mongoose.Schema({
guildID: String,
yasakliTaglar: Array,
System: {Type: Boolean, default : false},
YasakliTagRol: String,
});

module.exports = mongoose.model("yasakliTag", penal);