'use strict';
const Exercise = require('../models/exerciseModel.ts');
exports.get_all_exercises = (req, res) => {
  Exercise.getAllExercises((err, exercises) => {
    if (err) res.send(err);
    res.send(exercises);
  });
};
exports.create_new_exercise = (req, res) => {
  var new_exercise = new Exercise(req.body);
  Exercise.createExercise(new_exercise, (err, exercise) => {
    if (err) res.send(err);
  });
};
exports.get_detail_exercise = (req, res) => {
  Exercise.getDetailExercise(req.params.id, (err, exercise) => {
    if (err) res.send(err);
    res.send(exercise);
  });
};
exports.delete_exercise = (req, res) => {
  Exercise.deleteExercise(req.params.id, (err, exercise) => {
    if (err) res.send(err);
    res.json('Exercise have been deleted');
  });
};
exports.update_exercise = (req, res) => {
  Exercise.updateExercise(req.body, (err, exercise) => {
    if (err) res.send(err);
    res.json('Exercise have been updated');
  });
};