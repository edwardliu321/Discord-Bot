const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
require('dotenv').config();

const api_key = process.env.API_KEY;
const discord_token = process.env.DISCORD_TOKEN;

async function summoner_by_name(summoner_name){
  let summoner_response = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner_name}?api_key=${api_key}`);
  return summoner_response.data;
}

async function team_info(summoner_name){
  let summoner = await summoner_by_name(summoner_name);
  let spec = await axios.get(`https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner.id}?api_key=${api_key}`);
  console.log(spec.data.participants);
}

async function summoner_info(summoner_name){
  let summoner = await summoner_by_name(summoner_name);
  "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/test"
  let info = await axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?api_key=${api_key}`);

  console.log(info.data);
}
//test
summoner_info('IvanJYang');


//client
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // inside a command, event listener, etc.
  
});

client.on('message', msg => {
  if (msg.content.startsWith('/test')) {
    const exampleEmbed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Some title')
    .setURL('https://discord.js.org/')
    .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
    .setDescription('Some description here')
    .setThumbnail('https://i.imgur.com/wSTFkRM.png')
    .addField('Regular field title', 'Some value here')
    .addBlankField()
    .addField('Inline field title', 'Some value here', true)
    .addField('Inline field title', 'Some value here', true)
    .addField('Inline field title', 'Some value here', true)
    .setImage('https://i.imgur.com/wSTFkRM.png')
    .setTimestamp()
    .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

    console.log(client.channels);
    msg.channel.send(exampleEmbed);
  }
});

//client.login(discord_token);
