import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, CommandInteraction, Interaction } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log('Innoverse Bot is now online !');

  const commands = [
    new SlashCommandBuilder()
      .setName('readme')
      .setDescription('Show discord server rules')
      .toJSON(),
  ];

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN as string);

  (async () => {
    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(
        Routes.applicationGuildCommands(client.user?.id || '', process.env.GUILD_ID as string),
        { body: commands }
      );

      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  })();
});

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const command = interaction.commandName;

  if (command === 'readme') {
    await interaction.reply({
      content: '### The rules of discord server:\n1. Be respectful to moderators and others\n2. No spam or no ads on the server\n3. No overly violent or NSFW content\n4. No fight',
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_TOKEN).catch((error) => {
  console.error('Failed to start the Innoverse Bot:', error);
});
