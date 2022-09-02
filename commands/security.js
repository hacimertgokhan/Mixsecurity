import {Colors, EmbedBuilder, SlashCommandBuilder} from 'discord.js';

const create = () => {
    const command = new SlashCommandBuilder()
        .setName('security')
        .setDescription('Get information about security status.');

    return command.toJSON();
};

const invoke = async (interaction) => {
    interaction.reply({
            ephemeral: true,
            content: 'This is test message...'
    }
    );
};

export { create, invoke };