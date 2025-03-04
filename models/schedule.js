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
			line: DataTypes.STRING,
			mesin: DataTypes.TEXT,
			kerusakan: DataTypes.TEXT,
			maintenance: DataTypes.TEXT,
			tanggal: DataTypes.DATE,
			pic: DataTypes.STRING,
			status: DataTypes.STRING,
			overtime: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Schedule",
		}
	);
	return Schedule;
};

