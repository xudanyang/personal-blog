var express = require('express');
var router = express.Router();
var DB_BLOG = require('../../db/dml/db_blog.js');
var sqlite3_blog = DB_BLOG();

router.get('/', function(req, res, next) {
  var uuid = req.query.uuid;
  if(!uuid)
    sqlite3_blog.getRecordAll(function(err, blogs) {
      if(err) {
        return next(err);
      }
      
      blogs.forEach(function(item, index) {
        if(item.blog_anchor)
          item.blog_content = item.blog_content.substr(0, item.blog_anchor);
      });
      res.render('blog/user-blogs', {title: '首页-博客', blogs: blogs});
    });
  else {
    
  }
});

module.exports = router;