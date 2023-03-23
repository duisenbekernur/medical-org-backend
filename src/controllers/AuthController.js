const { Users, Employee } = require("../models/Models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// регистрация
const register = async (req, res) => {
  try {
    const {
      email,
      password,
      lastName,
      firstName,
      isAdmin,
      phone,
      organization,
      isModerator,
    } = req.body;

    if (
      !email ||
      !password ||
      !lastName ||
      !firstName ||
      !organization ||
      !phone
    ) {
      return res.json({ message: "Заполните все поля" });
    }

    // проверка email
    const isExist = await Users.findOne({ where: { email } });
    if (isExist) return res.json({ message: "Email уже зарегистрирован" });

    // зашифровать пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      email,
      password: hashedPassword,
      lastName,
      firstName,
      isAdmin,
      organization,
      phone,
      isModerator: isAdmin || isModerator,
    });

    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Ошибка регистрации" });
  }
};

// логин
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // поиск юзера
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Неправильный пароль" });
    }

    // access token
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
        isModerator: user.isModerator,
      },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Ошибка при логин" });
  }
};

module.exports = { login, register };
