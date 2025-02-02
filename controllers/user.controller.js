const { User } = require("../models");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll();
		res.status(200).json({
			status: "success",
			data: users,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findOne({
			where: { id: id },
		});
		if (user) {
			return res.status(200).json(user);
		}
		res.status(404).json({ error: "User not found" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { nama, email, password, role } = req.body;

		const user = await User.findOne({ where: { id } });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		await User.update(
			{ nama, email, password: hashedPassword, role },
			{ where: { id } }
		);

		return res.status(200).json({
			status: "success",
			data: { message: "User updated successfully" },
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		const deleted = await User.destroy({
			where: { id: id },
		});
		if (deleted) {
			return res.status(204).send("User deleted");
		}
		throw new Error("User not found");
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

module.exports = {
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
};
