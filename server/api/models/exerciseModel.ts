"use strict";
const db = require("../controllers/db.ts");
var Exercise = function (exercise) {
  // this.id = exercise.id;
  this.name = exercise.name;
  this.image = exercise.image;
  this.amount = exercise.amount;
  this.reps = exercise.reps;
  this.sets = exercise.sets;
  this.user_name = exercise.user_name;
  this.code = exercise.code;
  this.create_at = exercise.create_at;
};
Exercise.getAllExercises = (result) => {
  const sql = "SELECT * FROM exercises";
  db.query(sql, (err, response) => {
    if (err) result(err, null);
    result(null, response);
  });
};

Exercise.getExercisesByDate = (createAt, result) => {
  console.log(createAt);
  const sql = "SELECT * FROM exercises WHERE exercises.create_at = ?";
  db.query(sql, createAt, (err, response) => {
    if (err) result(err, null);
    result(null, response);
  });
};

Exercise.getExercisesAnalytics = (code, result) => {
  const sql =
    "SELECT * FROM exercises WHERE exercises.code = ? ORDER BY exercises.create_at";
  db.query(sql, code, (err, response) => {
    if (err) result(err, null);
    result(null, response);
  });
};

Exercise.createExercise = (newExercise, result) => {
  const sql = "INSERT INTO exercises SET ?";
  db.query(sql, newExercise, (err, response) => {
    if (err) result(err, null);
    result(null, response);
  });
};
Exercise.getDetailExercise = (id, result) => {
  const sql = "SELECT * FROM exercises WHERE exercises.id = ?";
  db.query(sql, id, (err, response) => {
    if (err) result(err, null);
    result(null, response);
  });
};
Exercise.deleteExercise = (id, result) => {
  const sql = "DELETE FROM exercises WHERE id = ?";
  db.query(sql, id, (err, response) => {
    if (err) result(err, null);
    result(null, id);
  });
};
Exercise.updateExercise = (newExercise, id, result) => {
  const sql =
    "UPDATE exercises SET amount = ?, reps = ?, sets = ? WHERE id = ?";
  db.query(
    sql,
    [
      parseInt(newExercise.amount),
      parseInt(newExercise.reps),
      parseInt(newExercise.sets),
      parseInt(id),
    ],
    (err, response) => {
      if (err) result(err, null);
      result(null, "OK");
    }
  );
};

module.exports = Exercise;
