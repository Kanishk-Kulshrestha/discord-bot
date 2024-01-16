const token = "PLACEHOLDER"//remove the placeholder and enter the token provided by the discord API
const keepAlive = require("./server")
const Discord = require('discord.js');
const bot = new Discord.Client();
const { Client, MessageAttachment } = require('discord.js');
const fs = require('fs');

let  data, data1, datag;
let msg, index, end;
const genre = ['action', 'adventure', 'cars', 'comedy', 'dementia', 'demons', 'mystery', 'drama', 'ecchi', 'fantasy', 'game', 'hentai', 'historical', 'horror', 'kids', 'magic', 'martial arts', 'mecha', 'music', 'parody', 'samurai', 'romance', 'school', 'sci-fi', 'shoujo', 'shoujo ai', 'shounen', 'shounen ai', 'space', 'sports', 'super power', 'vampire', 'yaoi', 'yuri', 'harem', 'slice of life', 'supernatural', 'military', 'police', 'psychological', 'thriller', 'seinen', 'josei']
let b = [];
let datagp = [];
let dataap = [];


for (let i=0; i<genre.length;i++){
  fs.readFile('./genre/'+genre[i]+'.txt', (err, daata) => {
      if (err) throw err;
      b.push('ff')
      b[i] = daata.toString().split('\n');
})
}
fs.readFile('./myFile.txt', (err, daata) => {
    if (err) throw err;

    data = daata.toString().split('\n')
})
fs.readFile('./Aposters.txt', (err, daata) => {
    if (err) throw err;

    dataap = daata.toString().split('\n')
})
fs.readFile('./myHile.txt', (err, daata) => {
    if (err) throw err;

    data1 = daata.toString().split('\n')
})
fs.readFile('./Hposters.txt', (err, daata) => {
    if (err) throw err;

    datag = daata.toString().split('\n')
})
for (let i=0; i<genre.length;i++){
  fs.readFile('./Gposters/'+genre[i]+'.txt', (err, daata) => {
      if (err) throw err;
      datagp.push('ff')
      datagp[i] = daata.toString().split('\n');
})
}

function f(a){
  for (let i =1; i<a.length ;i++){
    if (isNaN(a[i])===false){
      return a.slice(1,i).join(' ')
    }
  }
  return a.slice(1,a.length).join(' ');
}


function correction(s){
  if (s.indexOf("") > -1){
    s.splice(s.indexOf(""),1);
  }
  return s
}

function filter(sd){
  for(let k =0; k<sd.length;k++){
    if('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ '.includes(sd[k]) === false){
      sd = sd.replace(sd[k],' ')
    }
  }
  while(sd[sd.length-1]===' '){
    sd = sd.slice(0,sd.length-1)
  }
  return sd
}

function ranger(i,e,s){
  i = Number(i)
  e = Number(e)
  let str =String(i+1)+' : '+s[0]+'\n';
  if(e-i > 100){
    return 'Range is too long for me'
  }else if(i > e){
    return 'Starting Point is greater than Ending Point'
  }else if(i<0 || e<0){
    return 'Wrong Starting or Ending Poin'
  }
  for (let z=1;z<e+1-i;z++){
    str =str+String(i+z+1)+' : '+s[z]+'\n';
  }
  return str
}

bot.on('ready', () => {
	console.log('BOT GO, BRRRR')
  bot.user.setActivity(`with your Waifu | Use .helpme`, { type: "PLAYING" });
})


bot.on('message', async message => {
  if (!message.guild) return;
  if (message.content.toLowerCase()[0] === '.'){
    msg = correction(message.content.toLowerCase().split(' '));
    if(msg[0]==='.' && (msg[1] === 'suggest' || msg[1] === 'genre' || msg[1] === 'helpme')){
      msg[0] = '.'+msg[1];
      msg.splice(1,1);
    }
    if (msg[0] === '.suggest' || (msg[0] === '.' && msg[1] === 'suggest')){
      if (msg[1] === 'anime'){
        if(msg.length === 2){
          let l = Math.floor(Math.random()*(data.length));
          message.channel.send(data[l]+'\nRank: '+(l+1));
          if(datag.indexOf(dataap[l]) === -1 || message.channel.nsfw===true){
            message.channel.send(dataap[l]);
          }else if(message.channel.nsfw===false){
            message.channel.send('Cannot show poster, channel not allowed for NSFW content')
          }
        }else if(msg.length === 3){
          index = Number(msg[2]);
          if (index < data.length){
            message.channel.send(data[index-1])
            if(datag.indexOf(dataap[index-1]) === -1 || message.channel.nsfw===true){
              message.channel.send(dataap[index-1]);
            }else if(message.channel.nsfw===false){
              message.channel.send('Cannot show poster, channel not allowed for NSFW content')
            }
          }else{
            message.channel.send('Rank too high')
          }
        }else if(msg.length >= 4){
          index = Number(msg[2])-1;
          end = Number(msg[3]);
          if (index < data.length || end < data.length){
            message.channel.send(ranger(index, end, data.slice(index,end+1)))
          }else{
            message.channel.send('Range too high')
          }
        }
      }/*else if (msg[1] === 'hentai'){
        if(msg.length === 2){
          let l = Math.floor(Math.random()*(data1.length));
          message.channel.send(data1[l]+'\nRank: '+(l+1));
          message.channel.send(datag[l+1]);
        }else if(msg.length === 3){
          index = Number(msg[2]);
          message.channel.send(data1[index-1])
          message.channel.send(datag[index-1]);
        }else if(msg.length >= 4){
          index = Number(msg[2])-1;
          end = Number(msg[3]);
          message.channel.send(ranger(index, end, data1.slice(index,end+1)));
        }
      }*/else if (genre.indexOf(f(msg)) >= 0){
        if(msg.length === 2){
          let l = Math.floor(Math.random()*(b[genre.indexOf(f(msg))].length));
          message.channel.send(b[genre.indexOf(f(msg))][l]+'\nRank: '+(l+1));
          if(datag.indexOf(datagp[genre.indexOf(f(msg))][l]) === -1 || message.channel.nsfw===true){
            message.channel.send(datagp[genre.indexOf(f(msg))][l]);
          }else if(message.channel.nsfw===false){
            message.channel.send('Cannot show poster, channel not allowed for NSFW content')
          }
          
        }else if(msg.length >= 3 && msg.length - f(msg).split(' ').length === 2){
          index = Number(msg[2])-1;
          if (index < b[genre.indexOf(f(msg))].length){
            message.channel.send(b[genre.indexOf(f(msg))][index]);
            if(datag.indexOf(datagp[genre.indexOf(f(msg))][index]) === -1 || message.channel.nsfw===true){
              message.channel.send(datagp[genre.indexOf(f(msg))][index]);
          }else if(message.channel.nsfw===false){
            message.channel.send('Cannot show poster, channel not allowed for NSFW content')
          }
            
        }else{
          message.channel.send('Rank too high')
        }
        }else if(msg.length >= 4){
          index = Number(msg[2])-1;
          end = Number(msg[3]);
          if (index < b[genre.indexOf(f(msg))].length || end < b[genre.indexOf(f(msg))].length){
            message.channel.send(ranger(index, end, b[genre.indexOf(f(msg))].slice(index,end+1)));
          }else{
            message.channel.send('Range too high')
          }
        }
      }else{
        message.channel.send('Sorry, we don\'t serve this genre.');
      }
    }else if(msg[0] === '.genre'){
      message.channel.send("action\nadventure\ncars\ncomedy\ndementia\ndemons\nmystery\ndrama\necchi\nfantasy\ngame\nhentai\nhistorical\nhorror\nkids\nmagic\nmartial arts\nmecha\nmusic\nparody\nsamurai\nromance\nschool\nsci-fi\nshoujo\nshoujo ai\nshounen\nshounen ai\nspace\nsports\nsuper power\nvampire\nyaoi\nyuri\nharem\nslice of life\nsupernatural\nmilitary\npolice\npsychological\nthriller\nseinen\njosei");
    }else if(msg[0] === '.helpme'){
      message.channel.send('COMMANDS\n==============\n**\`.suggest\`** *\'Anime/<Genre>\' <Rank/starting Range of the rank> <Ending Range of the rank>*\n**Rank and Range are optional, but without Rank it will take a random Rank**\n\n**\`.genre\`**\n**Shows you the list of all the genre available**\n\n**\`.helpme\`**\n**Shows the same message you seeing right now**\n\nEXAMPLE\n================= .suggest anime 1\n.suggest comedy 1 10\n.genre\n\n\n Invite Link:- https://discord.com/oauth2/authorize?client_id=766962389928771585&scope=bot')
    }else{
      message.channel.send("Try \`.helpme\`")
    }
  }
});

keepAlive()
bot.login(token);
