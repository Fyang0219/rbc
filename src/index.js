const express = require('./config/express');
const http = require('http');
const config = require('./config/config');


(async () => {
    let app = await express();

    http.createServer(app).listen(config.server.httpPort);

    module.exports = app;
    console.log('Service running at ' + config.server.protocol + '://localhost:' + config.server.httpPort);


})();





