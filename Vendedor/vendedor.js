const Sequelize = require('sequelize');
const connection = require('../database/database');
const Produto = require('../Produto/produto');

// Criando tabela
const Vendedor = connection.define('vendedores', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    }, 

    email: {
        type: Sequelize.STRING,
        allowNull: false,   
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Vendedor.belongsTo(Produto)
// Vendedor.sync({force: true});
module.exports = Vendedor