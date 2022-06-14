'use strict';
module.exports = function (app) {
  let dataCtrl = require('../controllers/dataController');
  let timeCtrl = require('../controllers/timeController');
  // Input
  app
    .route('/api/v1/inputdata')
    .get(dataCtrl.get_all_datas)
    .post(dataCtrl.create_new_data);
  //data phải đặt tên đúng với dataController
  app
    .route('/api/v1/inputdata/:name')
    .get(dataCtrl.get_detail_data)
    .put(dataCtrl.update_data)
    .delete(dataCtrl.delete_data);

  //Time
  app
    .route('/api/v1/times')
    .get(timeCtrl.get_all_times)
    .post(timeCtrl.create_new_time);

  app
    .route('/api/v1/times/:id')
    .get(timeCtrl.get_detail_time)
    .put(timeCtrl.update_time)
    .delete(timeCtrl.delete_time);

}