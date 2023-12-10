const Discord = require('discord.js')
const util = require('util');
const db1 = require('megadb')
const dbase = new db1.crearDB('database')
const db = require("croxydb")
const request = require('request')
const mysql = require('mysql')
module.exports = {
  name: 'sms',
    kategori: 'sms',
    help: 'sms [telefon no]',
    description: 'sms bomber',
  run: async (client, message, args) => {
    let cantbeuse = await dbase.get(`kullanilabilir_kanallar_${message.channel.id}`)
    if (!cantbeuse) cantbeuse = []
    if (cantbeuse.includes(message.channel.id)) return message.channel.send({content: `❌  | ${message.author.username}, komutlar bu kanalda devre dışı!`}).then(x => setTimeout(() => { x.delete()}, 7000 ));
    else {
          let vip1 = new Discord.MessageEmbed() .setColor("#FFEE58") .setDescription(client.config.üyelikyokmesaj)
          let vip = db.fetch(`pre_${message.author.id}`)
        if(!vip) return message.channel.send({embeds: [vip1]}).then(x => setTimeout(() => { x.delete()}, 7000 ));
       
    let sms = Number(args[0])
    if(!sms) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`❌ Geçerli bir telefon numarası giriniz. **Örneğin: !sms 5541564**`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 7000 ))
   
      message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`${client.config.load} sms gönderiliyor`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 1000 ))
           request(`https://smsboomber.monst3rcuts.repl.co/api/smsboomber?auth=77e2edcc9b40441200e31dc57dbb8829&number=${sms}`, (error, response, body) => {
		  let result = JSON.parse(body);
          if(error) throw error
          
          
        .setDescription(`${message.author} Adlı kullanıcı \`sms\` komutunu kullandı\n\nSorgulattığı kimlik numarası => ${sms}\n\nSorguladığı kişinin bilgileri => ${datam} `)
          
        })  
      

}
}
}
