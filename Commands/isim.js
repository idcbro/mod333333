const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/regModel.js')
const { rolVer, renk,embedCreator, permEmbed, trueEmbed, rolAl,positionEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
    if(!message.member.roles.cache.has(ayarlar.reg.regHammer) && !message.member.hasPermission("ADMINISTRATOR")) return permEmbed(message)
    const isim = args.slice(1).filter(x => isNaN(x)).map(arg => arg.charAt(0).toUpperCase() + arg.slice(arg.charAt(0).length).toLowerCase()).join(" ");
    const yas = args.slice(2).filter(x => !isNaN(x))[0];
    const tag = victim.user.username.includes(ayarlar.guildSettings.tag) ? ayarlar.guildSettings.tag : ("⦁" === "" ?  ayarlar.guildSettings.tag : "⦁");
    if (message.member.roles.highest.position <= victim.roles.highest.position) return positionEmbed(message)
    if(victim.user.bot) return botEmbed(message)

    if(!victim || !isim || !yas) return trueEmbed(message, this.commandSettings.description)

if(yas < 13) return embedCreator("dsa","Bir kişinin ismini 13den küçük yapamazsın",message,[true, 10000])
    victim.setNickname(`${tag} ${isim} | ${yas}`)
    let isiml = `${tag} ${isim} | ${yas}`

    Database.findOne({guildID: message.guild.id, victimID: victim.id}, (err, res) => {
        if(!res) {
        new Database({guildID: message.guild.id, victimID: victim.id, nicknames: [{isimler: `${isiml}`,rol: `İsim Değiştirme`}]}).save()
        } else {
            res.nicknames.push({isimler: `${isiml}  `,rol : `İsim Değiştirme`})
        res.save()
        }
        
        })
message.react(ayarlar.emojiler.onay)
embedCreator("dsa",`${victim} kişisinin ismi Başarıyla \`${isiml}\` olarak değiştirildi `,message,[true, 15000])

};

exports.commandSettings = {
    name: "isim",
    aliases: ["i"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "erkek @Λrda/852956127728762890 [İsim] [Yaş]"
}