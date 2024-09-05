// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.

const http = require("http");
let mainCount = 1;
let aboutCount = 1;
let errorCount = 1;
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<a href = '/about'> Перейти на страницу обо мне</a>
      <p>Количество переходов = ${mainCount++}</p>`);
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<a href = '/'> Перейти на страницу главная</a>
      <p>Количество переходов = ${aboutCount++}</p>`);
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<h1>Страница 404</h1>
      <p>Количество переходов = ${errorCount++}</p>`);
  }
});

const port = "3000";

server.listen(port);
