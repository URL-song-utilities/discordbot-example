//Modules
const discord = require("discord.js");
const player = require("url-song-utilities");

//New <client>
const client = new discord.Client();

client.on("message", async message => {
    //If '<prefix>download' is typed
    if (message.content.startsWith("!download")) {
        //Retrieving message content
        let args = message.content.split(' ').slice(1);
        //The bot will need the fs module function to save the file
        const { createWriteStream } = require("fs");
        //The bot will search for the music
        await player.searchSong(args.join(" ")).then(async song => {
            await player.download(song.url).then(stream => {
                //Prevention message
                message.channel.send('Download in progress...');
                //The bot will download the file with the name it has found
                stream.pipe(createWriteStream('./download/' + song.title + '.mp3')).on('finish', () => {
                    //When the file will be downloaded the bot will send back a message
                    return message.channel.send('Music : ' + song.title + ' downloaded !');
                })
            })
        }).catch(err => {
            //If the module did not find the music it returns a error
            return message.channel.send('No music found !');
        })
    }
});

//Event ready
client.on("ready", () => { console.log("I'm ready !") });

//client login
client.login("XXX");
