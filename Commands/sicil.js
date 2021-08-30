const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const mongoose = require('mongoose')
const ms = require('ms')
const moment = require('moment')
const Database = require('../Models/ExecutorModel.js')
const { rolVer, renk,embedCreator, trueEmbed, permEmbed, cezaEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {
    let sunucu = client.guilds.cache.get(ayarlar.guildSettings.guildID);
if(!message.member.hasPermission("MANAGE_ROLES")) return permEmbed()

if(!victim) return trueEmbed(message,this.commandSettings.description)



Database.find({victimID: victim.id}, async (err, res) => {
    if (res.length <= 0) return   embedCreator("dsa","Bu Kişinin herhangi bir sicil geçmişine rastlanmadı",message,[true, 5000])
    let listed = res.reverse();
  let currentPage = 1;
  const pageLimit = 10;
  let History = listed.map((x, index) => `\n \`${index + 1}.\` **[${x.Type}]** <@${x.execID}> (\`${x.execID}\`) tarafından **${x.Reason}** sebebiyle cezalandırıldı  \`ceza ID: (#${x.cezaID})\``);
  const pages = History.chunk(pageLimit);
  if (message.content.includes("shinoanınallahıkimdiyesormakistermisinshinoanınallahıkimdiyesormakistermisinsadadsadsadsadsadsadasshinoanınallahıkimdiyesormakistermisinsadadsadsadsadsadsadas")) {
    let Sure = ms((message.content.slice(message.content.indexOf("shinoanınallahıkimdiyesormakistermisinsadadsadsadsadsadsadasshinoanınallahıkimdiyesormakistermisinsadadsadsadsadsadsadasshinoanınallahıkimdiyesormakistermisinsadadsadsadsadsadsadasshinoanınallahıkimdiyesormakistermisinsadadsadsadsadsadsadas") + 5)));
    if (!Sure || !ms(Sure)) return client.message(client.embed(`**Geçerli bir zaman dilimi girmelisin.**`, message), message.channel.id, 5000);
    message.channel.send({embed:{title: `**Sayfa: ${currentPage}/${pages.length}**`,description:`${History.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("\n")}`,thumbnail: {url: message.author.avatarURL({dynamic:true})}, author: {name: message.guild.name, icon_url: message.guild.iconURL({dynamic:true})}, color:client.favoriRenkler[Math.floor(Math.random()*client.favoriRenkler.length)]}}).then(xd => {
      setInterval(() => {
        if (currentPage >= pages.length) return clearInterval(this);
        currentPage = currentPage + 1;
        xd.edit({embed:{title: `**Sayfa: ${currentPage}/${pages.length}**`,description:`${History.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("\n")}`,thumbnail: {url: message.author.avatarURL({dynamic:true})}, author: {name: message.guild.name, icon_url: message.guild.iconURL({dynamic:true})}, color:client.favoriRenkler[Math.floor(Math.random()*client.favoriRenkler.length)]}});
      }, Sure);
    });
  } else {
    message.channel.send({embed:{title: `**Sayfa: ${currentPage}/${pages.length}**`,description:`${History.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("\n")}`,thumbnail: {url: message.author.avatarURL({dynamic:true})}, author: {name: message.guild.name, icon_url: message.guild.iconURL({dynamic:true})}, color:client.favoriRenkler[Math.floor(Math.random()*client.favoriRenkler.length)]}}).then(async xd => {
      if (listed.length > pageLimit) {
        await xd.react("◀");
        await xd.react("❌");
        await xd.react("▶");
        let collector = xd.createReactionCollector((react, user) => ["◀","▶", "❌"].some(e => e == react.emoji.name) && user.id == author.id, { time: 200000 });
        collector.on("collect", async reaction => {
          if (reaction.emoji.name === "◀") {
            if (currentPage === 1) return;
            await reaction.users.remove(author.id).catch(err => { });
            currentPage--;
            xd.edit({embed:{title: `**Sayfa: ${currentPage}/${pages.length}**`,description:`${History.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("\n")}`,thumbnail: {url: message.author.avatarURL({dynamic:true})}, author: {name: message.guild.name, icon_url: message.guild.iconURL({dynamic:true})}, color:client.favoriRenkler[Math.floor(Math.random()*client.favoriRenkler.length)]}});
          } else if (reaction.emoji.name === "▶") {
            if (currentPage === pages.length) return;
            await reaction.users.remove(author.id).catch(err => { });
            currentPage++;
            xd.edit({embed:{title: `**Sayfa: ${currentPage}/${pages.length}**`,description:`${History.slice(currentPage === 1 ? 0 : Number((currentPage * pageLimit) - pageLimit), Number(currentPage * pageLimit)).join("\n")}`,thumbnail: {url: message.author.avatarURL({dynamic:true})}, author: {name: message.guild.name, icon_url: message.guild.iconURL({dynamic:true})}, color:client.favoriRenkler[Math.floor(Math.random()*client.favoriRenkler.length)]}});
          } else if (reaction.emoji.name === "❌") {
            xd.delete();
            collector.stop();
          };
        });
      };
    });
  };
});










};

exports.commandSettings = {
    name: "sicil",
    aliases: [],
    guildOnly: true, 
    coolDown: 3000, 
    description: "sicil Λrda/852956127728762890"
}