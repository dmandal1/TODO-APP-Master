const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(env.MONGO, {
    useNewUrlParser: true,
    useCreateIndex: true
});
const db = mongoose.connection;

// check if there is any error

db.on('error', err => {
    console.log('Error while connecting to database', err);
});

db.once('open', () => {
    console.log('Mongo database connected');
});

module.exports = db;
