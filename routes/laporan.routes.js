const router = require("express").Router();

const {
	getAllLaporan,
	getAllLaporanByUser,
	getLaporanById,
	createLaporan,
	updateLaporan,
	deleteLaporan,
} = require("../controllers/laporan.controller");

const upload = require("../middleware/multer");
const authenticateJWT = require("../middleware/verifyToken");

router.get("/", getAllLaporan);
router.get("/user/:id", getAllLaporanByUser);
router.get("/:id", getLaporanById);
router.post("/", authenticateJWT, upload.single("gambar"), createLaporan);
router.put("/:id", upload.single("gambar"), updateLaporan);
router.delete("/:id", deleteLaporan);

module.exports = router;
