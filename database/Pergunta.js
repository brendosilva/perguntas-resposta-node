const Sequelize = require('sequelize');
const conection = require('./database');

const Pergunta = conection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false})
    .then(() => {
        console.log('tabela criada')
    })


module.exports = Pergunta;