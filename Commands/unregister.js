const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk, embedCreator, trueEmbed,setRoles,positionEmbed,botEmbed, permEmbed,banEmbed,logEmbed, rolAl } = require('../functions');
const member = require('../Models/member');
exports.run = async(client, message, args,author, victim) => {
if(!author.roles.cache.has(ayarlar.reg.regHammer) && !author.hasPermission("ADMINISTRATOR")) return permEmbed(message)
	
    if (!victim) return trueEmbed(message,this.commandSettings.description)
    if (message.member.roles.highest.position <= victim.roles.highest.position) return positionEmbed(message)
if(victim.user.bot) return botEmbed(message)

setRoles(victim.id, ayarlar.guildRoles.unregister)
message.react(ayarlar.emojiler.onay)


};

exports.commandSettings = {
    name: "unregister",
    aliases: ["kayıtsız","unreg"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "unreg @Λrda/852956127728762890"
}