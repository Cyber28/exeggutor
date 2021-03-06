const Discord = require("discord.js")
const fs = require("fs")
const { exec } = require('child_process')
const owner = require('../tokens').owner

const clean = text => {
    if(typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
    else
        return text
}

module.exports.run = (client, message, args) => {
    if (message.author.id !== owner) return    
    var code = message.content.slice(5)
    exec(code, (error, stdout, stderr) => {
        if (!error && stdout) {
            if (stdout.length > 1000) {
                stdout = stdout.substr(stdout.length - 999, stdout.length)
            }
            message.channel.send("```" + clean(stdout) + "```")
        } else {
            message.channel.send("```" + clean(stderr) + "```")
        }
    })
}
