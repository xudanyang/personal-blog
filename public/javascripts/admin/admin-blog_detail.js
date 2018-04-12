$(function() {
  // btn edit
  $('#btn-edit').on('click', function(e) {
    var blog_anchor = $('#blog_anchor').val();
    if(blog_anchor > 0) {
      var blog_content = $("#blog_content").val();
      var first_part = blog_content.substr(0, blog_anchor);
      var sec_part = blog_content.substr(+blog_anchor);
      var blog_content = first_part + '<--->\n' + sec_part;
      $("#blog_content").val(blog_content);
    }
    $('#blog-detail').hide();
    $('#blog-edit').show();
    $('#form-operation').hide();
  });
  $('#btn-submit').on('click', function(e) {

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
    
    var form = $('#form-edit');
    $.ajax({
      url: form.attr('action'),
      method: form.attr('method') || 'post',
      data: form.serialize(),
      success: function (ret) {
        if(!ret.success) {
          return alert(ret.msg);
        }
        alert(ret.msg);
        location.reload();
      },
      error: function (err) {
        alert('服务器遇到点问题,　请稍后再试!');
      }
    });
  });
  // btn cancel
  $('#btn-cancel').on('click', function(e) {
    $('#blog-detail').show();
    $('#blog-edit').hide();
    $('#form-operation').show();
  });
  // tab preview
  $('#form-edit li:nth-child(2) > a').on('click', function(e) {
    var md = $('#blog_content').val();
    var ht = showdown.makeHtml(md);
    $('#tab预览').html(ht);
  });
  // btn delete
  $('#btn-delete').on('click', function(e) {
    if(!confirm('删除操作不可恢复，要删除么?')) return;
    $.ajax({
      url: 'req-delete_blog',
      method: 'delete',
      data: {
        id: $('#blog_id').val()
      },
      success: function(ret) {
        if(!ret.success) return alert(ret.msg);
        alert(ret.msg);
        location.href = '/admin/blog';
      },
      error: function (err) {
        alert('服务器遇到点问题,　请稍后再试!');
      }
    });
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