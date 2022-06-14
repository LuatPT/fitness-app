'use strict';
const Time = require('../models/timeModel');
exports.get_all_times = (req, res) => {
  Time.getAllTimes((err, times) => {
    if (err) res.send(err);
    res.send(times);
  });
};
exports.create_new_time = (req, res) => {
  var new_time = new Time(req.body);
  Time.createTime(new_time, (err, time) => {
    if (err) res.send(err);
  });
};
exports.get_detail_time = (req, res) => {
  Time.getDetailTime(req.params.id, (err, time) => {
    if (err) res.send(err);
    res.send(time);
  });
};
exports.delete_time = (req, res) => {
  Time.deleteTime(req.params.id, (err, time) => {
    if (err) res.send(err);
    res.json('Time have been deleted');
  });
};
exports.update_time = (req, res) => {
  Time.updateTime(req.body, (err, time) => {
    if (err) res.send(err);
    res.json('Time have been updated');
  });
};