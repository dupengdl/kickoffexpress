'use strict';

var Todo = require('../models/todo');

exports.create = function (params) {
  return new Promise(function (resolve, reject) {
    Todo.create(params, function (err, tag) {
      if (err) {
        return reject(err);
      }
      resolve(tag);
    });
  });
};

exports.findAllOfMine = function (params) {
  return new Promise(function (resolve, reject) {
    Todo.find(params).exec(function (err, todos) {
      if (err) {
        return reject(err);
      }
      resolve(todos);
    });
  });
};

exports.update = function (id, params) {
  return new Promise(function (resolve, reject) {
    Todo.findOneAndUpdate({_id: id}, {$set: params}, {'new': true}).exec(function (err, todo) {
      if (err) {
        return reject(err);
      }
      resolve(todo);
    });
  });
};

exports.delete = function (id) {
  return new Promise(function (resolve, reject) {
    Todo.remove({_id: id}).exec(function (err, todo) {
      if (err) {
        return reject(err);
      }
      resolve(todo);
    });
  });
};