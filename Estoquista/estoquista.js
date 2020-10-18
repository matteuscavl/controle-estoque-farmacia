const Sequelize = require('sequelize');
const connection = require('../database/database');
const Produto = require('../Produto/produto');

const Estoquista = connection.define('estoquistas', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    email: {
        type: Sequelize.STRING, 
        allowNull: false,
    }, 

    chaveEstoque: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    senhaEstoque: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

Estoquista.belongsTo(Produto)
// Estoquista.sync({force: true});
module.exports = Estoquista;