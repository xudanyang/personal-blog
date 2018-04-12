var assert = require('assert');
var model_blog = function () {
  var fn = function (
    blog_title,
    blog_sub_title,
    author_id,
    blog_content,
    blog_add_time,
    blog_modify_time,
    
    blog_status,
    blog_privilege,
    blog_tags,
    blog_anchor
  ) {
    var _m = {
      blog_title: blog_title || null,
      blog_sub_title: blog_sub_title || null,
      author_id: author_id || null,
      blog_content: blog_content || null,
      blog_add_time: blog_add_time || null,
      blog_modify_time: blog_modify_time || null,
      
      blog_status: blog_status || null,
      blog_privilege: blog_privilege || null,
      blog_tags: blog_tags || null,
      blog_anchor: blog_anchor || null
    }
    
    _m.check = function(_fn) {
      if(typeof _fn == 'function') {
        _fn();
      } else {
        assert(
          _m.blog_title &&
          _m.blog_content
        );
      }
      
      return _m;
    };
    
    return _m;
  };
  return fn;
};

module.exports = model_blog;