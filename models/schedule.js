"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Schedule extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Schedule.belongsTo(models.User, {
				foreignKey: "id_user",
				as: "user",
			});
		}
	}
	Schedule.init(
		{
			id_user: DataTypes.INTEGER,
			mesin: DataTypes.STRING,
			tanggal_perbaikan: DataTypes.DATE,
			pic: DataTypes.STRING,
			status: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Schedule",
		}
	);
	return Schedule;
};

