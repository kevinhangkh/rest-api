require('dotenv').config(); //use environment variables in .env file

const express = require('express');
const app = express();
const mongoose = require('mongoose').set('debug', true);;

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to database'));

app.listen(3000, 'localhost', () => console.log('Listening on port 3000...'));

app.use(express.json()); //allow JSON format inside requests

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);
