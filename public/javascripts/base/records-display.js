$(function() {
  var max_height = $('.record-content').css('max-height');
  $('.probDesc').on('click', function(e) {
    var record_content = $(e.target.parentElement); 
    if('none' != record_content.css('max-height')) {
      record_content.css('white-space', 'pre-wrap');
      return record_content.css('max-height', 'none');
    }
    record_content.css('max-height', max_height);
    record_content.css('white-space', 'inherit');
  });
})
