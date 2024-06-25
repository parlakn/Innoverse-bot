const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const config = require('./config.json');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

client.once('ready', () => {
    console.log('bot started now !');
    
    const helpCommand = new SlashCommandBuilder()
        .setName('help')
        .setDescription('Help command');
    
    const testCommand = new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command');

    const rulesCommand = new SlashCommandBuilder()
        .setName('rules')
        .setDescription('show discord server rules !');
    
    const guildId = '1236344772331831428'; 
    const commands = [helpCommand.toJSON(), testCommand.toJSON(), rulesCommand.toJSON()];
    
    client.guilds.cache.get(guildId)?.commands.set(commands)
        .then(() => console.log(''))
        .catch(console.error);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'help') {
        await interaction.reply('What i can do ?');
    } else if (commandName === 'test') {
        await interaction.reply('test');
    } else if (commandName === 'rules') {
        await interaction.reply('later soon..');
    }
});

client.login(config.token);
