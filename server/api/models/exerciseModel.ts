'use strict';
const db = require('../controllers/db.ts');
var Exercise = function (exercise) {
  // this.id = exercise.id;
  this.name = exercise.name;
  this.image = exercise.image;
  this.amount = exercise.amount;
  this.reps = exercise.reps;
  this.sets = exercise.sets;
};
Exercise.getAllExercises = (result) => {
  let sql = 'SELECT * FROM exercises';
  db.query(sql, (err, response) => {
    if (err) result(err, null);
    result(null, response);
  });
};
Exercise.createExercise = (newExercise, result) => {
  console.log(newExercise)
  let sql = 'INSERT INTO exercises SET ?';
  db.query(sql, newExercise, (err, response) => {
    if (err) result(err, null);
    result(null, response);
  });
};
Exercise.getDetailExercise = (id, result) => {
  let sql = 'SELECT * FROM exercises WHERE exercises.id = ?';
  db.query(sql, id, (err, response) => {
    if (err) result(err, null);
    result(null, response);
  });
};
Exercise.deleteExercise = (id, result) => {
  let sql = 'DELETE FROM exercises WHERE id = ?';
  db.query(sql, id, (err, response) => {
    if (err) result(err, null);
    result(null, id);
  });
};
Exercise.updateExercise = (newExercise, id, result) => {
  var sql = 'UPDATE exercises SET amount = ?, reps = ?, sets = ? WHERE id = ?';
  db.query(sql, [parseInt(newExercise.amount) ,parseInt(newExercise.reps),   parseInt(newExercise.sets), parseInt(id)], (err, response) => {
    if (err) result(err, null);
    result(null, "OK");
  });
};

module.exports = Exercise;