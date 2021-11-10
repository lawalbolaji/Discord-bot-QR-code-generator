const googleAPI = require('./../externalAPIs/googleQR');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('qr')
        .setDescription('Generates QR code for the url provided')
        .addStringOption(option => option.setName('url').setDescription('url to be encoded'))
        .addStringOption(option => option.setName('height').setDescription('height of QR in pixels'))
        .addStringOption(option => option.setName('width').setDescription('width of QR in pixels'))
        .addStringOption(option => option.setName('color').setDescription('color of QR'))
        ,
    async execute(interaction){
        const url = interaction.options.getString('url');
        const height = interaction.options.getString('height');
        const width = interaction.options.getString('width');
        const color = interaction.options.getString('color');

        await interaction.reply(googleAPI.generateQR(url, height, width, color));
    }
};