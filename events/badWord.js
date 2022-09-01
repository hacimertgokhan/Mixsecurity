import sendLog from "../utils/jsLogger.js";
import {EmbedBuilder} from "discord.js";
const once = false;
const name = 'messageCreate';

async function invoke(message) {
    let list = ["mal", "salak"];
    const currentDate = new Date();
    const msg = message.content.toLowerCase();
    const detailedLog = `[Tarih: ${currentDate.getUTCMinutes()}:${currentDate.getUTCHours()}:${currentDate.getUTCDay()} | ${currentDate.getUTCDate()}] [${message.author.tag}], Mesajı: ${message.content.toLowerCase()}`
    if(message.author.bot) return;
    if(list.includes(msg)) {
        message.delete();
        let newEmbed = new EmbedBuilder()
            .setTitle("Mixsecurity : Küfür engelleme")
            .setColor("BLUE")
            .setDescription("Sohbet kuralları gereğince küfür etmemen gerek !");
        message.channel.send({embeds: [newEmbed]});
        sendLog(2, "Küfür Kullanımı", detailedLog);
    }

};

export { once, name, invoke };
