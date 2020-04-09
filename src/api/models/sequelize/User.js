"use strict";
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING,
            unique: true
        }
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

   
    return User;
};