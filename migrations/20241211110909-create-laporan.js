"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Laporans", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			id_user: {
				type: Sequelize.INTEGER,
			},
			nama: {
				type: Sequelize.STRING,
			},
			line: {
				type: Sequelize.STRING,
			},
			mesin: {
				type: Sequelize.STRING,
			},
			deskripsi_kerusakan: {
				type: Sequelize.TEXT,
			},
			tindakan: {
				type: Sequelize.TEXT,
			},
			gambar: {
				type: Sequelize.STRING,
			},
			analisa: {
				type: Sequelize.TEXT,
			},
			tanggal: {
				type: Sequelize.DATE,
			},
			stop_trouble: {
				type: Sequelize.STRING,
			},
			start_trouble: {
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
		await queryInterface.dropTable("Laporans");
	},
};

