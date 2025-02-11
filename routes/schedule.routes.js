const router = require("express").Router();

const {
	getAllSchedule,
	getAllScheduleByUser,
	getScheduleById,
	createSchedule,
	updateSchedule,
	deleteSchedule,
} = require("../controllers/schedule.controller");


const authenticateJWT = require("../middleware/verifyToken");

router.get("/", getAllSchedule);
router.get("/user", authenticateJWT, getAllScheduleByUser);
router.get("/:id", getScheduleById);
router.post("/", authenticateJWT, createSchedule);
router.put("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);

module.exports = router;
	