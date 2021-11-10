// load the envirinment varibales into node process object
require('dotenv').config();

const fs = require('fs');
const {Client, Collection, Intents} = require('discord.js');

const token = process.env['QR_BOT_TOKEN'];
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

// add commands to client
client.commands = new Collection(); 

// get list of supported commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); 

// load commands into client collection
for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);
}

// do this once when bot logs in
client.once('ready', ()=> {
    console.log('QR Bot has been logged in');
});

// dynamic command handler
client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply(
            {
                content: 'There was an error processing your command', 
                ephemeral: true
            });
    }
});

// login bot
client.login(token);