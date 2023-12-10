const Discord = require('discord.js');
const client = global.client = new Discord.Client({partials: ["CHANNEL","MESSAGE"], allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
  intents: 32767});

const fs = require('fs');
const process = global.process;
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();
const db = require("croxydb")

fs.readdirSync('./komutlar', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./komutlar/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/komutlar/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

fs.readdirSync('./komutlar/kullanıcı', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./komutlar/kullanıcı/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/komutlar/kullanıcı/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

fs.readdirSync('./komutlar/owner', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./komutlar/owner/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/komutlar/owner/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})

fs.readdirSync('./komutlar/sorgu', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./komutlar/sorgu/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/komutlar/sorgu/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})



client.on("messageCreate", message => {
    const prefix = "."; // prefix
    if (message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.split(' ').slice(1);
    const command = message.content.split(' ')[0].slice(prefix.length);
    
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
}) 

client.config = {
    token : "MTE4MzUwO5NhMqEMz-6VTQYwNQ.GC9UPU.VFiv3DG0DaQkJhVzokhqx1_8V5NhMqEMz-6VTQ",
    üyelikyokmesaj: ":no_entry_sign: Sistemde üyeliğiniz bulunmamaktadır!",
    premiumbittilog: '1183515632612950026',
    premiumbasladilog: '1183515632612950026',
    premiumsonlandilog: '1183515632612950026',
    owner: ["1183515632612950026"],
    gsmtclog: '1183515632612950026',
    mesajsilmesüresi: '30000', //mesajı kaç saniyede sileceğini yazın 10000 = 10sn 60000 = 60sn
    tclog: '1183515632612950026',
    adsoyadillog: '1183515632612950026',
    ailelog: '1183515632612950026',
    adreslog: '1183515632612950026',
    eokullog: '1183515632612950026',
    adsoyadililcelog: '1183515632612950026',
    adsoyadlog: '1183515632612950026',
    tcgsmlog: '1183515632612950026',
    load: ":tada:",
    mod: ":tada:",
    elmas: ":tada:",
    supriz: ":tada:",
    adsoyadlog: "1183515632612950026",
    facelog: "1183515632612950026",
    ttnetlog: "1183515632612950026",
    adreslog: "1183515632612950026",
    sulalelog: "1183515632612950026",
    smslog: "1183515632612950026",
    komutlog: "1183515632612950026",
    sunucuid: "1183155998601510933"
    }

client.on('ready', () => {
    
    client.user.setPresence({ activity: { name: 'worexsiker'}, status: 'online' })
    console.log(`[main/INFO] Başarıyla sunucuya bağlanıldı.`)
})


client.login(client.config.token)
  .catch(() => console.log('ERROR - API\'ye bağlanılamadı.'));
  
  client.on("messageCreate", message => {
    if (client.config.owner.includes(message.author.id)) return;
  if (message.channel.type === "DM") { 
  	if (message.author.bot) return;
console.log(`${message.author.tag} > ${message.content}`)
client.channels.cache.get(client.config.komutlog).send({content:`\`[${tarih}]\` **${message.author.tag}** > ${message.content}`}).catch(err => {
    client.channels.cache.get(client.config.komutlog).send({content:`\`[${tarih}]\` **${message.author.tag}** > mesajı çok uzun`})})

}});
  
