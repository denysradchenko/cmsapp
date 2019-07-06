const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');
var config = require('../config');

/* GET home page. */
router.get('/', (req, res) => {
  const show = req.session.vote !== 1;

  Quiz.findById(config.actualQuizId, (err, data) => {
    const { questionTitle, answers } = data;
    const summ = answers.reduce((acc, cur) => acc + cur.votes, 0)

    res.render('quiz', { title: 'Quiz', questionTitle, answers, show, summ });
  });
});

router.post('/', (req, res) => {
  const answerIndex = parseInt(req.body.answer);

  Quiz.findOne({ _id: config.actualQuizId }, (err, data) => {
    const answers = [...data.answers]
    answers[answerIndex].votes += 1;
    Quiz.update({ _id: config.actualQuizId }, { answers }, (err) => {
      req.session.vote = 1;
      res.redirect('/quiz');
    })
  });
});

module.exports = router;
