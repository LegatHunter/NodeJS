const express = require("express");
const joi = require("joi");
const app = express();

const port = 3000;

const users = [];

let id = 0;

app.use(express.json());

const userScheme = joi.object({
  firstName: joi.string().min(5).required(),
  secondName: joi.string().min(5).required(),
  age: joi.number().min(5).max(90).required(),
  city: joi.string().min(2),
});

app.get("/users", (req, res) => {
  res.send({ users });
});

app.get("/users/:id", (req, res) => {
  res.send({ user: users.find((user) => user.id === +req.params.id) });
});

app.post("/users", (req,res) => {
  const result = userScheme.validate(req.body);
  if(result.error){
    return res.status(400).send(result.error.details);
  }
  id += 1;
  users.push({ id: id, ...req.body });
  res.send({ id });
});

app.put("/users/:id", (req, res) => {
  const result = userScheme.validate(req.body);
  if(result.error){
    return res.status(400).send(result.error.details);
  }
  const userId = +req.params.id;
  const user = users.find(user => user.id === userId);
  if(user){
    const {firstName, secondName, age, city} = req.body;
    user.firstName = firstName
    user.secondName = secondName;
    user.age = age;
    user.city = city;
    res.send({ user });
  }
  else {
    res.status(404);
    res.send({ user: null });
  }
});

app.delete("/users/:id", (req, res) => {
  const userId = +req.params.id;
  const user = users.find(user => user.id === userId);
  if(user){
    users.splice(users.indexOf(user), 1);
    res.send({ user });
  }
  else {
    res.status(404);
    res.send({ user: null });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
