"use strict";
module.exports = (sequelize, Sequelize) => {
    const role_user = sequelize.define("role_user", {
        RoleId: {
            type: Sequelize.INTEGER,
            unique: "ru_association_unique",
        },
        UserId: {
            type: Sequelize.INTEGER,
            unique: "ru_association_unique",
        },
        ResourceId: {
            type: Sequelize.INTEGER,
        },
        LevelName: {
            type: Sequelize.INTEGER,
        }
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
    role_user.associate = function (models) {
        role_user.belongsTo(models.Role);
    };
    return role_user;
};