import sendLog from "../utils/jsLogger.js";
import {EmbedBuilder} from "discord.js";
import words from "../storage/words.js";
const once = false;
const name = 'messageCreate';

async function invoke(message) {
    const currentDate = new Date();
    const msg = message.content.toLowerCase();
    const detailedLog = `[Triggered at: ${currentDate.getUTCMinutes()}m:${currentDate.getUTCHours()}h] [${message.author.tag}]: Message: ${message.content.toLowerCase()}`
    if(message.author.bot) return;
    if(words.some(s => msg.includes(s))) {
        message.delete();
        let newEmbed = new EmbedBuilder()
            .setTitle("(🍁) Mixsecurity")
            .setColor(0xff6347)
            .addFields(
                {name: 'Hey ! You cannot do that !', value: 'Please do not use bad words in chat !', inline: true}
            )
            .setThumbnail(message.author.avatarURL());
        message.channel.send({embeds: [newEmbed]}).then(message => {
                setTimeout(function() {
                    message.delete();
                }, 5000)
            }
        )
        sendLog(2, "Badword", detailedLog);
    }

};

export { once, name, invoke };
