const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const rollog = require('../Models/rolLogModel.js')
const { rolVer, renk, embedCreator, trueEmbed,setRoles,permEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {

    let staff = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!staff) return trueEmbed(message,this.commandSettings.description)
    if( !author.hasPermission("MANAGE_ROLES")) return permEmbed(message)


rollog.find({ExecID: staff.id}, async (err, res) => {
    if(!res) return embedCreator("dsa",`${staff} kişisinin herhangi bir rollog kaydına ulaşamadım!`,message,[true, 10000])
    let listed = res.reverse()
    let mapped = listed.map((value,index) => `${value.emoji} <@&${value.Rol}> \`=>\` <@${value.victimID}> (\`${client.toDate(value.date)}\`) `).slice(0,10)
    embedCreator("dsa",`
    Merhabalar \`${author.displayName}\` şu anda ${staff} kişisinin son 10 rol loguna bakmaktasın!
    
    ${mapped.join("\n")}
    
    `,message,[true, 45000])
})
 };

exports.commandSettings = {
    name: "rollog",
    aliases: ["rol-log"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "rollog @Λrda/852956127728762890"
}