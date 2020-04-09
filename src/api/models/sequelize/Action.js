

module.exports = function (sequelize, Sequelize) {

    var Action = sequelize.define("Action", {

        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        name: {
            allowNull: false,
            type: Sequelize.STRING,
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
    Action.associate = function (models) {
        Action.belongsToMany(models.Permission, { through: "role_permission_action" });
    };

    return Action;

};

