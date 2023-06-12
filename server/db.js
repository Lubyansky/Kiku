const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'kiku',
    'postgres',
    '63947',
    {
        dialect: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        logging: false
    }
)