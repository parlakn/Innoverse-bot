const { Client, GatewayIntentBits, SlashCommandBuilder, PresenceUpdateStatus, ActivityType } = require('discord.js');
const config = require('./config.json');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

client.once('ready', (c) => {
    console.log(`${c.user.tag} has been started successfully on the discord server !`);
    console.log(`source code of bot => https://github.com/InnoverseTeam/Innoverse-bot`);

    const status = client.user.setPresence({
        status: 'online',
        activities: [{
            name: "Innoverse",
            type: ActivityType.Streaming,
            url: "https://innoverse.alwaysdata.net",
            state: "https://discord.gg/PzVmgwCB"
        }]
    });
    
    const helpCommand = new SlashCommandBuilder()
        .setName('help')
        .setDescription('help command');
    
    const testCommand = new SlashCommandBuilder()
        .setName('test')
        .setDescription('test command');

    const rulesCommand = new SlashCommandBuilder()
        .setName('rules')
        .setDescription('for discord server rules !');

    const githubCommand = new SlashCommandBuilder()
        .setName('github')
        .setDescription('this is github from InnoverseTeam !');
    
    const guildId = '1236344772331831428'; 
    const commands = [helpCommand.toJSON(), testCommand.toJSON(), rulesCommand.toJSON(), githubCommand.toJSON()];
    
    client.guilds.cache.get(guildId)?.commands.set(commands)
        .then(() => console.log(''))
        .catch(console.error);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'help') {
        await interaction.reply('/test (test message).');
        await interaction.reply('/hello (for say hello to me).');
        await interaction.reply('/github (for go to our github project).');
    } else if (commandName === 'test') {
        await interaction.reply('test');
    } else if (commandName === 'rules') {
        await interaction.reply(`
            @everyone
            \n**Server Rules:**\n
            1. Be respectful to others.\n
            2. No spamming.\n
            3. Respect other users and admins.\n
            4. No homophobic or racist remarks.\n
            5. If you don't like the project, instead of criticizing, just leave the server.\n
            6. Remember that RubyNetwork sucks.\n
            
            \n😺 **Then enjoy on this server :3.**`);
    } else if (commandName == 'github') {
        await interaction.reply('https://github.com/InnoverseTeam');
    }
});

client.login(config.token);

client.login(config.token).catch(err => {
    console.error('Error when the bot started :', err);
});
