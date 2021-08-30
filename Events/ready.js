const ayarlar = require('../ayarlar.json');
const moment = require("moment")
const Database = require('../Models/ExecutorModel.js')

module.exports = async() => {
        console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Bruh Aktif, Komutlar ve Eventler Yüklendi!`);
        client.user.setPresence({ activity: { name: ayarlar.botSettings.botfooter, type: "PLAYING" }, status: "online" })
            .catch(console.error);
client.channels.cache.get(ayarlar.botSettings.botses).join()



    },


    module.exports.reqEv = {
        event: "ready",
        isim: "Presence Ayari"
    };
