const Sequelize = require('sequelize');
const db = 'perguntas';
const user = 'root';
const password = '';

const conection = new Sequelize(db, user, password, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = conection; 