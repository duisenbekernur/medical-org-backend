const jwt = require("jsonwebtoken");
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
    const { id } = req.body;

    const user = await Users.findOne({ where: { id } });

    if (!user) return res.json({ message: "Пользователь не найден" });

    if (user.isAdmin) return res.json({ message: "Ошибка доступа" });

    return res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      organization: user.organization,
      email: user.email,
    });
  } catch (error) {
    console.log("error get profile", error);
  }
};

const changeProfile = async (req, res) => {
  try {
    const { lastName, firstName, phone, email, organization } = req.body;

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.json({
        message: "Нету доступа",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await Users.findOne({ where: { id: decoded.id } });

    const newUser = await Users.update(
      {
        lastName: lastName !== undefined ? lastName : user.lastName,
        firstName: firstName !== undefined ? firstName : user.firstName,
        phone: phone !== undefined ? phone : user.phone,
        email: email !== undefined ? email : user.email,
        organization:
          organization !== undefined ? organization : user.organization,
      },
      { where: { id: decoded.id } }
    );
    return res.json({ message: "Успешно изменено" });
  } catch (error) {}
};

module.exports = {
  getAllNews,
  getAllBusses,
  getAllMedicalOrganizations,
  getProfileById,
  changeProfile,
};
