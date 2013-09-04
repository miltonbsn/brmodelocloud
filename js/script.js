$(document).ready(function() {
  $('nav').on('click', 'a', function() {
    var hash = window.location.hash = $(this).attr('href').replace('.html','').replace('index','home');
    return false;
  });
  
//  $(window).on('hashchange', function() {
//    var hash = window.location.hash.substring(1)+'.html';
//    if(hash == 'home.html' || hash == '') {
//      $('nav').load('index.html nav');
//      alert(hash);
//    } else {
//      var newHash = hash.replace('home#', '');
//      $('nav').load(newHash + ' nav');
//    }
//  });
  
//  $(window).on('hashchange', function() {
//    var hash = window.location.hash.substring(1)+'.html';
//    if(hash == 'home#nav1.html') {
//      $('nav').load('nav1.html');
//    } else if (hash == 'home#nav2.html'){
//      $('nav').load('nav2.html');
//    } else {
//      $('nav').load('index.html nav');
//    }
//  });
  
  $(window).on('hashchange', function() {
    var hash = window.location.hash.substring(1)+'.html';
    if(hash == 'home.html') {
      $('.content').load('index.html .content');
    } else {
      $('.content').load(hash + ' .content');                    
    }
  });
  
  $(window).trigger('hashchange');
});