const { Router } = require("express");
const { login, register } = require("../controllers/AuthController.js");
const isAdmin = require("../middlewares/isAdmin.js");

const router = Router();

router.post("/register",  register);
router.post("/login", login);

module.exports = router;
