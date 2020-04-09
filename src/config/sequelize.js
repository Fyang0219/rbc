module.exports = {
    development: {
        username: process.env.DBUSERNAME || 'root',
        password: process.env.USERPASS || 'feiyang0219',
        database: process.env.DBNAME || 'rbc',
        host: process.env.DBHOST || '192.168.99.101',
        port: process.env.DBPORT || '3306',
        logging: false,
        dialect: "mysql"
    },
    test: {
        username: process.env.DBUSERNAME || "root",
        password: process.env.USERPASS || "feiyang0219",
        database: process.env.DBNAME || "rbc-test",
        host: process.env.DBHOST || "192.168.99.101",
        port: process.env.DBPORT || "3306",
        logging: false,
        dialect: "mysql"
    },
    production: {
        username: process.env.DBUSERNAME || "root",
        password: process.env.USERPASS || "feiyang0219",
        database: process.env.DBNAME || "rbc-prd",
        host: process.env.DBHOST || "192.168.99.101",
        port: process.env.DBPORT || "3306",
        logging: false,
        dialect: "mysql"
    }
};