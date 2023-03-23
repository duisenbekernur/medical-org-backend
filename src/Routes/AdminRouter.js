const { Router } = require("express");
const isAdmin = require("../middlewares/isAdmin.js");
const isModerator = require("../middlewares/isModerator.js");
const {
  addNews,
  addMedicalOrganization,
  addRoute,
} = require("../controllers/AdminController.js");

const router = Router();

router.post("/add-news", isModerator, addNews);
router.post("/add-medical-organization", isAdmin, addMedicalOrganization);
router.post("/add-route", isAdmin, addRoute);

module.exports = router;
