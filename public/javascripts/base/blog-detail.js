$(function() {
  showdown.setOption('tables', true);
  showdown.Converter();
  $('.blog-content').each(function(i, item) {
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
