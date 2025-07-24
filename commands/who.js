import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import config from '../config.json' with { type: 'json' };

export const formatUsers = users => {
    const count = Array.isArray(users) ? users.length : 0;
    if (count === 0) {
        return 'No one in the lab';
    }

    let result = `People in the lab: ${count}\n`;
    let guests = 0;
    for (const user of users) {
        if (!user.id) {
            guests++;
            continue;
        }
        let line = user.username;
        if (user.twitter) {
            line += ` Twitter: <https://twitter.com/${user.twitter}>`;
        }
        if (user.github) {
            line += ` GitHub: <https://github.com/${user.github}>`;
        }
        if (user.url) {
            line += ` Web: <${user.url}>`;
        }
        result += `${line}\n`;
    }

    if (guests > 0) {
        result += 'Anonymous labber';
        if (guests > 1) {
            result += ` x${guests}`;
        }
    }

    return result;
}

export default {
    data: new SlashCommandBuilder()
        .setName('who')
        .setDescription('Show who is in the lab'),

    async execute(interaction) {
        await interaction.deferReply();
        try {
            const usersRes = await fetch(config.STATUS_USERS_URL);
            if (!usersRes.ok) throw new Error(`${config.STATUS_USERS_URL} ${usersRes.status}`);
            const users = await usersRes.json();

            return interaction.editReply({
                content: formatUsers(users),
                flags: MessageFlags.SuppressEmbeds
            });
        } catch (err) {
            console.error(`Command /${interaction.commandName} error: ${err}`);
            return interaction.editReply({
                content: '🚨 Unable to execute command'
            });
        }
    }
};
