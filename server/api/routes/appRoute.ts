"use strict";
module.exports = function (app) {
  let exerciseCtrl = require("../controllers/exerciseController.ts");

  //Time
  app
    .route("/api/v1/exercises")
    .get(exerciseCtrl.get_all_exercises)
    .post(exerciseCtrl.create_new_exercise);

  app.route("/api/v1/exercisesByDate").get(exerciseCtrl.get_exercises_by_date);

  app
    .route("/api/v1/exercises/:id")
    .get(exerciseCtrl.get_detail_exercise)
    .put(exerciseCtrl.update_exercise)
    .delete(exerciseCtrl.delete_exercise);
};
