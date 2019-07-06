const express = require('express');
const router = express.Router();
const trueLogin = 'admin';
const truePassword = '123456';

/* GET home page. */
router.get('/', (req, res) => {
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
