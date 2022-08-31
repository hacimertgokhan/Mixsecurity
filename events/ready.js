import sendLog from "../utils/jsLogger.js";
import fs from 'fs';
const once = true;
const name = 'ready';

async function invoke(client) {
    const commands = fs
        .readdirSync('./events/commands')
        .filter((file) => file.endsWith('.js'))
        .map((file) => file.slice(0, -3));

    const commandsArray = [];

    for (let command of commands) {
        const commandFile = await import(`#commands/${command}`);
        commandsArray.push(commandFile.create());
    }

    client.application.commands.set(commandsArray);

    sendLog(3, "Commands", `Loaded commands (${commandsArray.length}) for ${client.user.tag}`);

}

export { once, name, invoke };