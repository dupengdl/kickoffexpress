/**
 * Todo路由
 */
var todoHelper = require('../helpers/todo');
var handler = require('../utils/handler');
var rtn = require('../utils/rtn');

/**
 * 获取登录用户的所有todo
 */
exports.index = function (req, res) {
  var author = req.user._id;

  if (author) {
    todoHelper.findAllOfMine({author: author}).then(function (todos) {
      handler.send(res, todos);
    }).catch(function (err) {
      handler.handleError(res, 'server error');
    });
  } else {
    handler.handleError(res, 'user cannot be found');
  }
};

/**
 * 添加todo
 * 请求类型：POST
 * text: todo内容
 * complete: 完成标记
 */
exports.add = function (req, res) {
  var text = req.body.text;
  var complete = req.body.complete;

  todoHelper.create({
    text: text,
    complete: complete,
    author: req.user._id
  }).then(function (tag) {
    handler.send(res, tag);
  }).catch(function (err) {
    var msg = '服务器连接失败，请稍后重试';

    handler.handleError(res, msg);
  });
};

/**
 * 更新todo(标记完成或未完成)
 * 请求类型：PUT
 * id: todoid
 * complete: 完成标记
 */
exports.update = function (req, res) {
  var id = req.params.todoId;
  var complete = req.body.complete;

  todoHelper.create({
    id: id,
    complete: complete
  }).then(function (tag) {
    handler.send(res, tag);
  }).catch(function (err) {
    var msg = '服务器连接失败，请稍后重试';
    handler.handleError(res, msg);
  });
};