import { config } from "dotenv";
import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import fs from "fs";
import settings from "./settings.json" assert { type: "json" };

const app = express();
config({ path: settings.dotenv_file_path });

// ~ express use() function to add third-party middleware
app.use(cors());
app.use(bodyparser.json());

// ~ HELPERS (FUNCTIONS)
// существует ли файл
function isFileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

// ~ ALL BREAKPOINTS

// Регистрация
app.post("/register", async function (req, res) {
  // Получаем username и password
  const { username, password } = req.body;
  // Если нет username или password
  if (!username || !password) {
    res.status(400).json({ message: "username and password are required" });
    return;
  }

  // Путь к файлу
  const filePath = `${__dirname}/data/users/${username}`;
  // Если такой пользователь уже есть
  if (isFileExists(filePath)) {
    res.status(401).json({ message: "user already exists" });
    return;
  }

  // Записываем пароль в файл
  fs.writeFile(filePath, password, (err) => {
    if (err) {
      res.status(500).json({ message: "internal server error" });
      return;
    }
    res.status(200).json({ message: "user created" });
  });
});

// Вход в аккаунт
app.post("/auth", async function (req, res) {
  // Получаем username и password
  const { username, password } = req.body;
  // Если нет username или password
  if (!username || !password) {
    res.status(400).json({ message: "username and password are required" });
    return;
  }
  // Читаем пароль из файла
  fs.readFile(`${__dirname}/data/users/${username}`, "utf-8", (err, data) => {
    // Если такого пользователя нет
    if (err) {
      res.status(401).json({ message: "user does not exist" });
      return;
    }
    // Сравниваем пароль
    const valid = data === password;
    res.status(valid ? 200 : 401).json({ message: valid });
  });
});

// Получить информацию о песне
app.get("/songs/:id/info", async function (req, res) {
  const id = req.params.id; // id трека
  // Получаем данные о треке
  const filePath = `${__dirname}/data/music/${id}.json`;
  // Читаем файл
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.status(404).json({ message: "song not found" });
      console.error(err);
      return;
    }
    res.status(206).json(JSON.parse(data));
  });
});

// Получить трек
app.get("/songs/:id/stream", async function (req, res) {
  // start - начальная позиция (in bytes)
  const start = parseInt(req.headers.range.replace(/\D/g, ""));
  if (typeof start !== "number") {
    res.status(404).json({ message: "Requires start" });
    console.log("start is not defined");
    return;
  }

  const id = req.params.id; // id трека

  const filePath = `${__dirname}/data/music/${id}.mp3`; // путь до файла
  const fileSize = fs.statSync(filePath).size; // получить данные о файле

  const CHUNK_SIZE = 10 ** 6; // размер кусочка (1 мб)
  const end = Math.min(start + CHUNK_SIZE, fileSize - 1); // bytes

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(filePath, { start, end });
  videoStream.pipe(res);
});

// Получить все возможные подборки
app.get("/compilations", async function (req, res) {
  // Путь к файлу
  const filePath = `${__dirname}/data/music/compilations/index.json`;
  // Читаем файл
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "internal server error" });
      console.error(err);
      return;
    }
    res.status(206).json(JSON.parse(data));
  });
});

// Получить подборку или названия подборок
app.get("/compilations/:title", async function (req, res) {
  // Получаем название подборки, если оно есть:
  const title = req.params.title;

  // Путь к файлу с подборкой
  const filePath = `${__dirname}/data/music/compilations/${title}.json`;

  // Читаем файл
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.status(404).json({ message: "compilation not found" });
      console.error(err);
      return;
    }
    res.status(206).json(JSON.parse(data));
  });
});

// Получить всех артистов
app.get("/artists", async function (req, res) {
  // Путь к файлу
  const filePath = `${__dirname}/data/music/artists/index.json`;
  // Читаем файл
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "internal server error" });
      console.error(err);
      return;
    }
    res.status(206).json(JSON.parse(data));
  });
});

// Получить информацию об артисте
app.get("/artists/:name", async function (req, res) {
  // Имя артиста
  const name = req.params.name;
  // Путь к файлу
  const filePath = `${__dirname}/data/music/artists/${name}.json`;
  // Читаем файл
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.status(404).json({ message: "artist not found" });
      console.error(err);
      return;
    }
    res.status(206).json(JSON.parse(data));
  });
});

// ~ START SERVER
app.listen(settings.port, () => {
  console.log(`Example app listening at http://localhost:${settings.port}`);
});
