"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Schedules", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			id_user: {
				type: Sequelize.INTEGER,
			},
			line: {
				type: Sequelize.STRING,
			},
			mesin: {
				type: Sequelize.TEXT,
			},
			kerusakan: {
				type: Sequelize.TEXT,
			},
			maintenance: {
				type: Sequelize.TEXT,
			},
			tanggal: {
				type: Sequelize.DATE,
			},
			pic: {
				type: Sequelize.STRING,
			},
			status: {
				type: Sequelize.STRING,
			},
			overtime: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Schedules");
	},
};

