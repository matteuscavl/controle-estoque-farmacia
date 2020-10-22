const Sequelize = require('sequelize');
const connection = require('../../database/database');

const Cliente = connection.define('cliente', {
    nomeCliente: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    telefone: {
        type: Sequelize.STRING,
        allowNull: false, 
    }
})

Cliente.sync({fore: true});
module.exports = Cliente;