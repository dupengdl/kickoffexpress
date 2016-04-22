/**
 * TODO表结构
 */

var mongoose = require('mongoose');
var lastMod = require('../utils/mongoose-lastmod');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  text: {type: String, default:''},
  complete: {type: Boolean, default: false},
  created: {type: Date, default: Date.now},
  author: {type: Schema.Types.ObjectId, ref: 'User'}
});

TodoSchema.index({text: 1});

TodoSchema.plugin(lastMod);

module.exports = mongoose.model('Todo', TodoSchema);
