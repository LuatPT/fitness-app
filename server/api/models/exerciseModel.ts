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
  this.codes = exercise.codes;
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
  const sql = "SELECT * FROM exercises WHERE exercises.create_at = ?";
  db.query(sql, createAt, (err, response) => {
    if (err) result(err, null);
    result(null, response);
  });
};

Exercise.getExercisesAnalytics = (params, result) => {
  console.log(params);
  const sql =
    "SELECT * FROM exercises WHERE (exercises.create_at BETWEEN ? AND ?) AND exercises.codes = ? ORDER BY exercises.create_at";
  db.query(
    sql,
    [params.dateRange[0], params.dateRange[1], params.codes],
    (err, response) => {
      if (err) result(err, null);
      console.log(response);
      result(null, response);
    }
  );
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
