$(function () {  
  // set click event of button '编辑'
  $('#btn-pedit').on('click', function (e) {
    $('#record-detail').hide();
    $('#form-modify_record').show();
  });

  // set click event of button '取消'
  $('#btn-pcancel').on('click', function (e) {
    $('#form-modify_record').hide();
    $('#record-detail').show();
  });
  
  // set readonly attribute of input pid
  $('#pid').attr('readonly', true);
  
  // button '提交'
  $('#btn-psubmit').on('click', function (e) {
    e.preventDefault();
    $.ajax({
      url: $('#form-modify_record').attr('action'),
      method: 'post',
      data: $("#form-modify_record").serialize(),
      success: function (data) {
        location.reload(true);
      }
    })
  });
  
  // button '删除'
  $('#btn-pdelete').on('click', function (e) {
    if(confirm('确认删除该记录?')) {
      $.ajax({
        url: 'record-delete' + location.search,
        success: function(data) {
          if(data.success) {
            location.href = '/admin/records';
          } else {
            alert(data.msg);
          }
        },
        error: function (data) {
          alert('啊哦,服务器开小差了~');          
        }
      });
    }
  });
  
  $('#form-modify_record li:nth-child(2) > a').on('click', function(e) {
    var md = $('#psolu').val();
    var ht = showdown.makeHtml(md);
    $('#tab预览').html(ht);
  });
});