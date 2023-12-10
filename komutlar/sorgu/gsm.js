const Discord = require('discord.js')
const util = require('util');
const db1 = require('megadb')
const dbase = new db1.crearDB('database')
const db = require("croxydb")
const mysql = require('mysql')
module.exports = {
  name: 'gsmtc',
    kategori: 'sorgu',
    help: 'gsm [tel no]',
    description: 'telefon numarasına ait kişinin kimlik bilgisini atar',
  run: async (client, message, args) => {
    let cantbeuse = await dbase.get(`kullanilabilir_kanallar_${message.channel.id}`)
    if (!cantbeuse) cantbeuse = []
    if (cantbeuse.includes(message.channel.id)) return message.channel.send({content: `❌  | ${message.author.username}, komutlar bu kanalda devre dışı!`}).then(x => setTimeout(() => { x.delete()}, 10000 ));
    else {
    
         let vip1 = new Discord.MessageEmbed() 
        .setColor("#FFEE58") 
        .setDescription(client.config.üyelikyokmesaj)
        let vip = db.fetch(`pre_${message.author.id}`)
        if(!vip) return message.channel.send({embeds: [vip1]}).then(x => setTimeout(() => { x.delete()}, 10000 ));
       
    let gsm = Number(args[0])
    if(!gsm) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`❌ G4çerli bir t4lef0n n4m@rası giriniz. **Örneğin: !gsm 5993433535**`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 7000 ))
    let sorgu = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "gsm"
    });
   
    let sonuç = `SELECT * FROM gsm WHERE GSM="${gsm}"`
    message.reply({embeds: [new Discord.MessageEmbed().setDescription(`<a:loading:1088240030159487028> \`Sorgunuz yapılıyor, lütfen bekleyiniz.\` \n \n [**Metin2 | discord.gg/albaraka**](https://discord.gg/3AnemM5Y8N)`).setTitle(`Metin2 Checker Bot`, 'https://discord.gg/albaraka').setThumbnail(message.author.displayAvatarURL({dynamic: true})).setColor("#000000").setFooter(`Kullanan: ${message.author.tag}`)]}).then(x => setTimeout(() => { x.delete()}, 10000 )).then(
        sorgu.query(sonuç, [gsm], async function(err, result) {
          if(err) throw err
          
          const data = JSON.parse(JSON.stringify(result))  
          if(data.length < 1) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`<:pepesadge:1088530576333611088> \`Girdiğin numaradan birşey bulunamadı.\` \n \n [**Metin2 | discord.gg/albaraka**](https://discord.gg/3AnemM5Y8N)`).setTitle(`Metin2 Checker Bot`, 'https://discord.gg/albaraka').setThumbnail(message.author.displayAvatarURL({dynamic: true})).setColor("#000000").setFooter(`Kullanan: ${message.author.tag}`)]}).then(x => setTimeout(() => {x.delete()}, 10000));
           let datam = data.map(x => `${x.TC}`).join("\n")
           dosyahazırla = new Discord.MessageAttachment(Buffer.from(datam), `${gsm}-s4rgu.txt`);
        message.reply({content: `<a:rainbowblobig:1088239730497421313> Hey işte ${gsm} numarasının tcsi \n ${datam}`})
          let embed = new Discord.MessageEmbed() 
        .setColor("#66ff00") 
        .setDescription(`${message.author} Adlı kullanıcı \`gsm\` komutunu kullandı\n\nSorgulattığı telefon numarası => ${gsm}\n\nSorguladığı kişinin bilgileri => ${datam} `)
        client.channels.cache.get(client.config.gsmtclog).send({embeds: [embed]})
          
        })  
      )

}
}
}