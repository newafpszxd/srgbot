const Discord = require('discord.js')
const util = require('util');
const db1 = require('megadb')
const dbase = new db1.crearDB('database')
const db = require("croxydb")
const mysql = require('mysql')
module.exports = {
  name: 'aile',
    kategori: 'sorgu',
    help: 'tc [tc no]',
    description: 'tc kimlik numarasına ait kişinin ad-soyad bilgisini atar',
  run: async (client, message, args) => {
    let cantbeuse = await dbase.get(`kullanilabilir_kanallar_${message.channel.id}`)
    if (!cantbeuse) cantbeuse = []
    if (cantbeuse.includes(message.channel.id)) return message.channel.send({content:`❌  | ${message.author.username}, komutlar bu kanalda devre dışı!`}).then(x => setTimeout(() => { x.delete()}, 10000 ))
    else {
let vip1 = new Discord.MessageEmbed() .setColor("#FFEE58") .setDescription(client.config.üyelikyokmesaj)
  let vip = db.fetch(`pre_${message.author.id}`)
if(!vip) return message.channel.send({embeds: [vip1]})

    let tc = Number(args[0])
    if(!tc) return message.channel.send(new Discord.MessageEmbed().setDescription(`❌ Geçerli bir k4ml4k num4r@sı giriniz. **Örneğin: !tc 11111111110**`).setColor("RED")).then(x => x.delete({ timeout: 7000 }))
let sorgu = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "worex101"
    });
   
    let sonuç = `SELECT * FROM worex101 WHERE TC="${tc}"`
   
    message.reply({embeds: [new Discord.MessageEmbed().setDescription(`<a:loading:1088240030159487028> \`Sorgunuz yapılıyor, lütfen bekleyiniz.\` \n \n [**Metin2 | discord.gg/albaraka**](https://discord.gg/3AnemM5Y8N)`).setTitle(`Metin2 Checker Bot`, 'https://discord.gg/albaraka').setThumbnail(message.author.displayAvatarURL({dynamic: true})).setColor("#000000").setFooter(`Kullanan: ${message.author.tag}`)]}).then(x => setTimeout(() => { x.delete()}, 10000 )).then(
          sorgu.query(sonuç, [tc], async function(err, result) {
            const data = JSON.parse(JSON.stringify(result))  
            if(data.length < 1) return message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`<:pepesadge:1088530576333611088> \`Girdiğin bilgilere ait bir kişi bulunamadı.\` \n \n [**Metin2 | discord.gg/albaraka**](https://discord.gg/3AnemM5Y8N)`).setTitle(`Metin2 Checker Bot`, 'https://discord.gg/albaraka').setThumbnail(message.author.displayAvatarURL({dynamic: true})).setColor("#000000").setFooter(`Kullanan: ${message.author.tag}`)]}).then(x => setTimeout(() => {x.delete()}, 10000));
           let datam = require('util').inspect(data)
           let mal = data.map(x => `${x.TC} ${x.ADI} ${x.SOYADI} ${x.DOGUMTARIHI} ${x.NUFUSIL} ${x.NUFUSILCE}\n`).join("\n")
          let babatc = data.map(y => `${y.BABATC}`)
          let annetc = data.map(y => `${y.ANNETC}`)
         
          let sonuç2 = `SELECT * FROM worex101 WHERE TC="${babatc}"`
          sorgu.query(sonuç2, [babatc], async function(err, result) {
            const data = JSON.parse(JSON.stringify(result))  
            let datam = require('util').inspect(data)
            let babamap = data.map(x => `${x.TC} ${x.ADI} ${x.SOYADI} ${x.DOGUMTARIHI} ${x.NUFUSIL} ${x.NUFUSILCE}\n`).join("\n")
          

          let sonuç3 = `SELECT * FROM worex101 WHERE TC="${annetc}"`
          sorgu.query(sonuç3, [annetc], async function(err, result) {
            const data = JSON.parse(JSON.stringify(result))  
            let datam = require('util').inspect(data)
            let annemap = data.map(x => `${x.TC} ${x.ADI} ${x.SOYADI} ${x.DOGUMTARIHI} ${x.NUFUSIL} ${x.NUFUSILCE}\n`).join("\n")
         
            let sonuç4 = `SELECT * FROM worex101 WHERE ANNETC="${annetc}"`
            sorgu.query(sonuç4, [annetc], async function(err, result) {
              const data = JSON.parse(JSON.stringify(result))  
              let datam = require('util').inspect(data)
              let kardesmap = data.map(x => `${x.TC} ${x.ADI} ${x.SOYADI} ${x.DOGUMTARIHI} ${x.NUFUSIL} ${x.NUFUSILCE}`).join("\n")
           
              let sonuç5 = `SELECT * FROM worex101 WHERE ANNETC="${tc}" OR BABATC="${tc}"`
              sorgu.query(sonuç5, [tc], async function(err, result) {
                const data = JSON.parse(JSON.stringify(result))  
                let datam = require('util').inspect(data)
                let çocuklarmap = data.map(x => `${x.TC} ${x.ADI} ${x.SOYADI} ${x.DOGUMTARIHI} ${x.NUFUSIL} ${x.NUFUSILCE}`).join("\n")
             
let deneme = `Kendisi | ${mal} \nBabası | ${babamap} \nAnnesi | ${annemap} \nKardeşleri | ${kardesmap ? `${kardesmap}`: 'Kardeşi bulunmamaktadır'} \n
Çocuğu | ${çocuklarmap ? `${çocuklarmap}`: 'Çocuğu bulunmamaktadır'}`
let dosyahazırla = new Discord.MessageAttachment(Buffer.from(deneme), `worexcheck.txt`);
message.reply({ files: [ dosyahazırla ] })
let embed = new Discord.MessageEmbed() 
        .setColor("#66ff00") 
        .setDescription(`${message.author} Adlı kullanıcı \`AİLE\` komutunu kullandı\nSorguladığı kişinin bilgileri => \n TC: ${tc}`)
        client.channels.cache.get(client.config.ailelog).send({embeds: [embed]})
                
              })
           
            })  
          })

        })
          }))
}}}