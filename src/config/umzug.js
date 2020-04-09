
const Sequelize = require('sequelize');
const Umzug = require('umzug');
const path = require('path');
const db = require("../config/store/sequelize");
const mysql = require('mysql2/promise');
const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = require(__dirname + '/../config/sequelize')[env];
const AC = require('../api/middleware/ac');

module.exports = {

    async createDbAndMigrate() {
        let connection = await mysql.createConnection({ host: sequelizeConfig.host,user: sequelizeConfig.username, password: sequelizeConfig.password });
        let query = 'CREATE DATABASE IF NOT EXISTS `' + sequelizeConfig.database + '`;';
        await connection.query(query);
        const umzug = new Umzug({
            migrations: {
                // indicates the folder containing the migration .js files
                path: path.join(__dirname, '/../../db/migrations'),
                // inject sequelize's QueryInterface in the migrations
                params: [
                    db.sequelize.getQueryInterface(),
                    db.Sequelize
                ]
            },
            storage: 'sequelize',
            storageOptions: {
                sequelize: db.sequelize
            }
        })
            ; await (async () => {
                // checks migrations and run them if they are not already applied
                try {
                    await umzug.up()
                    
                    console.log('All migrations performed successfully')
                } catch (err) {
                    console.log(' Migrations error :', err);
                }

            })()
    }

};
