// Урок 3. Модули и фреймворк Express (WIP)
// Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:

// — На каждой странице реализован счетчик просмотров
// — Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница
// — Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы
// — Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер.
// Подсказка:
// Вы можете сохранять файл в формате JOSN,
// где в объекте ключом будет являться URL страницы, а значением количество просмотров страницы

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

const pathToFile = path.join(__dirname, "person.json");

let obj;

if (fs.existsSync(pathToFile)) {
  const data = fs.readFileSync(pathToFile, "utf-8");
  obj = JSON.parse(data);
} else {
  obj = { home: 0, about: 0 };
  fs.writeFileSync(pathToFile, JSON.stringify(obj, null, 2));
}

app.get("/", (req, res) => {
  res.send(`<h1>Hello World!</h1>
      <a href='/about'>To about</a>
      <p>Вы зашли на эту страницу ${obj.home} раз(а)</p>
    `);

  obj.home += 1;

  fs.writeFileSync(pathToFile, JSON.stringify(obj, null, 2));
});

app.get("/about", (req, res) => {
  res.send(`<h1>Hello World!!!</h1>
      <a href='/'>Home</a>
      <p>Вы зашли на эту страницу ${obj.about} раз(а)</p>
    `);

  obj.about += 1;

  fs.writeFileSync(pathToFile, JSON.stringify(obj, null, 2));
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
