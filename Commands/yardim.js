const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator, permEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {

    let filtered = client.commands.filter(x => x.commandSettings.name !== "tag" || x.commandSettings.name !== "link")
    let map = filtered.map((value, index) => `\`.${value.commandSettings.name}\``)
embedCreator("dsa",`

${map.join("\n")}

`,message,[true, 60000])
};

exports.commandSettings = {
    name: "komutlar",
    aliases: ["yardım"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "yardım"
}