const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
require('dotenv').config();

const api_key = process.env.API_KEY;

function get_team_info(summoner_name){
  axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner_name}?api_key=${api_key}`)
  .then(response => {
    let summoner = response.data;
    axios.get(`https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner.id}?api_key=${api_key}`)
    .then(response => {    
      console.log(response.data.participants)
    });
  });
}
//test
//get_team_info('vooby');


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

//client.login('NTQxNDU3NDAyNDQ5NjI1MDg4.Xdiw4A.iyYdkB38Wwn0HOjRWsnWICk83Ik');
