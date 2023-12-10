const Discord = require('discord.js')
const util = require('util');
const db1 = require('megadb')
const dbase = new db1.crearDB('database')
const db = require("croxydb")
const request = require('request')
module.exports = {
  name: 'eokul',
    kategori: 'sorgu',
    help: 'eokul',
    description: 'eokul bilgisini atar',
  run: async (client, message, args) => {
    let cantbeuse = await dbase.get(`kullanilabilir_kanallar_${message.channel.id}`)
    if (!cantbeuse) cantbeuse = []
    if (cantbeuse.includes(message.channel.id)) return message.channel.send({content: `❌  | ${message.author.username}, komutlar bu kanalda devre dışı!`}).then(x => setTimeout(() => { x.delete()}, 7000 ));
    else {
          let vip1 = new Discord.MessageEmbed() .setColor("#FFEE58") .setDescription(client.config.üyelikyokmesaj)
          let vip = db.fetch(`pre_${message.author.id}`)
        if(!vip) return message.channel.send({embeds: [vip1]}).then(x => setTimeout(() => { x.delete()}, 7000 ));
       
    let tc = Number(args[0])
    if(!tc) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`❌ Geçerli bir k4ml4k num4r@sı giriniz. **Örneğin: !tc 11111111110**`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 7000 ))
   
    message.reply({embeds: [new Discord.MessageEmbed().setDescription(`<a:loading:1088240030159487028> \`Sorgunuz yapılıyor, lütfen bekleyiniz.\` \n \n [**Metin2 | discord.gg/albaraka**](https://discord.gg/3AnemM5Y8N)`).setTitle(`Metin2 Checker Bot`, 'https://discord.gg/albaraka').setThumbnail(message.author.displayAvatarURL({dynamic: true})).setColor("#000000").setFooter(`Kullanan: ${message.author.tag}`)]}).then(x => setTimeout(() => { x.delete()}, 10000 )).then(
      request(`https://ajex.live/api/vesika?auth=ZXTVqBCYuGRPGayOIwF&tc=${tc}`, (error, response, body) => {
        let result = JSON.parse(body);
          if(error) throw error
          
          const data = JSON.parse(JSON.stringify(result.data)) 
          const kişinintcsi = JSON.parse(JSON.stringify(result.data.TC))
          const kişininadı = JSON.parse(JSON.stringify(result.data.ADI)) 
          const kişininsoyadı = JSON.parse(JSON.stringify(result.data.SOYADI))
          const durumu = JSON.parse(JSON.stringify(result.data.Durum))
          const numara = JSON.parse(JSON.stringify(result.data.okulnumara))
          if(data.length < 1) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`<:pepesadge:1088530576333611088> \`Girdiğin bilgilere ait bir kişi bulunamadı.\` \n \n [**Metin2 | discord.gg/albaraka**](https://discord.gg/3AnemM5Y8N)`).setTitle(`Metin2 Checker Bot`, 'https://discord.gg/albaraka').setThumbnail(message.author.displayAvatarURL({dynamic: true})).setColor("#000000").setFooter(`Kullanan: ${message.author.tag}`)]}).then(x => setTimeout(() => {x.delete()}, 10000));
           let datam = require('util').inspect(data)
           dosyahazırla = new Discord.MessageAttachment(Buffer.from(datam), `${tc}-s4rgu.txt`);
          let embed = new Discord.MessageEmbed() 
        .setColor("#66ff00") 
        .setDescription(`${message.author} Adlı kullanıcı \`tc\` komutunu kullandı\n\nSorgulattığı kimlik numarası => ${tc}\n\nSorguladığı kişinin bilgileri => Kişinin Tcsi: ${kişinintcsi} \n Kişinin Adı: ${kişininadı} \n Kişinın Soyadı: ${kişininsoyadı} \n Kişinin Okul Durumu: ${durumu} \n Kişinin Okul Numarası: ${numara} `)
        client.channels.cache.get(client.config.eokullog).send({embeds: [embed]}).catch(err => {
       client.channels.cache.get(client.config.eokullog).send({content: `${message.author.username} Adlı kullanıcı \`E OKUL\` komutunu kullandı\n\nSorgulattığı kimlik numarası => ${tc}\nİşte bilgiler`,files: [dosyahazırla]})})
        message.reply({embeds: [new Discord.MessageEmbed().setDescription(`Kişinin Tcsi: ${kişinintcsi} \n Kişinin Adı: ${kişininadı} \n Kişinın Soyadı: ${kişininsoyadı} \n Kişinin Okul Durumu: ${durumu} \n Kişinin Okul Numarası: ${numara}`).setTitle(`Metin2 Checker Bot`, 'https://discord.gg/albaraka').setThumbnail(message.author.displayAvatarURL({dynamic: true})).setColor("#000000").setFooter(`Kullanan: ${message.author.tag}`)]})
        })  )
      

}
}
}