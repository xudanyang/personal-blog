'use strict'
$(function () {
  showdown.Converter();
  $('#btn-bsubmit').on('click', function (e) {
    e.preventDefault();
    // deal partition
    var blog_content = $('#blog_content').val();
    var a_blog_content = blog_content.split('\n');
    var line_no = a_blog_content.length;
    blog_content = '';
    var char_no = 0;
    for(var i=0; i<line_no; ++i) {
      if(a_blog_content[i] == '<--->') {
        $('#blog_anchor').val(char_no);
      } else {
        char_no += a_blog_content[i].length + 1;
        blog_content += a_blog_content[i] + '\n';
      }
    }
    $('#blog_content').val(blog_content);

    var form = $('#form-add_blog');
    $.ajax({
      url: form.attr('action'),
      method: form.attr('method'),
      data: form.serialize(),
      success: function(ret) {
        alert(ret.msg);
      },
      error: function() {
        alert('服务器开小差了，请稍后重试～');
      }
    });
  });

  $('#form-add_blog li:nth-child(2) > a').on('click', function(e) {
    var md = $('#blog_content').val();
    var ht = showdown.makeHtml(md);
    $('#tab预览').html(ht);
  });
  $('#add-anchor').on('click', function(e) {
    var selectionStart = $('#blog_content').prop('selectionStart');
    var blog_content = $('#blog_content').val();
    while(selectionStart && blog_content[selectionStart] !== '\n') {
      selectionStart--;
    }
    var first_part = blog_content.substr(0, selectionStart);
    var second_part = blog_content.substr(selectionStart);
    var res = first_part + "\n<--->\n<a name='target-hidden'></a>\n" + second_part;

    $('#blog_content').val(res);
  });
});