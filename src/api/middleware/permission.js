const db = require('../../config/store/sequelize');



class Permission {

    constructor(name) {

        this.name = name;
    }

    async getByName() {
        return await db.Permission.findOne({ where: { name: this.name } });
    }

    async add(parentId) {
        let createData = {
            name: this.name
        }
        if (parentId) {
            createData.parent_id = parentId;
        }

        return await db.Permission.create(createData);

    }

    async removeByName() {
        return await db.Permission.destory({ where: { name: this.name } });
    }




}

module.exports = Permission;