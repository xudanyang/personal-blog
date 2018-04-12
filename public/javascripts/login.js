$(function() {
  $('#btn-login_submit').on('click', function(e) {
    e.preventDefault();
    var form_login = $('#form-login');
    $.ajax({
      url: form_login.attr('action'),
      method: 'post',
      data: form_login.serialize(),
      success: function(data) {
        if(data.success) {
          var redirect = location.search.split('redirect=');
          if(redirect && redirect[1])
            return location.href = redirect[1];
          location.href = '/admin';
        } else {
          alert(data.msg);
        }
      },
      error: function(e) {
        alert(e);
      }
    })
  })
});