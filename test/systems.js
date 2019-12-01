
const axios = require('axios');

axios
  .post('http://127.0.0.1:3000/ping', {
    name: 'Night Realm Bot'
  })
  .then(console.log)
  .catch(console.log)
