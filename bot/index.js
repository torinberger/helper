
// load .env
require('dotenv').config()

// load dependencies
const Discord = require('discord.js');
const client = new Discord.Client();

var online = false

function catcher(msg, e) {
  if (msg) {
    msg.channel.send(`Error: \`${err}\``)
  }
  axios
    .post(`http://${process.env.LOCALIP}:3000/ping`, {
      name: 'Night Realm Bot',
      err: String(err)
    })
    .then((res) => {
      console.log('Error Report Sent!');
    })
    .catch((err) => {
      console.log(err);
    })
}

client.on('ready', () => {
  online = true
  axios
    .post(`http://${process.env.LOCALIP}:3000/ping`, {
      name: 'Night Realm Bot',
      deploy: `[${String(time).substr(0, 10)}] ${client.user.tag} Deployed!`
    })
    .then((res) => {
      console.log('Deploy Report Sent!');
    })
    .catch(console.log)

  setInterval(function () {
    if (online) {
      axios
        .post(`http://${process.env.LOCALIP}:3000/ping`, {
          name: 'Night Realm Bot'
        })
        .then((res) => {

        })
        .catch(console.log)
    }
  }, 15*1000);
})

client.on('message', (msg) => {

})

client.login(process.env.TOKEN); // login to discord
