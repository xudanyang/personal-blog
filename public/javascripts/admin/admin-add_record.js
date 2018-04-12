$(function () {
  showdown.Converter();
  $('#form-add_record li:nth-child(2) > a').on('click', function(e) {
    var md = $('#psolu').val();
    var ht = showdown.makeHtml(md);
    $('#tab预览').html(ht);
  });
  
  $('#btn-psubmit').on('click', function (e) {
    e.preventDefault();
    $('#form-add_record').submit();
  });
});