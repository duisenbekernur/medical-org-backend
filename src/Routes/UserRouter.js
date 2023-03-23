const { Router } = require("express");
const { login, register } = require("../controllers/AuthController.js");
const {
  getAllNews,
  getAllBusses,
  getAllMedicalOrganizations,
  getProfileById,
} = require("../controllers/UserController.js");
const checkAuth = require("../middlewares/checkAuth.js");

const router = Router();

router.get("/news", checkAuth, getAllNews);
router.get("/busses", checkAuth, getAllBusses);
router.get("/organizations", checkAuth, getAllMedicalOrganizations);
router.post("/profile/", checkAuth, getProfileById);

module.exports = router;
