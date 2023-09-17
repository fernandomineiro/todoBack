const db = require("../models");
const Todo = db.todos;

exports.create = (req, res) => {

  if (!req.body.name) {
    res.status(400).send({ message: "Esse campo não pode ser vazio!" });
    return;
  }

  const todo = new Todo({
    name: req.body.name,
    color: req.body.color,
    favorite:  false
  });

  todo
    .save(todo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "erro!"
      });
    });
};


exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Todo.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "erro."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  Todo.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Não foi encontrado com " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error" });
    });
};


exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Campo vazio!"
    });
  }

  const id = req.params.id;

  Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Id não encontrado!`
        });
      } else res.send({ message: "Todo atualizado." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Id não encontrado`
        });
      } else {
        res.send({
          message: "Todo atualizado!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "error" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Todo.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Todos atualizado com sucesso!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error."
      });
    });
};
