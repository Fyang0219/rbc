'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('role_user', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			RoleId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
				  model: "Roles",
				  key: "id"
				}
			},
			ResourceId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			LevelName: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			UserId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "Users",
					key: "id"
				}
			},

			deletedAt: {
				type: Sequelize.DATE
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
			.then(() => {
				return queryInterface.addIndex(
					"role_user",
					["RoleId", "UserId"],
					{
						indexName: 'ru_association_unique',
						indicesType: 'UNIQUE'
					}
				);
			})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('role_user');
	}
};
