const { Schedule } = require("../models");

const getAllSchedule = async (req, res) => {
	try {
		const schedule = await Schedule.findAll();
		res.status(200).json({
			data: schedule,
			status: "success",
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getAllScheduleByUser = async (req, res) => {
	const user = req.user;

	try {
		const schedule = await Schedule.findAll({
			where: { id_user: user.id },
		});
		res.status(200).json({
			data: schedule,
			status: "success",
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getScheduleById = async (req, res) => {
	const { id } = req.params;
	try {
		const schedule = await Schedule.findOne({
			where: { id: id },
		});
		if (schedule) {
			return res.status(200).json({
				data: schedule,
				status: "success",
			});
		}
		res.status(404).json({ error: "Schedule not found" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const createSchedule = async (req, res) => {
	try {
		const user = req.user;
		const { line, mesin, kerusakan, tanggal, pic, status, maintenance } =
			req.body;

		const schedule = await Schedule.create({
			id_user: user.id,
			line,
			mesin,
			kerusakan,
			tanggal,
			pic,
			status,
			maintenance,
		});
		res.status(201).json({
			data: schedule,
			status: "success",
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateSchedule = async (req, res) => {
	try {
		const { id } = req.params;
		const { line, mesin, kerusakan, tanggal, pic, status, maintenance } =
			req.body;

		const schedule = await Schedule.findOne({ where: { id } });

		if (!schedule) {
			return res.status(404).json({ message: "Schedule not found" });
		}

		await Schedule.update(
			{
				line,
				mesin,
				kerusakan,
				tanggal,
				pic,
				maintenance,
				status,
			},
			{ where: { id } }
		);

		const updatedSchedule = await Schedule.findOne({ where: { id } });

		return res.status(200).json({
			status: "success",
			data: updatedSchedule,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const deleteSchedule = async (req, res) => {
	try {
		const { id } = req.params;
		const schedule = await Schedule.findByPk(id);

		if (!schedule) {
			return res.status(404).json({ message: "Schedule not found" });
		}
		await Schedule.destroy({ where: { id } });

		return res.status(200).json({
			status: "success",
			data: { message: "Schedule deleted successfully" },
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllSchedule,
	getAllScheduleByUser,
	getScheduleById,
	createSchedule,
	updateSchedule,
	deleteSchedule,
};
