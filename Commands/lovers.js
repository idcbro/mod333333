const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator, permEmbed, trueEmbed } = require('../functions');
const member = require('../Models/member');
exports.run = async(client, message, args,author, victim) => {
if(!author.roles.cache.has(ayarlar.reg.regHammer) && !author.hasPermission("ADMINISTRATOR")) return permEmbed(message)
    if (!victim) return trueEmbed(message,this.commandSettings.description)
const rol = message.guild.roles.cache.get(ayarlar.ekstraRoles.lovers)

if(!victim.roles.cache.has(rol.id)) {
    victim.roles.add(rol)
    embedCreator("DSA",`${victim} kişisine ${rol} adlı rol başarıyla verildi`,message,[true, 10000])
} else {
    victim.roles.remove(rol)
    embedCreator("DSA",`${victim} kişisinden ${rol} adlı rol başarıyla alındı`,message,[true, 10000])

}
};

exports.commandSettings = { 
    name: "lovers",
    aliases: [],
    guildOnly: true, 
    coolDown: 3000, 
    description: "lovers @Λrda/852956127728762890"
}