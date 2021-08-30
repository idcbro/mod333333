const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator, permEmbed, trueEmbed, rolAl } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
    if(!message.member.roles.cache.has(ayarlar.reg.regHammer) && !message.member.hasPermission("ADMINISTRATOR")) return permEmbed(message)
    const isim = args.slice(1).filter(x => isNaN(x)).map(arg => arg.charAt(0).toUpperCase() + arg.slice(arg.charAt(0).length).toLowerCase()).join(" ");
    const yas = args.slice(2).filter(x => !isNaN(x))[0];
    if(!victim || !isim || !yas) return trueEmbed(message, this.commandSettings.description)

    if (message.member.roles.highest.position <= victim.roles.highest.position) return positionEmbed(message)
    if(victim.user.bot) return botEmbed(message)

    const tag = victim.user.username.includes(ayarlar.guildSettings.tag) ? ayarlar.guildSettings.tag : ("⦁" === "" ?  ayarlar.guildSettings.tag : "⦁");

    if(yas < 13) return embedCreator("dsa","13 Yaşından küçük bir kişiyi kayıt edemezsin!",message,[true, 10000])

    victim.setNickname(`• ${isim} | ${yas}`)
    let isiml = `• ${isim} | ${yas}`
rolVer(victim.id, ayarlar.reg.kariRoles)
rolAl(victim.id,ayarlar.guildRoles.unregister)
    Database.findOne({guildID: message.guild.id, victimID: victim.id}, (err, res) => {
        if(!res) {
        new Database({guildID: message.guild.id, victimID: victim.id, nicknames: [{isimler: `${isiml}`, rol: `<@&${ayarlar.reg.kariRoles[0]}>`}]}).save()
        } else {
            res.nicknames.push({isimler: `${isiml}`,rol: `<@&${ayarlar.reg.kariRoles[0]}>`})
        res.save()
        }
        
        })
        await Database.findOneAndUpdate({ guildID: message.guild.id, execID: author.id }, { $inc: { erkek: 0, kari: 1 } }, { upsert: true });

message.react(ayarlar.emojiler.onay)
embedCreator("dsa",`${victim} kişisi  başarıyla <@&${ayarlar.reg.kariRoles[0]}> rolleri ile kayıt edildi. `,message,[true, 15000])

};

exports.commandSettings = {
    name: "bayan",
    aliases: ["k","kadın"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "bayan @Λrda/852956127728762890 [İsim] [Yaş]"
}