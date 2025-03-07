const { Laporan } = require("../models");
const cloudinary = require("../middleware/cloudinary");
const fs = require("fs");

const getAllLaporan = async (req, res, next) => {
	try {
		const laporan = await Laporan.findAll();
		res.status(200).json({
			status: true,
			data: laporan,
			message: "success",
		});
	} catch (error) {
		next(error);
	}
};

const getLaporanById = async (req, res, next) => {
	const { id } = req.params;
	try {
		const laporan = await Laporan.findOne({ where: { id } });
		if (laporan) {
			return res.status(200).json({
				status: true,
				data: laporan,
				message: "success",
			});
		}
		res.status(404).json({ error: "Laporan not found" });
	} catch (error) {
		next(error);
	}
};

const getAllLaporanByUser = async (req, res, next) => {
	const { id } = req.params;
	try {
		const laporan = await Laporan.findAll({ where: { id_user: id } });
		if (laporan) {
			return res.status(200).json({
				status: true,
				data: laporan,
				message: "success",
			});
		}
		res.status(404).json({ error: "Laporan not found" });
	} catch (error) {
		next(error);
	}
};

const createLaporan = async (req, res, next) => {
	try {
		const {
			nama,
			mesin,
			line,
			deskripsi_kerusakan,
			tindakan,
			analisa,
			tanggal,
			stop_trouble,
			start_trouble,
		} = req.body;

		const user = req.user;
		const filePath = req.file.path;

		// Create laporan first
		const laporan = await Laporan.create({
			id_user: user.id,
			nama,
			mesin,
			line,
			deskripsi_kerusakan,
			tindakan,
			analisa,
			tanggal,
			stop_trouble,
			start_trouble,
		});

		// If create is successful, upload to cloudinary
		const result = await cloudinary.uploader.upload(filePath, {
			folder: "laporan",
		});

		// Update laporan with the image URL
		laporan.gambar = result.secure_url;
		await laporan.save();

		fs.unlinkSync(filePath);

		res.status(201).json({
			status: "success",
			data: laporan,
		});
	} catch (error) {
		if (req.file && fs.existsSync(req.file.path)) {
			fs.unlinkSync(req.file.path);
		}
		next(error);
	} finally {
		if (req.file && fs.existsSync(req.file.path)) {
			fs.unlinkSync(req.file.path);
		}
	}
};

const updateLaporan = async (req, res, next) => {
	try {
		const { id } = req.params;
		const {
			nama,
			mesin,
			line,
			deskripsi_kerusakan,
			tindakan,
			analisa,
			tanggal,
			stop_trouble,
			start_trouble,
		} = req.body;

		const laporan = await Laporan.findByPk(id);
		if (!laporan) {
			if (req.file && fs.existsSync(req.file.path)) {
				fs.unlinkSync(req.file.path);
			}
			return res.status(404).json({ message: "Laporan not found" });
		}

		let gambar = laporan.gambar;
		if (req.file) {
			const result = await cloudinary.uploader.upload(req.file.path, {
				folder: "laporan",
			});
			gambar = result.secure_url;

			const oldImagePublicId = laporan.gambar.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(`laporan/${oldImagePublicId}`);
		}

		await Laporan.update(
			{
				nama,
				mesin,
				line,
				deskripsi_kerusakan,
				tindakan,
				analisa,
				tanggal,
				stop_trouble,
				start_trouble,
				gambar,
			},
			{ where: { id } }
		);

		const updatedLaporan = await Laporan.findByPk(id);
		return res
			.status(200)
			.json({ updatedLaporan, message: "Laporan updated", status: "success" });
	} catch (error) {
		if (req.file && fs.existsSync(req.file.path)) {
			fs.unlinkSync(req.file.path);
		}
		next(error);
	}
};

const deleteLaporan = async (req, res, next) => {
	try {
		const { id } = req.params;
		const laporan = await Laporan.findByPk(id);

		if (!laporan) {
			return res.status(404).json({ message: "Laporan not found" });
		}

		const imagePublicId = laporan.gambar.split("/").pop().split(".")[0];
		await cloudinary.uploader.destroy(`laporan/${imagePublicId}`);

		await Laporan.destroy({ where: { id } });

		return res.status(200).json({
			status: "success",
			data: { message: "Laporan deleted successfully" },
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllLaporan,
	getLaporanById,
	createLaporan,
	updateLaporan,
	deleteLaporan,
	getAllLaporanByUser,
};
