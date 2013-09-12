$(document).ready(function() {
//  $('nav').on('click', 'a', function() {
//    var hash = window.location.hash = $(this).attr('href').replace('.html','').replace('index','home');
//    return false;
//  });
//  
//  $(window).on('hashchange', function() {
//    var hash = window.location.hash.substring(1)+'.html';
//    if(hash == 'home.html') {
//      $('.content').load('index.html .content');
//    } else {
//      $('.content').load(hash + ' .content');                    
//    }
//  });
//  
//  $(window).trigger('hashchange');
    
    $("nav").on("click", function(){
        $('.content').load('page-b.html .content');        
    });
    
});