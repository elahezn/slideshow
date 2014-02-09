/*jshint strict:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, undef:true, unused:true, nonew:true, browser:true, devel:true, boss:true, curly:false, immed:false, latedef:true, newcap:true, plusplus:false, trailing:true, debug:false, asi:false, evil:false, expr:true, eqnull:false, esnext:false, funcscope:false, globalstrict:false, loopfunc:false */

(function($){
  "use strict";
  
  var
    $slideshow=$('.slideshow'),
    $slides=$slideshow.find('.train > div'),
    $btns=$slideshow.find('ul.btns'),
    $lists,
    $train=$slideshow.find('.train'),
    $nextBtn=$slideshow.find('.next'),
    $prevBtn=$slideshow.find('.prev'),
    slideWidth=$slides.eq(0).width(),
    currentSlide=0,
    autoPlayDelay=3000,
    autoPlayIv,
    go2slide = function(n){ // go to slide n
      if(n>=$slides.length) n=0;
      if(n<0) n=$slides.length-1;

      $lists.removeClass('active');
      $lists.eq(n).addClass('active');

      $train.animate({
        left:n*slideWidth*-1
      },600);
      
      currentSlide = n;
    },
    navBtns = function(){ // create navigate btns
      var lists = '';
      for(var i=0;i<$slides.length;i++){
        lists+='<li></li>';
      }
      $btns.html(lists);

      $lists = $btns.find('li');
    },
    initEvents = function(){ // btns click events
      $lists.click(function(){
        go2slide( $(this).index() );
      });
      
      $nextBtn.click(nextSlide);
      $prevBtn.click(prevSlide);
    },
    nextSlide = function(){
      go2slide(currentSlide+1);
    },
    prevSlide = function(){
      go2slide(currentSlide-1);
    },
    autoPlay = function(){
      autoPlayIv = setInterval(nextSlide,autoPlayDelay);
      
      $slideshow.mouseover(function(){
        clearInterval(autoPlayIv);
      });
      
      $slideshow.mouseout(function(){
        autoPlayIv = setInterval(nextSlide,autoPlayDelay);
      });
      
    },
    init = function(){
      navBtns();  
      go2slide(0);
      initEvents();
      autoPlay();
    };
  init();
  
})(window.Zepto || window.jQuery);
