"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.hasMany(models.Schedule, {
				foreignKey: "id_user",
				as: "schedule",
			});

			User.hasMany(models.Laporan, {
				foreignKey: "id_user",
				as: "laporan",
			});
		}
	}
	User.init(
		{
			nama: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			role: DataTypes.ENUM("admin", "pegawai"),
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};

