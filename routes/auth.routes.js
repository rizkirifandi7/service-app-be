const router = require("express").Router();

const { Login, Logout, Register } = require("../controllers/auth.controller");

router.post("/login", Login);
router.post("/register", Register);
router.get("/logout", Logout);

module.exports = router;
