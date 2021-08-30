const ayarlar = require('../ayarlar.json');
const moment = require("moment")
const CoolDown = new Map();

module.exports = message => {
const prefix = [".","!","/"]

    let client = message.client;
if(!prefix.some(x => message.content.startsWith(x))) return
    let komut = message.content.split(" ")[0].slice(1);
    let args = message.content.split(" ").slice(1);

    let cmd;
    if (client.commands.has(komut)) {
        cmd = client.commands.get(komut);
    } else if (client.aliases.has(komut)) {
        cmd = client.commands.get(client.aliases.get(komut));
    } else {
        return;
    }

    let author = message.guild.member(message.author);
    let victim = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

    if (CoolDown.has(message.author.id) && CoolDown.get(message.author.id).komut == cmd.commandSettings.name && CoolDown.get(message.author.id).zaman > Date.now())
        return message.channel.send(`**Bu komut \`${Math.floor((CoolDown.get(message.author.id).zaman - Date.now()) / 1000)}\` saniye daha bekleme sürecinde.**`).then(x => x.delete({ timeout: 3500 }));

    if (message.channel.type == "dm" && cmd.commandSettings.guildOnly) return;



    if (cmd.commandSettings.coolDown != 0) {
        CoolDown.set(message.author.id, {
            komut: cmd.commandSettings.name,
            zaman: Date.now() + cmd.commandSettings.coolDown
        });
    }
    cmd.run(client, message, args, author, victim);
    client.channels.cache.get(ayarlar.guildLogs.commandslog).send(`:zap: \`${message.author.tag}\` kişisi \`${message.channel.name}\` adlı kanalda \`${cmd.commandSettings.name}\` komutunu kullandı \n Komutun İçeriği => \`${message.content}\` `,{ignoreDirect: false})
}


module.exports.reqEv = {
    event: "message",
    isim: "Message Command Handler"
};