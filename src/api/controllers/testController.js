const config = require('../../config/config');
const moment = require('moment');
const uniqid = require('uniqid');

function setResHeader(res) {
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Date", moment().toISOString());
    res.setHeader("Last-Modified", moment().toISOString());

    return res;
}

module.exports = {

    /**
     * view a project
     * @param req 
     * @param res 
     * @param next 
     */
    async viewProject(req, res, next) {
        console.log('called here');
        return true;
    }
};

