"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
	  return queryInterface.createTable("Permissions", {

		  id: {
			  primaryKey: true,
			  autoIncrement: true,
			  type: Sequelize.INTEGER,
			  allowNull: false
		  },

		  name: {
			  type: Sequelize.STRING
		  },
		  parent_id: {
			type: Sequelize.INTEGER
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


	  });
},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Permissions");
	}
};
