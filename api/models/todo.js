/**
 * TODO表结构
 */

var mongoose = require('mongoose');
var lastMod = require('../utils/mongoose-lastmod');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  text: {type: String, default:''},
  completed: {type: Boolean, default: false},
  created: {type: Date, default: Date.now},
  author: {type: Schema.Types.ObjectId, ref: 'User'}
});

TodoSchema.index({created: 1});

TodoSchema.plugin(lastMod);

// Duplicate the ID field.
TodoSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
TodoSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Todo', TodoSchema);
