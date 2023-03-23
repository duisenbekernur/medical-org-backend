const { News, MedicalOrganizations, Routes } = require("../models/Models.js");

const addNews = async (req, res) => {
  try {
    const { image, text } = req.body;

    if (!image || !text) return res.json({ message: "Не все поля заполнены" });

    const time = new Date().toISOString();

    const news = await News.create({ image, text, time });

    return res.status(200).json({ message: "Успешно", news });
  } catch (error) {
    console.log("add news error", error);
  }
};

const deleteNews = async (req, res) => {
  try {
    const { id } = req.body;
    const isExist = await News.findOne({
      where: { id },
    });
    if (!isExist) {
      return res.json({
        message: "Новости с таким айди не существует",
      });
    }

    await News.destroy({
      where: {
        id,
      },
    });

    res.json({ message: "Успешно удалено!" });
  } catch (error) {}
};

const updateNews = async (req, res) => {
  try {
    const { text, image, id } = req.body;

    const currentNews = await News.findOne({ where: { id } });

    await News.update(
      {
        text: text !== undefined ? text : currentNews.text,
        image: image !== undefined ? image : currentNews.image,
      },
      { where: { id } }
    );

    return res.json({ message: "Успешно изменено" });
  } catch (error) {}
};

const addMedicalOrganization = async (req, res) => {
  try {
    const { name, city, phone } = req.body;

    if (!name || !city || !phone)
      return res.json({ message: "Не все поля заполнены" });

    const isExist = await MedicalOrganizations.findOne({ where: { name } });
    if (isExist)
      return res.json({ message: "Такая организация уже существует" });

    const organization = await MedicalOrganizations.create({
      name,
      city,
      phone,
    });

    return res.status(200).json({ message: "Успешно", organization });
  } catch (error) {
    console.log("add organization  error", error);
  }
};

const addRoute = async (req, res) => {
  try {
    const { name, image, stops } = req.body;

    // проверка на существование маршрута
    const isExist = await Routes.findOne({ where: { name } });
    if (isExist) return res.json({ message: "Такой маршрут уже существует" });

    const route = await Routes.create({ name, image, stops });

    return res.status(200).json({ message: "Успешно", route });
  } catch (error) {
    console.log("error adding route", error);
  }
};

module.exports = {
  addNews,
  addMedicalOrganization,
  addRoute,
  deleteNews,
  updateNews,
};
