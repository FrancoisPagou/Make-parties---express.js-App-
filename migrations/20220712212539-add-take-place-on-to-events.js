'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn('Events', 'takesPlaceOn', { type: Sequelize.DATE, allowNull: true });
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.removeColumn('Events', 'takesPlaceOn');
	},

  addColumn: () => {},
  removeColumn: () => {}
};
