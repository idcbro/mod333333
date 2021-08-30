
//Module Init
const { MessageEmbed, MessageAttachment, Client, Collection } = require('discord.js');
const fs = require('fs');
const ms = require('ms');
const moment = require('moment');
//Ayar Init
const settings = require('./ayarlar.json');
const mongoose = require('mongoose')
const logs = require('discord-logs');
const { Console } = require("console");
const client = new Client({ fetchAllMembers: true }); // Bütün Üyeleri Çekmesi İçin Members Intenti açmayı unutmayın.
global.client = client;
logs(client)
client.Snipe = new Set()
//Command Handler
client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("./Commands/", (err, Ozzy) => {
    if (err) return console.error(err);
    Ozzy = Ozzy.filter(shinoa => shinoa.endsWith('.js'));
    if (Ozzy.length == 0) return;
    console.log(`----------------${Ozzy.length} Komut Yüklemeye Geçiliyor ----------------`)
    Ozzy.forEach(shinoa => {
        let page = require(`./Commands/${shinoa}`);
        if (!page.commandSettings) return console.log(`Bir komutun commandSettings'i doğru ayarlanmadığı için yüklenemedi.`);
        client.commands.set(page.commandSettings.name, page);
        console.log(`====>  [COMMAND] ${page.commandSettings.name} isimli komut yüklendi.`);
        if (page.commandSettings.aliases.length > 0) {
            page.commandSettings.aliases.forEach(prx => {
                client.aliases.set(prx, page.commandSettings.name);
            });
        };
    });
});
//Event Handler
fs.readdir("./Events/", (err, Shinoa) => {
    if (err) return console.error(err);
    Shinoa = Shinoa.filter(ozzy => ozzy.endsWith(".js"));
    if (Shinoa.length == 0) return;
    console.log(`-----------------${Shinoa.length} Eventlere Yüklemeye Geçiliyor ----------------`)

    Shinoa.forEach(ozzy => {
        let page = require(`./Events/${ozzy}`);
        if (!page.reqEv) return console.log(`Bir event'in reqEv kısmı doğru bir şekilde ayarlanmadığı için yüklenemedi.`);
        if (page.reqEv.isim) console.log(`====> [EVENT] ${page.reqEv.isim} isimli event yüklendi.`);
        client.on(page.reqEv.event, page);
    });
});

require("./Helper/mongooseConnect.js")(mongoose,settings)


  client.favoriRenkler = new Array("#2f3136");

  Date.prototype.toTurkishFormatDate = function (format) {
    let date = this,
      day = date.getDate(),
      weekDay = date.getDay(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
  
    let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
    let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");
  
    if (!format) {
      format = "dd MM yyyy | hh:ii:ss";
    };
    format = format.replace("mm", month.toString().padStart(2, "0"));
    format = format.replace("MM", monthNames[month]);
    
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    };
    
    format = format.replace("dd", day.toString().padStart(2, "0"));
    format = format.replace("DD", dayNames[weekDay]);
  
    if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("hh") > -1) {
      if (hours > 12) hours -= 12;
      if (hours === 0) hours = 12;
      format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
    };
    if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
    if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
    return format;
  };






Array.prototype.chunk = function(chunk_size) {
  let myArray = Array.from(this);
  let tempArray = [];
  for (let index = 0; index < myArray.length; index += chunk_size) {
    let chunk = myArray.slice(index, index + chunk_size);
    tempArray.push(chunk);
  };
  return tempArray;
};



client.toDate = date => {
  return moment(date).format("DD/MM/YYYY HH:mm:ss");
};

client.on("messageDelete", function(message){
  if(message.author.bot) return
  const kanal = client.channels.cache.get(settings.guildLogs.messagelog)
if(message.attachments.first()) {
  const emb2 = new MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  .setDescription(`<#${message.channel.id}> kanalında ${message.author} tarafından bir mesaj silindi\n Silinen Fotoğraf`)
  .setThumbnail(message.author.avatarURL({dynamic: true}))
.setImage(message.attachments.first().proxyURL)
kanal.send(emb2)

} else {
  const emb = new MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
  .setThumbnail(message.author.avatarURL({dynamic: true}))
  .addField("`Silinen Mesaj:`,",`**${message.content}**`,true)
  .addField("`Mesajın Sahibi:`",`${message.author}`,true)
  .addField("`Mesajın Kanalı:`",`${message.channel}`,true)
  .addField("`Tarih`", client.toDate(new Date()),true)
  .setFooter("Silindiği saat")
  .setTimestamp()

  kanal.send(emb)
}
});
client.on("messageUpdate",async function(oldMessage, newMessage) {
  if(oldMessage.author.bot) return

  const kanal = client.channels.cache.get(settings.guildLogs.messagelog)
if(oldMessage.content == newMessage.content) return
  const emb = new MessageEmbed()
  .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL({dynamic: true}))
  .setThumbnail(oldMessage.author.avatarURL({dynamic: true}))
  .setTimestamp()
.addField("`Eski Mesaj`",`**${oldMessage.content}**`,true)
.addField("`Yeni Mesaj`",`**${newMessage.content}**`,true)
.addField("`Mesajın Sahibi`",`${oldMessage.author}`,true)
.addField("`Tarih`",client.toDate(new Date()),true)
.setTitle("[Mesaj Düzenlendi]")
kanal.send(emb)

})
  
client.format = sure => {
  return moment.duration(sure).format("D [gün,] H [saat,] m [dakika,] s [saniye.]");
};

client.moment = sure => {
  return moment(sure).format("HH:mm:ss");
};



client.login(settings.botSettings.botToken).then(x => console.log(`Bot başarıyla giriş yaptı!`)).catch(err => console.log(`Bot giriş hatası! Yanlış token olabilir: ${err}`));

const rollogg = require('./Models/rolLogModel.js');
const { embedCreator } = require('./functions');
client.on("guildMemberRoleAdd", async (member, role) => {
  try {
      moment.locale("TR")
      if(member.user.bot) return;
      let time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")

      const entry = await member.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first())
      if(entry.executor.bot) return;
      
 new rollogg({Rol: role.id,ExecID: entry.executor.id, emoji: client.evet,Date: Date.now(),victimID: member.id}).save()
      } catch(err) {
      {}
      }
})




  client.evet = (settings.emojiler.onay)
  client.red = (settings.emojiler.red)

