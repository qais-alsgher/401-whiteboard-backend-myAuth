`use strict`;
require('dotenv').config();
const server = require('./server');
const { db } = require('./models/index');

// { force: true } used to delete all data from local db

db.sequelize.sync().then(() => {
    server.start(process.env.PORT || 3001);
}).catch(console.error);
