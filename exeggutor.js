const Discord = require('discord.js')
const util = require('util')
const { execSync } = require('child_process')
const botum = new Discord.Client()
const owner = require('./tokens').owner

const clean = text => {
    if(typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
    else
        return text
}

botum.on('ready', () => {
    console.log('Hello world!\nLogged in as ' + botum.user.tag)
})

botum.on('message', message => {
    if(message.author.id !== owner || !message.content.startsWith('!')) return
    
    const args = message.content.slice(1).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    try {
        let commandFile = require(`./commands/${command}.js`)
        commandFile.run(botum, message, args)
    } catch(err) { }

})

botum.login(require('./tokens').discord)