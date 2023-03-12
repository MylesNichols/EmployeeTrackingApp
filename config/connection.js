const sequelize = require('sequelize');

require('dotenv').config();

const sequilize = new sequelize(process.env.DB_NAME, process.env.DB_UBER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
});

sequilize.authenticate()
.then(() => console.log('database connection established!'))
.catch((error) => console.log('Unable to connecct to database'));

module.exports = sequelize;