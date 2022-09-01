import sendLog from "../utils/jsLogger.js";
import {EmbedBuilder} from "discord.js";
import fs from "fs";
import yaml from "js-yaml";
const once = false;
const name = 'messageCreate';

async function invoke(message) {
    let fileContents = fs.readFileSync('./storage/wordlist.yml', 'utf8');
    let data = yaml.load(fileContents);
    let getList = data.toString().toLowerCase();
    const currentDate = new Date();
    const msg = message.content.toLowerCase();
    const detailedLog = `[Triggered at: ${currentDate.getUTCMinutes()}m:${currentDate.getUTCHours()}h] [${message.author.tag}]: Mesajı: ${message.content.toLowerCase()}`
    if(message.author.bot) return;
    if(getList.includes(msg)) {
        message.delete();
        let newEmbed = new EmbedBuilder()
            .setTitle("(🍁) Mixsecurity")
            .setColor(0xff6347)
            .addFields(
                {name: 'Hey ! You cannot do that !', value: 'Please do not use bad words in chat !', inline: true}
            )
            .setThumbnail(message.author.avatarURL());
        message.channel.send({embeds: [newEmbed]});
        sendLog(2, "Badword", detailedLog);
    }

};

export { once, name, invoke };
