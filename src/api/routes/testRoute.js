const moment = require("moment");
const testController = require("../controllers/testController");
//const multer = require('multer');
//const upload = multer({ dest: 'uploads/' })
const fs = require('fs');



module.exports = (app) => {

    app.get('/getthis', testController.viewProject);

};
