import {Client, GatewayIntentBits, ActivityType, EmbedBuilder, Colors} from 'discord.js';
import sendLog from "./utils/jsLogger.js";
import "dotenv/config";
import fs from 'fs';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });



client.on('ready', async() => {
    sendLog(1, "Ready", "Bot is online now!")
    client.user.setPresence({
        activities: [{name: 'Mixsecurity', type: ActivityType.Watching}],
        status: 'idle'
    });

    const commands = fs
        .readdirSync('./commands')
        .filter((file) => file.endsWith('.js'))
        .map((file) => file.slice(0, -3));

    const commandsArray = [];

    for (let command of commands) {
        const commandFile = await import(`./commands/${command}.js`);
        commandsArray.push(commandFile.create());
    }

    client.application.commands.set(commandsArray);

    const events = fs
        .readdirSync('./events')
        .filter(file => file.endsWith('.js'));

    for(let event of events) {
        const eventFile = await import(`#events/${event}`);
        if (eventFile.once) {
            client.once(eventFile.name, (...args) => {
                eventFile.invoke(...args);
            });
        } else {
            client.on(eventFile.name, (...args) => {
                eventFile.invoke(...args);
            });
        }

    }
    sendLog(3, "Events", `Loadede events (${events.length}) loaded for ${client.user.username}`);
    sendLog(3, "Commands", `Loaded commands (${commandsArray.length}) for ${client.user.username}`);



})



client.login(process.env.TOKEN).then(r =>
    sendLog(1,"Login", "Bot is logged in !")
);