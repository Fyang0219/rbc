const Role = require('./role')
const db = require('../../config/store/sequelize');
const Permission = require('./permission');
const PrmAction = require('./action');
const isEmpty = require('lodash/isEmpty');




class AC {

    constructor(userId) {

        this.userId = userId;
    }

    async can(action, permission, resourceId ) {

    }

    // create base on params 
    async create(params) {
        try {
            await Promise.all([
                this.createRoles(params.roles),
                this.createPermissions(params.permissions)
            ])
        } catch (err) {
            console.log(err);
        }
        

        // connect permission action with role 
        if (params.operations) {
            await this.giveActions(params.operations);
        }

        return true; 
        
    }

    // create roles for application
    async createRoles(roles) {
        try {
            await Promise.all([
                roles.map(async (roleName) => {
                    let role = new Role(roleName);

                    // check if role already exist
                    let roleModel = await role.getByName(roleName);
                    if (!roleModel) {
                        try {
                            // add role
                            await role.add();
                        } catch (err) {
                            console.log(err);
                        }
                    }
                        
                })
            ])
        } catch (err) {
            console.log(err);
        }
        

        return true;
    }

    // create permission and action in storage
    async createPermissions(permissions) {
        let permissionNames= Object.keys(permissions);

        for (const prmName of permissionNames) {
                let permission = new Permission(prmName);
                let prm = await permission.getByName(prmName);
                if (!prm) {
                    prm = await permission.add();
                }
                
                for (const actionName of permissions[prmName]) {
                    let action = new PrmAction(actionName);
                    let actionModel = await action.getByName(actionName);
                    if (!actionModel) {
                        await action.add(prm);
                    } 
                }
                    
        }

        return true;
        
    }

    // give role a serie of permission actions
    async giveActions(actions) {
        let roles = Object.keys(actions);
        await Promise.all([
            roles.map(async (roleName) =>{
                let baseRole = new Role(roleName);
                let baseRoleModel = await baseRole.getByName();
                // add prm action to role
                actions[roleName].map(async (actionName) => {
                    // check if grant action is a child role
                    if (actionName.indexOf('_') == -1) {
                        let role = new Role(actionName);
                        await role.update(baseRoleModel.id);
                    
                    } else { // add role to prm action
                        await this.giveAction(baseRoleModel, actionName);
                    }
                })


            })
        ])

    }

    // give a role one set of permission action
    async giveAction(roleModel, prmAction) {

        let arr = prmAction.split('_');
        let actionName = arr[0];
        let prmName = arr[1];

        let action = new PrmAction(actionName);
        let prm = new Permission(prmName);
        let [actionModel, prmModel] = await Promise.all([
            await action.getByName(),
            await prm.getByName()
        ])

        // create role_permission_action table role_id field to link role with prmAction
        let createData = {
            RoleId: roleModel.id,
            PermissionId: prmModel.id,
            ActionId: actionModel.id
        }
        try {
            let exist = await db.role_permission_action.findOne({where: createData});
            if (!exist) {
                await db.role_permission_action.create(createData)
            }
            
        } catch (err) {
            console.log(err);
        }
        

        return true;
    }

    // add a user role 
    /**
     * add a role to a user with corresponding resource and level 
     * @param {string} name given role name
     * @param {string} levelName role level name
     * @param {int} resourceId role attached resource id
     */
    async add( roleName, levelName, resourceId) {

        let role = await db.Role.findOne({ where: { name: roleName } });
        let createObj = {
            UserId: this.userId,
            RoleId: role.id, 
            LevelName: levelName, 
            ResourceId: resourceId
        };

        
        let exist = await db.role_user.findOne({where:createObj});
        if (!exist) {
            return db.role_user.create({
                UserId: this.userId,
                RoleId: role.id,
                LevelName: levelName,
                ResourceId: resourceId
            });
        } else {
            console.log(' user role already exist');
            return false;
        }
        
    }

    // remove a role from user
    async remove(roleName, levelId, resourceId) {
        let role = await db.Role.findOne({ where: { name: roleName } });
        return db.role_user.destory({
            UserId: this.userId,
            RoleId: role.id,
            LevelId: levelId,
            ResourceId: resourceId
        });
    }

    // get user permission scope 
    async acScope() {
        let userRoles = await db.role_user.findAll({where: {userId: this.userId}})
        let scope = {};
        for (const userRole of userRoles) {

            // trace through role self referece to get all prm actions 
            const roleInfos = await this.traceHierarchy(userRole.RoleId);
            for (let i = 0; i < roleInfos.length; i++) {
                if (roleInfos[i] in scope) {
                    let resourceIds = scope[roleInfos[i]];
                    resourceIds.push('under ' + userRole.LevelName + ' ' + userRole.ResourceId)
                } else {
                    scope[roleInfos[i]] = ['under ' + userRole.LevelName + ' ' +userRole.ResourceId]
                }
            }
        }
        console.log(scope);
        return scope;
        
    }

    // trace user role permission hierarchy
    async traceHierarchy(roleId) {
        const result = [];
            
        // find all role actions
        let userPrmActions = await db.role_permission_action.findAll(
            {
                where: { RoleId: roleId},
                attributes: ["id"],
                include: [{ model: db.Permission, attributes: ["name"] }, { model: db.Action, attributes: ["name"]}]
            }
        )

        // add action to result
        for (let i = 0; i < userPrmActions.length; i++) {
            result.push(userPrmActions[i].Action.name + ' ' + userPrmActions[i].Permission.name)
        }

        // if hierarchy continue else return final result
        let notEndOfTrace = await db.Role.findOne(
            {
                where: { parent_id: roleId}
            }
        )
        if (notEndOfTrace) {
            return result.concat(await this.traceHierarchy(notEndOfTrace.id));
        } else {
            return result;
        }
    }

    

    async can(userId, operation, resourceId) {
        let can = await this.storage.get
    }

    async hasRole(roleName) {
        return this.roleName;
    }

    async getAllPrm() {

    }





}

module.exports = AC;