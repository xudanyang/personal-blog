var express = require('express');
var router = express.Router();

var assert = require('assert');

var DB_OJ = require('../../db/dml/db_oj.js');
var DB_BLOG = require('../../db/dml/db_blog.js');
var model_issue = require('../../db/model/oj_issue.js')
var sqlite3_oj = DB_OJ();
var sqlite3_blog = DB_BLOG();

// var redis = require('redis');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('user/index', { title: 'Home' });
  res.redirect('/blog');
});

router.get('/contact_adm', function (req, res, next) {
  res.render('user/contact_me.jade', {
    title: '给我留言'
  })
});
router.post('/req_contact_adm', function (req, res, next) {
  var issue = req.body.issue;
  var nick_name = req.body.nick_name;
  var o_issue = model_issue(nick_name, issue);
  if(!issue) {
    return res.send({
      success: false,
      msg: '内容不能为空@_@'
    }).end();
  }
  //TODO: add to db
  sqlite3_oj.addIssue(o_issue, function(err) {
    if(err){
      next(err);
      return;
    }
    res.send({
      success: true,
      msg: '收到~'
    }).end();
  });
});

//******************************************
//* BLOG
//******************************************
router.get('/blog-detail', function(req, res, next) {
  // ?id=12
  var blog_id = req.query.id;
  assert(blog_id);
  
  sqlite3_blog.getRecordById(blog_id, function(err, blog) {
    if(err) {
      return next(err);
    }
    if(blog)
      res.render('blog/user-blog_detail', {title: blog.blog_title + '-博客', blog: blog});
    else {
      res.render('blog/user-blog_detail', {title: 'Empty Record', blog: blog});
    }
  });
});
module.exports = router;
