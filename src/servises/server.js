const express = require('express');
const request = require('request');

const app = express();

const CLIENT_PORT = 3000

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `http://localhost:${CLIENT_PORT}`);
  next();
});

app.get('/:path', (req, res) => {

  request(
    { url: `https://test-api.techsee.me/api/ex/${req.params.path}` },
    (error, response, body) => {

      if(!response){
        return res.status(500)
      }
      else if (error || response.statusCode !== 200) {
        return res.status(response.statusCode).json({ type: 'error', message: error ? error.message: '' });
      }
      return res.json(body)
    }
  )
});

 const SERVER_PORT =  5000;
 app.listen(SERVER_PORT, () => console.log(`listening on ${SERVER_PORT}`));