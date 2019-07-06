var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quizSchema = new Schema({
  questionTitle: { type: String, required: true, default: '' },
  answers: { type: Array, "default": [] }
});

module.exports = mongoose.model('Quiz', quizSchema)
