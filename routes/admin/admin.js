var express = require('express');
var router = express.Router();
var assert = require('assert');

var DB_OJ = require('../../db/dml/db_oj.js');
var DB_BLOG = require('../../db/dml/db_blog.js');
var sqlite3_oj = DB_OJ();
var sqlite3_blog = DB_BLOG();

var model_BLOG = require('../../db/model/blog_blog.js')();

// login required before access admin.
router.use(function(req, res, next) {
  var sess = req.session;
  if (!(sess.user && sess.user.author_name)) {
    var redirect = '';
    if('/login' !== req.originalUrl)
      redirect += '?redirect=' + req.originalUrl;
    res.redirect('/login' + redirect);
  } else {
    next();
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('admin/admin-index', { title: '闲记' });
  res.redirect('/admin/blog');
});

//******************************************
//* BLOG Module
//******************************************
router.get('/add-blog', function(req, res, next) {
  res.render('blog/admin-add_blog',{title: '新增博客-博客'});
});
router.post('/req-add_blog', function(req, res, next) {
  var title = req.body.blog_title,
      // sub_title = req.body.blog_sub_title,
      content = req.body.blog_content;
  if(!(title && content)) {
    return res.send({
      success: false,
      msg: 'Params Required.'
    });
  }
  var model_blog = model_BLOG();
  sqlite3_blog.inflateBlog(model_blog, req);
  model_blog.blog_add_time = Date.now();
  
  sqlite3_blog.addBlog(model_blog, function (err) {
    // err occurs
    if (err) {
      return res.send({
        success: false,
        msg: err.toString()
      });
    }
    // success
    res.send({
      success: true,
      msg: '添加成功！'
    });
  });
});

router.get('/blog', function(req, res, next) {
  sqlite3_blog.getRecordAll(function(err, blogs) {
    if(err) {
      return next(err);
    }
    blogs.forEach(function(item, index) {
      if(item.blog_anchor)
          item.blog_content = item.blog_content.substr(0, item.blog_anchor);
    });
    res.render('blog/admin-blogs', {title: '首页-博客', blogs: blogs});
  });
});

router.get('/blog-detail', function(req, res, next) {
  // ?id=12
  var blog_id = req.query.id;
  assert(blog_id);
  
  sqlite3_blog.getRecordById(blog_id, function(err, blog) {
    if(err) {
      return next(err);
    }
    res.render('blog/admin-blog_detail', {title: '博客详情-博客', blog: blog});
  });
});
router.post('/req-update-blog', function(req, res, next) {
  var blog_id = req.body.id;
  assert(blog_id);
  var model_blog = model_BLOG();
  sqlite3_blog.inflateBlog(model_blog, req);
  
  sqlite3_blog.updateBlog(model_blog, function(err) {
    if(err) return next(err);
    res.send({
      success: true,
      msg: '修改成功'
    }).end();
  });
});
router.delete('/req-delete_blog', function(req, res, next) {
  var blog_id = req.body.id;
  assert(blog_id);
  sqlite3_blog.deleteBlogByID(blog_id, function(err) {
    if(err) return next(err);
    res.send({
      success: true,
      msg: '删除成功!'
    }).end();
  })
});

//******************************************
//* Issues
//******************************************
router.get('/issues', function(req, res, next) {
  sqlite3_oj.getIssueAll(function(err, issues) {
    if(err) return next(err);
    
    res.render('admin/admin-issues', {
      title: '反馈列表',
      issues: issues 
    });
  });
});
module.exports = router;
