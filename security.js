import {Client, GatewayIntentBits, ActivityType, EmbedBuilder, Colors} from 'discord.js';
import sendLog from "./utils/jsLogger.js";
import "dotenv/config";
import fs from 'fs';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


const events = fs
    .readdirSync('./events')
    .filter(file => file.endsWith('.js'));

for(let event of events) {
    const eventFile = await import(`#events/${event}`);
    if(eventFile.once) {
        client.once(eventFile.name, (...args) => {
            eventFile.invoke(...args);
        });
    } else {
        client.on(eventFile.name, (...args) => {
            eventFile.invoke(...args);
        });
    }
}

client.on('ready', async => {
    sendLog(1, "Ready", "Bot is online now!")
    client.user.setPresence({
        activities: [{name: 'Mixsecurity', type: ActivityType.Watching}],
        status: 'idle'
    });
})

client.on('messageCreate', async (message) => {
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

});

client.login(process.env.TOKEN).then(r =>
    sendLog(1,"Login", "Bot is logged in !")
);