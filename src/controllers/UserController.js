const {
  News,
  Routes,
  MedicalOrganizations,
  Users,
} = require("../models/Models.js");

const getAllNews = async (req, res) => {
  try {
    const news = await News.findAll();

    return res.status(200).json(news);
  } catch (error) {
    console.log("get news error", error);
  }
};

const getAllBusses = async (req, res) => {
  try {
    const busses = await Routes.findAll();

    return res.status(200).json(busses);
  } catch (error) {
    console.log("get routes error", error);
  }
};

const getAllMedicalOrganizations = async (req, res) => {
  try {
    const organizations = await MedicalOrganizations.findAll();

    return res.status(200).json(organizations);
  } catch (error) {
    console.log("get organizations error", error);
  }
};

const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findOne({ where: { id } });

    if (!user) return res.json({ message: "Пользователь не найден" });

    if (user.isAdmin) return res.json({ message: "Ошибка доступа" });

    return res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      organization: user.organization,
    });
  } catch (error) {
    console.log("error get profile", error);
  }
};

module.exports = {
  getAllNews,
  getAllBusses,
  getAllMedicalOrganizations,
  getProfileById,
};
