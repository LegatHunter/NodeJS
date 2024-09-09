const express = require('express');


const app = express();

app.get('/', (req, res) => {
  res.send(`<h1>Hello World!</h1><a href = '/about'>To about</a>`)
})

app.get('/about', (req, res) => {
  res.send(`<h1>Hello World!!!</h1><a href = '/'>Home</a>`)
})

app.listen(3000)