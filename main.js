const Discord = require("discord.js");
require("dotenv").config()

const generateImage = require("./generateImage")

//alinin aq
const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", message => {
    if(message.content == "!pomodoro"){
        message.reply("Domates?")
    }
})

const welcomeChannelID = "972788075887476736";

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelID).send({
        content: `<@${member.id}> Welcome to the server!`,
        files: [img]
    })
})

client.login(process.env.TOKEN)
