// ROUTES
const express = require('express');
const Animal = require('./models/Animal');
const app = express();

app.use(express.json());

app.post('/api/v1/animals', (req, res, next) => {
  Animal
    .insert(req.body)
    .then((animal) => res.send(animal))
    .catch(next);
});

app.get('/api/v1/animals/:id', (req, res, next) => {
  Animal
    .findById(req.params.id)
    .then(animal => res.send(animal))
    .catch(next);
});

app.put('/api/v1/animals/:id', (req, res, next) => {
  Animal
    .update(req.params.id, req.body)
    .then(animal => res.send(animal))
    .catch(next);
});

app.delete('/api/v1/animals/:id', (req, res, next) => {
  Animal
    .deleteById(req.params.id)
    .then(animal => res.send(animal))
    .catch(next);
});

module.exports = app;
