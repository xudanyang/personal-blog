var assert = require('assert');

var model_blog_user = function () {
  var fn = function (
    author_id,
    author_name,
    author_psw_sha256,
    author_uuid,
    author_type,
    author_email,
    author_qq,
    author_weibo
  ) {
    var _m = {
      author_id : author_id || null,
      author_name : author_name || null,
      author_psw_sha256 : author_psw_sha256 || null,
      author_uuid : author_uuid || null,
      author_type : author_type || null,
      author_email : author_email || null,
      author_qq : author_qq || null,
      author_weibo : author_weibo || null
    };
    
    _m.check = function(_fn) {
      if(typeof _fn == 'function') {
        _fn();
      } else {
        assert(
          _m.author_name &&
          _m.author_psw_sha256 &&
          _m.author_uuid &&
          _m.author_type 
        );
      }
      
      return fn;
    };
    
    return _m;
  };
  
  return fn;
}
module.exports = model_blog_user;