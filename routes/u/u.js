var express = require('express');
var router = express.Router();

var assert = require('assert');
var crypto = require('crypto');

var DB_BLOG = require('../../db/dml/db_blog.js');
var model_user = require('../../db/model/blog_user.js');

var sqlite3_blog = DB_BLOG();

router
//******************************************
//* GET FNs
//******************************************
  .get('/login', function (req, res, next) {
    res.render('login', { title: '登陆' });
  })
  .get('/info/:id', function(req, res, next) {
    var session = req.session;
    res.render('u/index', {isAdmin: (session && session.user), title: '用户信息'})
  })
  .get('/getinfo', function(req, res, next) {
    var sess = req.session;
    if (!(sess.user && sess.user.author_name)) {
      res.send({
        isLogin: false,
      }).end();
      return;
    }
    res.send({
      isLogin: true,
      userName: sess.user.author_name
    }).end();
  })
  .get('/logout', function(req, res, next) {
    // uuid = req.query.uuid;
    if(req.session && req.session.user) {
        req.session.destroy();
        return res.send({
          success: true,
          msg: '登出成功.'
        }).end();
    }
    
    res.send({
      success: false,
      msg: 'User Offline!'
    }).end();
  })
  
//******************************************
//* Post FNs
//******************************************
  .post('/login', function(req, res, next) {
    var user = model_user();
    var uname = req.body.uname,
      upass = req.body.upass,
      uuid = req.query.uuid;
    if (uuid) {
      sqlite3_blog.getUserByUUID(uuid, function (err, record) {
        if(err) {
          next(err);
          return;
        }
        
        if (!record) {
          res.send({
            success: false,
            msg: 'Invalid UUID.'
          }).end();
        } else {
          // 实例化user
          sqlite3_blog.infalte(record, user);
          //set session
          req.session = user;
        }
      });
      return res.send({
        success: true,
        msg: ''
      }).end();
    }
    if (!(uname && upass)) {
      return res.send({
        success: false,
        msg: '未完成表单.'
      }).end();
    }
    
    sqlite3_blog.getUserByName(uname, function(err, record) {
      if(err) {
        return next(err);
      }
      if(!record) {
        return res.send({
          success: false,
          msg: '没有此用户.'
        }).end();
      }
      var req_upass_sha256 = crypto.createHash('sha256').update(upass).digest('hex');
      if (record.author_psw_sha256 !== req_upass_sha256) {
        return res.send({
          success: false,
          msg: '无效的用户名＆密码组合.'
        }).end();
      } else {
        req.session.user = record;
        req.session.save();
        // res.redirect('/admin');
        // res.render('admin/admin-index');
        return res.send({
          success: true,
          msg: '登陆成功.'
        });
      }
    });
  })
  ;

module.exports = router;