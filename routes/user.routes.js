const router = require("express").Router();

const {
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
} = require("../controllers/user.controller");
const authenticateJWT = require("../middleware/verifyToken");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
