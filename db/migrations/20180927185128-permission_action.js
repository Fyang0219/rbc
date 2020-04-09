'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('role_permission_action', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			ActionId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
				  model: "Actions",
				  key: "id"
				}
			},
			PermissionId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: "Permissions",
					key: "id"
				}
			},
			RoleId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Roles",
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
					"role_permission_action",
					["ActionId", "PermissionId", "RoleId"],
					{
						indexName: 'rpa_association_unique',
						indicesType: 'UNIQUE'
					}
				);
			})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('role_permission_action');
	}
};
