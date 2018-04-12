'use strict';

$(function() {
  $.ajax({
    url: '/u/getinfo',
    method: 'GET'
  })
  .success(function(data) {
    var info = data;
    if(!info.isLogin) {
      return;
    }
    $('.lk-login').hide();
    $('.lk-logout').show();
  });
  
  var append_url = /\/(record-detail|blog-detail)\?.+=.+/.test(location.href) ? location.pathname + location.search : '';
  var req_origin_url = $('.lk-login a').attr('href');
  $('.lk-login a').attr('href', req_origin_url + '?redirect=/admin' + append_url);
  
  $('.lk-logout a').on('click', function(e) {
    e.preventDefault();
    
    $.ajax({
      url: $(e.target).attr('href')
    })
    .success(function(data) {
      if(data.success) {
        alert(data.msg);
      }
      location.href = '/blog';
    });
  });
  
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('#scorll_to_top').fadeIn();
    } else {
        $('#scorll_to_top').fadeOut();
    }
  });

  $('#scorll_to_top').click(function () {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });
});