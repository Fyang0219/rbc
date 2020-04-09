"use strict";
module.exports = (sequelize, Sequelize) => {
  var Role = sequelize.define("Role", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    parent_id: {
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

  Role.associate = function(models) {
    Role.belongsToMany(models.User, { through: "role_user" });
  };
  return Role;
};