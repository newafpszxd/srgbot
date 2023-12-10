const Discord = require('discord.js')
const util = require('util');
const db1 = require('megadb')
const dbase = new db1.crearDB('database')
const db = require("croxydb")
const mysql = require('mysql')
module.exports = {
  name: 'adsoyadil',
    kategori: 'sorgu',
    help: 'nasil kullanildigi',
    description: 'komutun aciklamasi',
  run: async (client, message, args) => {
      let vip1 = new Discord.MessageEmbed() .setColor("#FFEE58") .setDescription(client.config.üyelikyokmesaj)
          let vip = db.fetch(`pre_${message.author.id}`)
        if(!vip) return message.channel.send({embeds: [vip1]})
        var adx = args[0]
        let ad2x = args[1]
        let soyadx = args[2]
        let ilx = args[3]
        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "worex101"
        });
        message.reply({embeds: [new Discord.MessageEmbed().setDescription(`<a:loading:1088240030159487028> \`Sorgunuz yapılıyor, lütfen bekleyiniz.\` \n \n [**Metin2 | discord.gg/albaraka**](https://discord.gg/3AnemM5Y8N)`).setTitle(`Metin2 Checker Bot`, 'https://discord.gg/albaraka').setThumbnail(message.author.displayAvatarURL({dynamic: true})).setColor("#000000").setFooter(`Kullanan: ${message.author.tag}`)]}).then(x => setTimeout(() => { x.delete()}, 10000 )).then(
            con.query(`SELECT * FROM worex101 WHERE ADI="${adx} ${ad2x}" AND SOYADI="${soyadx}" AND NUFUSIL="${ilx}"`, function (err, result) {
              if (err) throw err;
              let data = JSON.parse(JSON.stringify(result))
              if(data.length < 1) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`<:pepesadge:1088530576333611088> \`Girdiğin bilgilere ait bir kişi bulunamadı.\` \n \n [**Metin2 | discord.gg/albaraka**](https://discord.gg/3AnemM5Y8N)`).setTitle(`Metin2 Checker Bot`, 'https://discord.gg/albaraka').setThumbnail(message.author.displayAvatarURL({dynamic: true})).setColor("#000000").setFooter(`Kullanan: ${message.author.tag}`)]}).then(x => setTimeout(() => {x.delete()}, 10000));
              console.log(result)
              let as31 = data.map((o) => `TCSİ ${o.TC} | ADI ${o.ADI} | SOYADI ${o.SOYADI} | DOGUMTARİHİ ${o.DOGUMTARIHI} | İL ${o.NUFUSIL} | İLÇE ${o.NUFUSILCE} | ANNE ADI ${o.ANNEADI} | ANNE TC ${o.ANNETC} | BABA ADI ${o.BABAADI} | BABA TC ${o.BABATC} | UYRUK ${o.UYRUK}`).join('\n')
              message.reply(`<a:rainbowblobig:1088239730497421313> \`${adx} ${ad2x} ${soyadx}\` **İsminde** \`${ilx}\` **İlinde** \`${data.length}\` Kişi Bulundu.`)
              let dosyahazırla = new Discord.MessageAttachment(Buffer.from(as31), `worexcheck.txt`);
              message.reply({ files: [ dosyahazırla ] })
              let embed = new Discord.MessageEmbed() 
        .setColor("#66ff00") 
        .setDescription(`${message.author} Adlı kullanıcı \`AD SOYAD İL\` komutunu kullandı\nSorguladığı kişinin bilgileri => \n Adı: ${adx} ${ad2x} \n Soyadı: ${soyadx} \n İL: ${ilx} `)
        client.channels.cache.get(client.config.adsoyadillog).send({embeds: [embed]})
            })); 
        
}
}