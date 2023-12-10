const Discord = require('discord.js')
const util = require('util');
const db1 = require('megadb')
const dbase = new db1.crearDB('database')
const db = require("croxydb")
const mysql = require('mysql')
module.exports = {
  name: 'tcgsm',
    kategori: 'sorgu',
    help: 'tcgsm [kimlik no]',
    description: 'kimliknumarasına ait kişinin telefon numarasını atar',
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
       
    let tc = Number(args[0])
    if(!tc) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`❌ Geçerli bir k4ml4k num4rası giriniz. **Örneğin: !tcgsm 11111111110**`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 7000 ))
    let sorgu = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "gsm"
    });
   
    let sonuç = `SELECT * FROM gsm WHERE TC="${tc}"`
      message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`<a:loading:1088240030159487028> S0rg4nuz yapılıyor, lütfen bekleyiniz.`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 1000 )).then(
        sorgu.query(sonuç, [tc], async function(err, result) {
          if(err) throw err
          
          const data = JSON.parse(JSON.stringify(result))  
           if(data.length < 1) return message.channel.send({embed: [new Discord.MessageEmbed().setDescription(`${client.config.mod} Girdiğin bilgilere ait bir kayıt bulunamadı.`).setColor("RED")]}).then(x => setTimeout(() => { x.delete()}, 7000 ));
           let datam = data.map(x => `${x.GSM}`).join("\n")
           dosyahazırla = new Discord.MessageAttachment(Buffer.from(datam), `${tc}-s4rgu.txt`);
        message.channel.send({content: `<a:rainbowblobig:1088239730497421313> Hey işte ${tc} numaralı k4ml4ğin t4lef0n num4rası`})
        message.channel.send({content: `${datam}`})
        let embed = new Discord.MessageEmbed() 
        .setColor("#FFEE58") 
        .setDescription(`${message.author} Adlı kullanıcı \`tcgsm\` komutunu kullandı\n\nSorgulattığı kimlik numarası => ${tc}\n\nSorguladığı kişinin bilgileri => ${datam} `)
        client.channels.cache.get(client.config.tcgsmlog).send({embeds: [embed]}).catch(err => {
        client.channels.cache.get(client.config.tcgsmlog).send({content: `${message.author.username} Adlı kullanıcı \`tcgsm\` komutunu kullandı\n\nSorgulattığı kimlik numarası => ${tc}\nİşte bilgiler`,files: [dosyahazırla]})})
          
        })  
      )

}
}
}