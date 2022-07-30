'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('Events', 'imgUrl', { type: Sequelize.STRING, allowNull: true });
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('Events', 'imgUrl');
	},

  addColumn: () => {},
  removeColumn: () => {}
};

