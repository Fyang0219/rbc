const config = require("./config");
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const bodyParser = require("body-parser");
const yaml = require('yamljs');
const path = require('path');
const AC = require('../api/middleware/ac');
const db = require('../config/store/sequelize');
const umzug = require('./umzug');
const testController = require('../api/controllers/testController');
const router = express.Router();



module.exports =  async () => {
    let app = express();

    if (process.env.NODE_ENV === "development") {
        app.use(morgan("dev"));

    }
    app.use(cors());


    // run db migration
    if (process.env.NODE_ENV != "test") {
        try {
            await umzug.createDbAndMigrate();
        } catch (err) {
            console.log(err);
        }

    }


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const ac = new AC(1);

    await ac.create(
        {
            roles: ['manager', 'user', 'projectLead','projectParticipant', 'reporter', 'assignee'],
            permissions: {
                task: ['assignUser', 'unassignUser', 'unassignOwn','create', 'mark', 'delete', 'assignProjectParticiptant'],
                project: ['create','viewAssign','viewAll', 'inviteUser','removeUser'],
                organization: ['inviteUser', 'removeUser'],
            },
            operations: {
                user: ['inviteUser_organization', 'create_project','viewAssign_project'],
                assignee: ['unassignOwn_task', 'assignProjectParticiptant_task'],
                projectParticipant: ['inviteUser_project', 'create_task'],
                reporter: ['assignee', 'delete_task', 'mark_task'],
                projectLead: ['projectParticipant', 'delete_task', 'removeUser_project', 
                'assignUser_task', 'removeUser_task', 'mark_task'],
                manager: ['user', 'removeUser_organization', 'viewAll_project',
                 'inviteUser_project','removeUser_project', 'assignUser_task', 'unassignUser_task'],
            },
        }
    )
    await db.User.create({name:'feiyang'});
    await ac.add('projectLead', 'project', 12)
    await ac.add('manager', 'organization', 2)
    await ac.add('projectParticipant', 'project', 99)
    //await ac.acScope();

    app.get('/viewProject', async (req,res,next) => { 
        await ac.acScope()
        next()
    }, testController.viewProject);
        
        
    return app;
    
};
