"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Laporan extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Laporan.belongsTo(models.User, {
				foreignKey: "id_user",
				as: "user",
			});
		}
	}
	Laporan.init(
		{
			id_user: DataTypes.INTEGER,
			nama: DataTypes.STRING,
			line: DataTypes.STRING,
			mesin: DataTypes.STRING,
			deskripsi_kerusakan: DataTypes.TEXT,
			tindakan: DataTypes.TEXT,
			gambar: DataTypes.STRING,
			analisa: DataTypes.TEXT,
			tanggal: DataTypes.DATE,
			start_trouble: DataTypes.STRING,
			stop_trouble: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Laporan",
		}
	);
	return Laporan;
};

