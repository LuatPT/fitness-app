'use strict';
const db = require('../controllers/db');
var Time = function (time) {
  this.name = time.name;
  this.time_check_in = time.time_check_in;
  this.time_check_out = time.time_check_out;
  this.update_by = "Admin";
};
Time.getAllTimes = (result) => {
  let sql = 'SELECT * FROM worktime';
  db.query(sql, (err, response) => {
    if (err) result(err, null);
    result(null, response);
  });
};
Time.createTime = (newTime, result) => {
  let sql = 'INSERT INTO worktime SET ?';
  db.query(sql, newTime, (err, response) => {
    if (err) result(err, null);
  });
};
Time.getDetailTime = (id, result) => {
  let sql = 'select * from worktime where worktime.id = ?';
  db.query(sql, id, (err, response) => {
    if (err) result(err, null);
    result(null, response);
  });
};
Time.deleteTime = (id, result) => {
  let sql = 'DELETE FROM worktime WHERE id = ?';
  db.query(sql, id, (err, response) => {
    if (err) result(err, null);
    result(null, id);
  });
};
Time.updateTime = (newTime, result) => {
  var sql = 'UPDATE worktime SET time_check_in = ? WHERE name = ?';
  db.query(sql, [newTime, newTime.name], (err, response) => {
    if (err) result(err, null);
    result(null, "OK");
  });
};

module.exports = Time;