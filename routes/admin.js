const express = require('express');
const router = express.Router();
const News = require('../models/news');

router.all('*', (req, res, next) => {
  if (req.session.admin !== 1) {
    res.redirect('/login');
    return;
  }

  next();
})

/* GET home page. */
router.get('/', (req, res) => {

  const data = News.find({}, (err, data) => {

    res.render('admin/index', { title: 'Admin', data });
  });

});

router.get('/news/add', (req, res) => {
  res.render('admin/news-form', { title: 'Add news' });
});

router.post('/news/add', (req, res) => {
  const { title, description } = req.body;
  const newsData = new News({ title, description });
  const errors = newsData.validateSync();

  newsData.save((err) => {
    if (err) return res.render('admin/news-form', {
      title: 'Add news',
      addNews: true,
      err: true,
      errors,
      msg: 'Something went wrong. Please try once more!',
      actualTitle: title,
      actualDescription: description
    });
    res.render('admin/news-form', { title: 'Add news', addNews: true, err: false, errors, msg: 'Your news was added successfully!' });
  });
});

router.get('/news/delete/:id', (req, res) => {
  News.findByIdAndDelete(req.params.id, (err) => {
    res.redirect('/admin');
  })
});

module.exports = router;
