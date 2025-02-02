const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const Login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(400).json({
				status: "failed",
				message: "Invalid email or password",
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({
				status: "failed",
				message: "Invalid email or password",
			});
		}

		const payload = {
			id: user.id,
			nama: user.nama,
			email: user.email,
			role: user.role,
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "6h",
		});

		return res.status(200).json({
			status: "success",
			data: { token },
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const Register = async (req, res) => {
	try {
		const { nama, email, password, role } = req.body;
		if (await User.findOne({ where: { email } })) {
			return res.status(400).json({
				status: "failed",
				message: "Email already exists",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		await User.create({ nama, email, password: hashedPassword, role });

		return res.status(200).json({
			status: "success",
			data: { message: "User created successfully" },
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const Logout = (req, res) => {
	return res.status(200).json({
		status: "success",
		message: "Logout success",
	});
};

module.exports = {
	Login,
	Logout,
	Register,
};
