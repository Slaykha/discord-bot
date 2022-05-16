const Discord = require("discord.js");
require("dotenv").config()

const generateImage = require("./generateImage")
const myMethod = require("./Count.js")
const count = myMethod.count
const answer = myMethod.left
const stop = myMethod.stop

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

let pomodoroTime = 0
client.on("messageCreate", message => {
    if(message.content.startsWith("!pomodoro")){
        if(message.content.split("!pomodoro ")[1] === "stop"){
            message.reply(stop())
        }else{
            pomodoroTime = parseInt(message.content.split("!pomodoro ")[1]) 
            message.reply(count(pomodoroTime))
        }
              
    }
})

client.on("messageCreate", message => {
    if(message.content.startsWith("!left")){
        message.reply(answer())
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
