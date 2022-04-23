require('./models/User'); //import User from model
require('./models/Track');
const express = require('express'); //express require
const mongoose = require('mongoose'); //mongoose require
const bodyParser = require('body-parser'); //body-parser to read json data
const authRoutes = require('./routes/authRoutes'); //route
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express(); //assgin a app so that we can use one
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  'mongodb+srv://admin:1Su7AUClN5ACmbLB@cluster0.xkogb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; //mongo url
mongoose.connect(mongoUri); // connect to db

mongoose.connection.on('connected', () => {
  console.log('Connected');
});

mongoose.connection.on('error', (err) => {
  console.log('Error connecting to DB', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
