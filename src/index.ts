const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const config = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log('bot started now !');
    
    const pingCommand = new SlashCommandBuilder()
        .setName('help')
        .setDescription('help command!');
    
    const guildId = '1236344772331831428';
    const commands = [pingCommand.toJSON()];
    
    client.guilds.cache.get(guildId)?.commands.set(commands)
        .then(() => console.log(''))
        .catch(console.error);
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'help') {
        await interaction.reply('help command :D');
    }
});

client.login(config.token);
