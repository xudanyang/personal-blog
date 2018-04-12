$(function() {
  showdown.Converter();
  $('#record-solu-body').each(function(i, item) {
    var html = $(item).text();
    html = showdown.makeHtml(html);
    $(item).html(html);
    $('pre code', item).each(function(i, block) {
      hljs.highlightBlock(block);
    });
    $('table', item).each(function(i, tab) {
      tab.className = 'table table-hover' 
    });
  });
});
