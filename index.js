`use strict`;
require('dotenv').config();
const server = require('./server');
const { db } = require('./models/index');

db.sequelize.sync().then(() => {
    server.start(process.env.PORT || 3001);
}).catch(console.error);
