const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json");
const Schema = require('../Models/yasakliTag.js')

const { rolVer, renk, embedCreator, trueEmbed,setRoles,positionEmbed,botEmbed } = require('../functions');
exports.run = async(client, message, args, author, victim) => {

const type = args[0]

if(!type) return null
if (type == "yardım") {
    embedCreator("dsa",`
    \`${message.guild.name}\` **Sunucusundaki yasaklı tag yardım menüsü**
    
**.yasakli-tag tag-ekle [Tag(lar)]
.yasakli-tag tag-sil [Tag(lar)]
.yasakli-tag rol-ekle [Rol]
.yasakli-tag rol-sil [Rol]
.yasakli-tag görüntüle
.yasakli-tag yardım**
    `,message,[false])
}




if(type == "rol-ekle") {
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
    const rolID = rol.id;

    Schema.findOne({guildID: message.guild.id}, async (err, res) => {
        if (!res) {

          new Schema({guildID: message.guild.id,YasakliTagRol: rolID}).save()
          message.react(ayarlar.emojiler.onay)
          embedCreator("dsa",`<@&${rolID}> isimli rol başarıyla yasaklı-tag rolü olarak ayarlandı`,message,[true, 15000])

          } else {
            res.YasakliTagRol = rolID;
            res.save();
            embedCreator("dsa",`<@&${rolID}> isimli rol başarıyla yasaklı-tag rolü olarak ayarlandı`,message,[true, 15000])


          }

        })




        
} else if(type == "rol-sil") {

    Schema.findOne({guildID: message.guild.id}, async (err, res) => {

        let ytagrol = res.YasakliTagRol;
        if (ytagrol) {
            res.YasakliTagRol = undefined;
            res.save();
            embedCreator("dsa",`Yasaklı tag rolü başarıyla sıfırlandı`,message,[true, 15000])

        } else {
            embedCreator("dsa",`Yasakli tag rolü olmadığı için işlemi gerçekleştiremiyorum!`,message,[true, 15000])

        }



    })


} else if(type == "tag-ekle") {
    let taglar = args.slice(1).join("").split("");
    Schema.findOne({guildID: message.guild.id}, async (err, res) => {
if(!res) {
    new Schema({guildID: message.guild.id, yasakliTaglar: taglar.map((tag, index) => tag) }).save();
} else {
    let ytag = res.yasakliTaglar;
    taglar.filter(x => !ytag.includes(x)).map(tag => ytag.push(tag));
    res.save();
    embedCreator("dsa",`**Başarıyla** \`\`[${taglar.join(" , ")}]\`\` **tag(lar)ı yasaklı taga atıldı.**\n\n__**Şuan Yasaklıda Olan Taglar: **__(\`${taglar.join(", ")}\`)`,message,[true, 15000])

}
    })
} else if(type == "tag-sil") {
    var bulunamayanTaglar = [];
    let taglar = args.slice(1).join("").split("");
    Schema.findOne({guildID : message.guild.id}, async (err, res) => {
        let tagsil = res.yasakliTaglar;

        if (tagsil.length < 1) {
            embedCreator("dsa",`Bu Sunucuda yasaklı tag bulunmuyor`,message,[true, 15000])
        } else {
            taglar.forEach(x => {
                if (!tagsil.includes(x)) bulunamayanTaglar.push(x);
                tagsil.remove(x);
              });
         }

         if (bulunamayanTaglar.length > 0) {
            await bulunamayanTaglar.map((bTag) => taglar = taglar.filter(tag => bTag !== tag));
embedCreator("dsa",`[\`${taglar.join(", ")}\`] **tag(lar)ı yasaklı tagdan kaldırıldı.**\n[\`${bulunamayanTaglar.join(", ")}\`] **tag(lar)ı yasaklı tagda olmadığı için kaldırılamadı.**`,message,[true, 15000])

         } else {
             embedCreator("dsa",`[\`${taglar.join(", ")}\`] **tag(lar)ı yasaklı tagdan kaldırıldı.** `,message,[true, 15000])

         }
         res.save();

    })





} else if(type == "görüntüle") {
    Schema.findOne({guildID: message.guild.id}, async (err, res) => {
        if (res) {

            embedCreator("dsa",`
 Şuanda\`${message.guild.name}\` adlı sunucudaki yasaklı tagları görmektesiniz

 \`${res.yasakliTaglar.length == 0 ? "Yok" : res.yasakliTaglar.join("\n")} \`

`,message,[false])
        } else {
            embedCreator("dsa",`Bu sunucuda yasaklı tag bulunmamaktadır! `,message,[true, 15000])

        }

    })

}



 };

exports.commandSettings = {
    name: "yasakli-tag",
    aliases: ["yasakli-tag","ytag"],
    guildOnly: true, 
    coolDown: 3000, 
    description: "yasakli-tag yardım"
}