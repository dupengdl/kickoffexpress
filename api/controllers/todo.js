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
 * author: 所属人
 */
exports.add = function (req, res) {
  var text = req.body.text;

  todoHelper.create({
    text: text,
    author: req.user._id
  }).then(function (todo) {
    handler.send(res, todo);
  }).catch(function (err) {
    var msg = '服务器连接失败，请稍后重试';

    handler.handleError(res, msg);
  });
};

/**
 * 更新todo(编辑文本或更改状态)
 * 请求类型：PUT
 * id todoId
 * text todo文本
 * completed 完成标记
 */
exports.update = function (req, res) {
  var id = req.params.todoId;
  var text = req.body.text;
  var completed = req.body.completed;
  var param = Object.assign({},
    (typeof text != 'undefined') ? {text: text} : {},
    (typeof completed != 'undefined') ? {completed: completed} : {}
  );

  todoHelper.update(id, param).then(function (todo) {
    handler.send(res, todo);
  }).catch(function (err) {
    var msg = '服务器连接失败，请稍后重试';
    handler.handleError(res, msg);
  });
};

/**
 * 删除todo
 * 请求类型：DELETE
 * id todoId
 */
exports.delete = function (req, res) {
  var id = req.params.todoId;

  todoHelper.delete(id).then(function (todo) {
    handler.send(res, todo);
  }).catch(function (err) {
    var msg = '服务器连接失败，请稍后重试';

    handler.handleError(res, msg);
  });
};