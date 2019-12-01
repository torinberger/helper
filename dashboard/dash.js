
setInterval(function () {
  axios
    .get('http://127.0.0.1:3000/status', {
      'Access-Control-Allow-Origin': '*'
    })
    .then((res) => {
      console.log(res.data);
      document.write(res.data);
    })
    .catch(console.log)
}, 10*1000);
