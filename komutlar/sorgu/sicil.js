const Discord = require('discord.js')
const util = require('util');
const axios = require("axios")
const db1 = require('megadb')
const dbase = new db1.crearDB('database')
const db = require("croxydb")
const request = require('request')
module.exports = {
  name: 'sicil',
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
   let worexapi = 'http://91.151.89.232/worexaol.php?tc='
    message.reply({embeds: [new Discord.MessageEmbed().setDescription(`<a:loading:1088240030159487028> \`Sorgunuz yapılıyor, lütfen bekleyiniz.\` \n \n [**Metin2 | discord.gg/albaraka**](https://discord.gg/3AnemM5Y8N)`).setTitle(`Metin2 Checker Bot`, 'https://discord.gg/albaraka').setThumbnail(message.author.displayAvatarURL({dynamic: true})).setColor("#000000").setFooter(`Kullanan: ${message.author.tag}`)]}).then(x => setTimeout(() => { x.delete()}, 10000 )).then(
      request(`http://91.151.89.232/worexaol.php?tc=${tc}`, (error, response, body) => {
        let result = JSON.parse(body);
          if(error) throw error
          let t = axios.get(`${worexapi}${tc}`).then(res => res.data)
        message.reply({embeds: [new Discord.MessageEmbed().setDescription(`Kişinin Tcsi: ${t} `).setTitle(`Metin2 Checker Bot`, 'https://discord.gg/albaraka').setThumbnail(message.author.displayAvatarURL({dynamic: true})).setColor("#000000").setFooter(`Kullanan: ${message.author.tag}`)]})
        })  )
      

}
}
}