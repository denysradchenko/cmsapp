const express = require('express');
const router = express.Router();
const trueLogin = 'admin';
const truePassword = '123456';
const Quiz = require('../models/quiz');

/* GET home page. */
router.get('/', (req, res) => {
  const quizData = new Quiz({
    questionTitle: 'What is Your name?'
  });

  quizData.save((err) => {
    console.log(err);
  });


  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res) => {
  if (req.session.admin === 1) {
    res.redirect('/admin');
    return;
  }
  res.render('login', { title: 'Signing in' });
});

router.get('/logout', (req, res) => {
  res.clearCookie('session');
  res.redirect('/login');
});

router.post('/login', (req, res) => {
  const { login, password } = req.body;

  if (login === trueLogin && password === truePassword) {
    req.session.admin = 1;
    res.redirect('/admin');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
