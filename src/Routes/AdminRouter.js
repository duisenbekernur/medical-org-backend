const { Router } = require("express");
const isAdmin = require("../middlewares/isAdmin.js");
const isModerator = require("../middlewares/isModerator.js");
const {
  addNews,
  addMedicalOrganization,
  addRoute,
  deleteNews,
  updateNews,
} = require("../controllers/AdminController.js");

const router = Router();

router.post("/add-news", isModerator, addNews);
router.post("/add-medical-organization", isAdmin, addMedicalOrganization);
router.post("/add-route", isAdmin, addRoute);

router.delete("/delete-news", isModerator, deleteNews);
router.put("/update-news", isModerator, updateNews);

module.exports = router;
