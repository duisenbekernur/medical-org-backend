const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const sequelize = require("./src/utils/db.js");
const { syncTables } = require("./src/models/Models.js");

// импорт роутов
const UserRoutes = require("./src/routes/UserRouter.js");
const AuthRoutes = require("./src/routes/AuthRouter.js");
const AdminRoutes = require("./src/routes/AdminRouter.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// роуты
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/admin", AdminRoutes);

// синхронизировать таблицы с бд
// syncTables();

// запуск сервера
app.listen(8888, () => console.log("Server started on port 8888"));
