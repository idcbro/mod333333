const { Discord, MessageEmbed } = require('discord.js');
const Database = require('../Models/ExecutorModel.js');
const Blacklist = require('../Models/blackList.js');

const ayarlar = require('../ayarlar.json')
const moment = require('moment');
const Schema = require('../Models/yasakliTag.js')
const { setRoles } = require('../functions.js');



module.exports = async(member) => {


 


let pdxemb = new MessageEmbed()
.setFooter(`Aramıza hoş geldin ${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
.setAuthor(member.guild.name, member.guild.iconURL({ dynamic: true }))
const suspLog = client.channels.cache.get(ayarlar.guildLogs.susLogs)
const otoRolLog = client.channels.cache.get(ayarlar.guildLogs.otoRoleLogs)

let suphelilik = true;
if ((Date.now() - member.user.createdAt) > (1000 * 60 * 60 * 24 * 7)) suphelilik = false; // 7 Gün! Değiştirebilirsniz
let guildSize = member.guild.members.cache.size;

if(suphelilik) {
member.roles.add(ayarlar.guildRoles.sus)

} else {
    member.roles.add(ayarlar.guildRoles.unregister)

}

setTimeout(async() => {
    let welcome = client.channels.cache.get(ayarlar.guildLogs.welcome)
    let dort = "";
    if (!suphelilik) dort = ayarlar.emojiler.onay;
    else dort = ayarlar.emojiler.red;
    let emoji = "●" //İsterseniz bir emojiyle değişin
    welcome.send(`:tada: ${member.guild.name}'e hoş geldin ${member} !\n\nHesabın ${moment(member.user.createdAt).format("lll")} tarihinde oluşturulmuş. <a:ardaonay:${dort}>\n\nSunucu kurallarımız <#${ayarlar.guildLogs.ruleschannel}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.\n\nSeninle beraber ${member.guild.members.cache.size} kişi olduk! Sol tarafta bulunan **V.Confirmation** odalarından birine girerek kayıt işlemini gerçekleştirebilirsin. İyi eğlenceler:tada::tada::tada:`)
member.setNickname(`${ayarlar.guildSettings.tag} İsminizi Belirtiniz`)
if(member.user.username.includes(ayarlar.guildSettings.tag)) member.roles.add(ayarlar.reg.familyRole)
}, 1000)

}


module.exports.reqEv = {
    event: "guildMemberAdd",
    isim: "Ceza kontrol ve hosgeldin"
};