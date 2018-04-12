var assert = require('assert');

var db_sqlite3_blog = function () {
  var sqlite3 = require('sqlite3').verbose();
  var db = new sqlite3.Database('db/data/Blog.db');
  
  //***************************************************
  //* GET
  //***************************************************
  
  /**
   * get user whose uuid is @uuid
   * @param uuid user's uuid
   * @param callback fn
   */
  function getUserByUUID(uuid, callback) {
    db.get('select * from tb_author where author_uuid=?', uuid, callback);
  }

  function getUserByName(uname, callback) {
    db.get('select * from tb_author where author_name=?', uname, callback);
  }

  function getUserByEmail(email, callback) {
    db.get('select * from tb_author where author_email=?', email, callback);
  }
  
  function getRecordAll(callback) {
    db.all('select bl.*, au.author_name from tb_blog as bl' +
     ' join tb_author as au on bl.author_id = au.author_id where bl.blog_status <> -1 order by id DESC', callback);
  }
  
  function getRecordById(id, callback) {
    db.get('select bl.*, au.author_name from tb_blog as bl' +
     ' join tb_author as au on bl.author_id = au.author_id where bl.blog_status <> -1 and bl.id=?', id, callback);    
  }
  // 获取公共博客
  function getRecordPublic(callback) {
    db.all('select bl.*, au.author_name from tb_blog as bl' +
     ' join tb_author as au on bl.author_id = au.author_id where bl.blog_status <> -1 and bl.privilege = -1 order by id DESC', callback);
  }
  function getRecordDeleted(callback) {
    db.all('select bl.*, au.author_name from tb_blog as bl' +
     ' join tb_author as au on bl.author_id = au.author_id where bl.blog_status = -1 order by id DESC', callback);
  }
  
  //***************************************************
  //* INFLATE
  //***************************************************
  
  /**
   * Inflate variabe
   */
  function inflateUser(record, user) {
    user.author_id = record.author_id;
    user.author_name = record.author_name;
    user.author_psw_sha256 = record.author_psw_sha256;
    user.author_uuid = record.author_uuid;
    user.author_type = record.author_type;
    user.author_email = record.author_email;
    user.author_qq = record.author_qq;
    user.author_weibo = record.author_weibo;
  }
  /**
   * inflate model blog
   * @param blog the model blog
   * @param session client session, to obtain the user info.
   */
  function inflateBlog(model_blog, req) {
    var title = req.body.blog_title,
      sub_title   = req.body.blog_sub_title,
      content     = req.body.blog_content,
      id          = req.body.id        || null,     // optional, used when update Blog.
      tags        = req.body.blog_tags,
      status      = req.body.blog_status    || 1,        // 1: nomal, -1:delted, 0: drafted. 
      privilege   = req.body.blog_privilege || -1,       // -1:public 0:priviate
      anchor      = req.body.blog_anchor;                // 首屏分段标记

    model_blog.blog_title     = title;
    model_blog.blog_sub_title = sub_title;
    model_blog.blog_content   = content;
    model_blog.author_id      = req.session.user.author_id;
    model_blog.id             = id;
    model_blog.blog_tags      = tags;
    model_blog.blog_status    = status;
    model_blog.blog_privilege = privilege; 
    model_blog.blog_anchor    = anchor;
    // model_blog.blog_modify_time = Date.now();
  }
  
  
  //***************************************************
  //* ADD
  //***************************************************
  
  function addBlog(model_blog, callback) {
    assert(model_blog);
    model_blog.check();
    model_blog.blog_sub_title = model_blog.blog_sub_title || '';
    db.run('insert into tb_blog'+
      '(blog_title, blog_sub_title, author_id, blog_content, blog_add_time, blog_status, blog_privilege, blog_tags, blog_anchor)'+
      'values(?,?,?,?,?,?,?,?,?)',
        model_blog.blog_title,
        model_blog.blog_sub_title,
        model_blog.author_id,
        model_blog.blog_content,
        model_blog.blog_add_time,
        model_blog.blog_status,
        model_blog.blog_privilege,
        model_blog.blog_tags,
        model_blog.blog_anchor,
        callback
      );
  }
  
  function addUser(model_user, callback) {
    assert(model_user);
    model_user.check();
    //todo: add to db
  }
  

  //***************************************************
  //* UPDATE
  //***************************************************
  function updateBlog(model_blog, callback) {
    assert(model_blog && model_blog.id);
    model_blog.check();
    model_blog.blog_sub_title = model_blog.blog_sub_title || '';
    db.run('update tb_blog set blog_title=?, blog_sub_title=?, blog_content=?, blog_modify_time=?, blog_status=?, blog_privilege=?, blog_tags=?, blog_anchor=? where id=?',
        model_blog.blog_title,
        model_blog.blog_sub_title,
        model_blog.blog_content,
        model_blog.blog_modify_time || Date.now(),

        model_blog.blog_status,
        model_blog.blog_privilege,
        model_blog.blog_tags,
        model_blog.blog_anchor,
        model_blog.id,
        callback
      );
  }

  //***************************************************
  //* DELETE
  //***************************************************
  function deleteBlogByID(id, callback) {
    assert(id);
    // not really deleted it from db, just set blog_status -1 to which means `delete`.
    db.run('update tb_blog set blog_status = -1 where id=?', id, callback);
  }
  return {
    getUserByUUID: getUserByUUID,
    getUserByName: getUserByName,
    getUserByEmail: getUserByEmail,
    getRecordAll: getRecordAll,
    getRecordById: getRecordById,
    getRecordPublic: getRecordPublic,
    getRecordDeleted: getRecordDeleted,

    addUser: addUser,
    addBlog: addBlog,

    updateBlog: updateBlog,
    
    deleteBlogByID: deleteBlogByID,

    inflateUser: inflateUser,
    inflateBlog: inflateBlog
  }
}
module.exports = db_sqlite3_blog;