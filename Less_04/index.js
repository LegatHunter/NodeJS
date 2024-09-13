const express = require("express");

const { idSchema, articleSchema } = require("./sheme");
const { checkBody, checkParams } = require("./validator");

const app = express();


const port = 3000;
const articles = [];
let uniqueID = 0;

app.use(express.json());

app.get("/articles", (req, res) => {
  res.send({ articles });
});

app.get("/articles/:id", checkParams(idSchema), (req, res) => {
  const article = articles.find(
    (article) => article.id === Number(req.params.id)
  );
  if (!article) {
    res.status(404);
    res.send({ article: null });
  } else {
    res.send({ article });
  }
});

app.post("/articles", checkBody(articleSchema), (req, res) => {
  uniqueID += 1;

  articles.push({ id: uniqueID, ...req.body });
  res.send({ id: uniqueID });
});

app.put("/articles/:id", checkParams(idSchema), checkBody(articleSchema), (req, res) => {
  const article = articles.find(
    (article) => article.id === Number(req.params.id)
  );
  if (!article) {
    res.status(404);
    res.send({ article: null });
  } else {
    article.title = req.body.title;
    article.content = req.body.content;

    res.send({ article });
  }
});

app.delete("/articles/:id", checkParams(idSchema), (req, res) => {
  const id = Number(req.params.id);
  const articleIndex = articles.findIndex((article) => article.id === id);
  if (articleIndex === -1) {
    res.status(404);
  } else {
    articles.splice(articleIndex, 1);
    res.sendStatus(204);
  }
});

app.use((req, res) => {
  res.status(404).send({
    message: "Страница не найдена",})
})

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
