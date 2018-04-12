$(function() {
  $('#btn-submit_issue').on('click', function(e) {
    e.preventDefault();
    var nick_name = $('#nick_name').val(),
    issue_content = $('#issue').val();
    if(!nick_name) {
      alert('留个名字吧~');
      $('#nick_name').focus();
      return;
    }
    if(!issue_content){
      alert('请赐教~');
      $('#issue').focus();
      return;
    }

    $('#nick_name').val(nick_name.trim());
    $('#issue').val(issue_content.trim());

    $.ajax({
      url: $('#form-submit_issue').attr('action'),
      method: 'post',
      data: $('#form-submit_issue').serialize(),
      success: function (data) {
        alert(data.msg);
      },
      error: function(data) {
        alert('啊哦,服务器开小差了~');
      }
    });
    
  })
})