const Discord = require('discord.js')

const db1 = require('megadb')
const dbase = new db1.crearDB('database')

module.exports = {
    name: 'Yardım',
    aliases: ['yardım'],
    run: async(client, message, args) => {

    let cantbeuse = await dbase.get(`kullanilabilir_kanallar_${message.channel.id}`)
    if (!cantbeuse) cantbeuse = []
    if (cantbeuse.includes(message.channel.id)) return message.channel.send({ content: `❌  | ${message.author.username}, komutlar bu kanalda devre dışı!`}).then(x => setTimeout(() => { x.delete()} , 10000 ))
    else {
    
let embed = new Discord.MessageEmbed().setColor('#00ff00').setThumbnail(message.author.displayAvatarURL({dynamic: true}))
.setTitle(`Metin2 Checker Bot`, 'https://discord.gg/albaraka')
.addField('<a:discordon:1088547071272964207> Ücretsiz Komutlar', 'Ücretsiz Komutları Kullanabilirsiniz.')
.addField('<a:discordon:1088547071272964207> .adsoyad', 'Ad Soyad ile TC Bulursunuz.', true)
.addField('<a:discordon:1088547071272964207> .adsoyadil', 'Ad Soyad, İl ile TC Bulursunuz.', true)
.addField('<a:discordon:1088547071272964207> .adsoyadililce', 'Ad Soyad, İl, İlçe ile TC Bulursunuz.', true)
.addField('<:kra:1088547751786188800> Premium Komutlar', 'Premium Komutlara Sahip Olmak İçin Premium Olmanız Gerek.')
.addField('<:kra:1088547751786188800> .gsmtc', 'Telefon Numarasından TC Bulursunuz.', true)
.addField('<:kra:1088547751786188800> .sülale', 'Kişinin Sülalesindeki Herkesin Bilgilerini Bulursunuz.', true)
.addField('<:kra:1088547751786188800> .aile', 'Kişinin Ailesindeki Herkesin Bilgilerini Bulursunuz.', true)
.addField('<:kra:1088547751786188800> .tcgsm', 'TC den Telefon Numarası Bulursunuz.', true)
.addField('<:kra:1088547751786188800> .eokul', 'Kişinin E-Okul Bilgilerini Bulursunuz.', true)
.addField('<:kra:1088547751786188800> .facebook', 'Kişinin Facebook Bilgilerini Bulursunuz.', true)
.addField('<:kra:1088547751786188800> .ttnet', 'Kişinin TTnet Bilgilerini Bulursunuz.', true)
.addField('<:kra:1088547751786188800> .adres', 'Kişinin Adres Bilgilerini Bulursunuz.', true)
.setDescription(`[**Metin2 | discord.gg/albaraka**](https://discord.gg/3AnemM5Y8N)`)


.setFooter(`Kullanan: ${message.author.tag}`)
message.reply({ embeds: [embed] })
}
}
}  