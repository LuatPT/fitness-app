
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Cors must be put before route
app.use(cors());
let routes = require('./api/routes/appRoute.ts'); //importing route
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});

app.listen(port);

console.log('RESTful API server started on: ' + port);