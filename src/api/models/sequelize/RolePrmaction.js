//var db = require("../../../config/sequelize");
//var Sequelize = require("Sequelize");

module.exports = function (sequelize, Sequelize) {

    var role_permission_action = sequelize.define("role_permission_action", {

        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        PermissionId: {
            type: Sequelize.INTEGER,
            unique: "rpa_association_unique"
        },
        ActionId: {
            type: Sequelize.INTEGER,
            unique: "rpa_association_unique"
        },
        RoleId: {
            type: Sequelize.INTEGER,
            unique: "rpa_association_unique"
        },


    }, {

            underscored: false,
            paranoid: true,
            freezeTableName: true,
            getterMethods: {
                formatId() {
                    return {
                        id: this.uid
                    }
                }

            }

        });

    role_permission_action.associate = function (models) {
        role_permission_action.belongsTo(models.Role, { sourceKey: "RoleId"});
        role_permission_action.belongsTo(models.Permission, { sourceKey: "PermissionId" });
        role_permission_action.belongsTo(models.Action, { sourceKey: "ActionId" });
    };

    return role_permission_action;

};

