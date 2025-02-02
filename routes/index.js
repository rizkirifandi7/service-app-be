const router = require("express").Router();

const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const laporanRoutes = require("./laporan.routes");
const scheduleRoutes = require("./schedule.routes");

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/laporan", laporanRoutes);
router.use("/schedule", scheduleRoutes);

module.exports = router;
