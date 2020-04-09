const db = require('../../config/store/sequelize');



class Role {

    constructor(name) {

        this.name = name;
    }

    async getByName() {
        return await db.Role.findOne({where: {name:this.name}});
    }

    async add() {
        let createData = {
            name: this.name
        }

        return await db.Role.create(createData);

    }

    async update(parentId) {
        let updateData = {
            parent_id:parentId
        }

        return await db.Role.update(updateData, {where: {name: this.name}})
    }

    async removeByName() {
        return await db.Role.destory({where: {name: this.name}});
    }




}

module.exports = Role;
