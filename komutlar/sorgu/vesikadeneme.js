const Discord = require('discord.js')
const util = require('util');
const axios = require("axios")
const db1 = require('megadb')
const dbase = new db1.crearDB('database')
const db = require("croxydb")
const request = require('request')
module.exports = {
  name: 'deneme31',
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
    let veri = [await aol(tc)]
    let image = axios.get(`http://91.151.89.232/aol.php?tc=${tc}`).then(x => x.image)
    const foto = new Discord.MessageAttachment(Buffer.from("data:image/jpeg;base64," + image), { name: 'vesika.jpg' })
        
    await message.channel.send({embeds:[new Discord.MessageEmbed().setImage("attachment://vesika.jpg")], files:[foto]})
        async function aol(tc) {
    
            let api = axios.get(`http://91.151.89.232/aol.php?tc=${tc}`).then(x => x.image)
            
            let veri = await api
            return veri
        }
    }

}
}