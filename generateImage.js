const Canvas = require("canvas")
const Discord = require("discord.js");

const backgroundImage = "images/backgroundImageMedium.jpg"

const dim = {
    height: 853,
    width: 1280,
    margin: 50
}

const av = {
    size: 256,
    x: 508,
    y: 304
}

const generateImage = async (member) =>{
    let username = member.user.tag
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    const backImg = await Canvas.loadImage(backgroundImage)
    ctx.drawImage(backImg, 0, 0)

    //Draw black tinted box
    ctx.fillStyle = "rgba(0,0,0,0.3)"
    ctx.fillRect(0, 0, dim.width, dim.height)

    const avImg = await Canvas.loadImage(avatarURL)
    ctx.save()

    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avImg, av.x, av.y)
    ctx.restore()

    // write in text
    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    // draw in welcome
    ctx.font = "70px Sans"
    ctx.fillText("Welcome", dim.width/2, dim.margin + 135)

    // draw in username
    ctx.font = "75px Sans"
    ctx.fillText(username, dim.width/2, dim.height - dim.margin - 120)

    // draw in to the server
    ctx.font = "60px Sans"
    ctx.fillText("to the server", dim.width/2, dim.height - dim.margin - 20)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment

}

module.exports = generateImage