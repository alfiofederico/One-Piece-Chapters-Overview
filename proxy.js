const express = require('express');
const request = require('request');
const baseApiUrl = 'https://onepiececover.com';

// we are using this small node js framework called express js
// https://expressjs.com/
const app = express();

// use is a middleware. this means it runs before a request your proxy receives from your website
// in the example below, the middleware adds the request header we need to fix the CORS issue
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// next(), see above, will call the get method on your proxy server route below
// this handles the requests you make to http://127.0.0.1:3000/api/chapters
// :number will get the chapter number from this url `${proxyUrl}/api/chapters/${number}` (see app.js)
app.get('/api/chapters/:number', (req, res) => {
  const urlPath = req.path;
  const requestURl = `${baseApiUrl}${urlPath}`;

  // request is a package that does the same thing you do with fetch in the browser window (see app.js)
  request({ url: requestURl }, (error, response, body) => {
    // this function here is a callback. it will return the data to your website
    //  once it receives it from the onepiececover api

    // if we receive an error from the api we forward it to our website
    if (error || response.statusCode !== 200) {
      return res.status(500).send({
        type: 'error',
        message: error.message,
        stack: error.stack
      });
    } else {
      // if we get the data from the api we forward it to our website
      return res.status(200).send(body);
    }
  });
});

// we start our server and we tell it to listen to port 3000
// this means in your dev app (see app.js file) you will make requests to
// http://localhost:3000/ or to http://127.0.0.1:3000/ instead of onepiececover.com
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
