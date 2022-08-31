import {Colors, EmbedBuilder, SlashCommandBuilder} from 'discord.js';

const create = () => {
    const command = new SlashCommandBuilder()
        .setName('security')
        .setDescription('Get information about security status.');

    return command.toJSON();
};

/*

    komut kullanıldı =>>
        - veri tabanına tarih bilgileri eklendi
        eğer bot kapandıysa => tekrar açıldığında son tarih verisini kullanır, işlemine devam eder
         |
         |-> Eğer çekiliş bittiğinde bot kapalıysa bot tekrar açıldığında çekilişi bitir


 */

const invoke = async (interaction) => {
    interaction.reply({
            ephemeral: true,
            content: 'This is test message...'
    }
    );
};

export { create, invoke };