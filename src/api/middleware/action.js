const db = require('../../config/store/sequelize');


class PrmAction {

    constructor(name) {

        this.name = name;
    }

    async getByName() {
        let action = await db.Action.findOne({ where: { name: this.name } });
        return action;
        
    }

    async add(prm) {
        let createData = {
            name: this.name
        }
        

        return await db.Action.create(createData);

    }

    async setPrm(action,prm) {
        return await action.addPermissions(prm);
    }

    async removeByName() {
        return await db.Action.destory({ where: { name: this.name } });
    }




}

module.exports = PrmAction;