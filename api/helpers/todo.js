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
  })
};

exports.update = function (id, params) {
  return new Promise(function (resolve, reject) {
    Todo.update({_id: id}, {$set: params}).exec(function (err, todo) {
      if (err) {
        return reject(err);
      }
      resolve(todo);
    });
  });
};

