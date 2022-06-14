'use strict';
const db = require('../controllers/db.ts');
var Exercise = function (exercise) {
  this.name = exercise.name;
  this.exercise_check_in = exercise.exercise_check_in;
  this.exercise_check_out = exercise.exercise_check_out;
  this.update_by = "Admin";
};
Exercise.getAllExercises = (result) => {
  let sql = 'SELECT * FROM exercises';
  db.query(sql, (err, response) => {
    if (err) result(err, null);
    result(null, response);
  });
};
Exercise.createExercise = (newExercise, result) => {
  let sql = 'INSERT INTO exercises SET ?';
  db.query(sql, newExercise, (err, response) => {
    if (err) result(err, null);
  });
};
Exercise.getDetailExercise = (id, result) => {
  let sql = 'select * from exercises where exercises.id = ?';
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
Exercise.updateExercise = (newExercise, result) => {
  var sql = 'UPDATE exercises SET exercise_check_in = ? WHERE name = ?';
  db.query(sql, [newExercise, newExercise.name], (err, response) => {
    if (err) result(err, null);
    result(null, "OK");
  });
};

module.exports = Exercise;