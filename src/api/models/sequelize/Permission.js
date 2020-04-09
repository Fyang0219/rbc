//var db = require("../../../config/sequelize");
//var Sequelize = require("Sequelize");

module.exports = function (sequelize, Sequelize) {

    var Permission = sequelize.define("Permission", {

        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        parent_id: {
            type: Sequelize.INTEGER
        },

    }, {

            underscored: false,
            paranoid: true,
            getterMethods: {
                formatId() {
                    return {
                        id: this.uid
                    }
                }

            }

        });
    
    Permission.associate = function (models) {
        Permission.belongsToMany(models.Action, { through: "role_permission_action" });
    };
    return Permission;

};

