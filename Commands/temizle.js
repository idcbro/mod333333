const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator, permEmbed, trueEmbed } = require('../functions');
const member = require('../Models/member');
exports.run = async(client, message, args,author, victim) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return permEmbed(message)

    let miktar = Number(args[0]);
    if (!miktar) return trueEmbed(message,this.commandSettings.description  )
    if(miktar > 100) return message.react(ayarlar.emojiler.red)
message.channel.bulkDelete(miktar).catch()
    message.react(ayarlar.emojiler.onay);
embedCreator("dsa",`${client.evet} Başarıyla ${miktar} kadar mesaj temizlendi`,message,[true, 5000])

};

exports.commandSettings = {
    name: "temizle",
    aliases: ["sil"],
    guildOnly: true, 
    coolDown: 1000, 
    description: "temizle [Temizlenecek Sayı]"
}