/* eslint-disable camelcase */
const models = require("../models");

const browse = (req, res) => {
  models.practician
    .findAll()
    .then(([result]) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.practician
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const {
    adeli_number,
    password,
    firstname,
    lastname,
    mail,
    administrator_id,
  } = req.body;
  const { id } = req.params;

  models.practician
    .update({
      adeli_number,
      password,
      firstname,
      lastname,
      mail,
      administrator_id,
      id,
    })
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const {
    adeli_number,
    password,
    firstname,
    lastname,
    mail,
    administrator_id,
  } = req.body;

  models.practician
    .insert({
      adeli_number,
      password,
      firstname,
      lastname,
      mail,
      administrator_id,
    })
    .then(([result]) => {
      if (result.affectedRows) {
        res.status(201).json({
          id: result.insertId,
          adeli_number,
          password,
          firstname,
          lastname,
          mail,
          administrator_id,
        });
      } else {
        res.sendStatus(400);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.administrator
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
