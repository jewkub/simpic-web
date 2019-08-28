/* jew editted
edit loader fadeout
remove owl
*/

(function($) ***REMOVED***
  
  "use strict";

    // Shuffle portfolio
    var ul = document.querySelector('#portfolio');
    if (ul != null) ***REMOVED***
    for (var i = ul.children.length; i >= 0; i--) ***REMOVED***
        ul.appendChild(ul.children[Math.random() * i | 0]);
***REMOVED***
}

  // Sticky Nav
    $(window).on('scroll', function() ***REMOVED***
        if ($(window).scrollTop() > 500) ***REMOVED***
            $('.scrolling-navbar').addClass('top-nav-collapse');
    ***REMOVED*** else ***REMOVED***
            $('.scrolling-navbar').removeClass('top-nav-collapse');
    ***REMOVED***
***REMOVED***);

    /* 
   One Page Navigation & wow js
   ========================================================================== */
    //Initiat WOW JS
    new WOW().init();

    // one page navigation 
    $('.main-navigation').onePageNav(***REMOVED***
            currentClass: 'active'
***REMOVED***); 

    $(window).on('load', function() ***REMOVED***
       
        $('body').scrollspy(***REMOVED***
            target: '.navbar-collapse',
            offset: 195
    ***REMOVED***);

        $(window).on('scroll', function() ***REMOVED***
            if ($(window).scrollTop() > 200) ***REMOVED***
                $('.fixed-top').addClass('menu-bg');
        ***REMOVED*** else ***REMOVED***
                $('.fixed-top').removeClass('menu-bg');
        ***REMOVED***
    ***REMOVED***);

***REMOVED***);

    // Slick Nav 
    $('.mobile-menu').slicknav(***REMOVED***
      prependTo: '.navbar-header',
      parentTag: 'span',
      allowParentLinks: true,
      duplicate: false,
      label: '',
***REMOVED***);


/* 
   CounterUp
   ========================================================================== */
    $('.counter').counterUp(***REMOVED***
      time: 1000
***REMOVED***);

/* 
   MixitUp
   ========================================================================== */
  // $('#portfolio').mixItUp();
  if ($('#portfolio').length) window.mixer = mixitup('#portfolio', ***REMOVED***
    animation: ***REMOVED***
      clampHeight: false, // Srsly ? - -
      clampWidth: false,
      animateResizeContainer: false,
      animateResizeTargets: true,
      duration: 500,
***REMOVED***
});
  

/* 
   Touch Owl Carousel
   ==========================================================================
    var owl = $(".touch-slider");
    owl.owlCarousel(***REMOVED***
      navigation: false,
      pagination: true,
      slideSpeed: 1000,
      stopOnHover: true,
      autoPlay: true,
      items: 2,
      itemsDesktop : [1199,2],
      itemsDesktopSmall: [1024, 2],
      itemsTablet: [600, 1],
      itemsMobile: [479, 1]
***REMOVED***);

    $('.touch-slider').find('.owl-prev').html('<i class="fa fa-chevron-left"></i>');
    $('.touch-slider').find('.owl-next').html('<i class="fa fa-chevron-right"></i>'); */

/* 
   Sticky Nav
   ========================================================================== */
    $(window).on('scroll', function() ***REMOVED***
        if ($(window).scrollTop() > 200) ***REMOVED***
            $('.header-top-area').addClass('menu-bg');
    ***REMOVED*** else ***REMOVED***
            $('.header-top-area').removeClass('menu-bg');
    ***REMOVED***
***REMOVED***);

/* 
   VIDEO POP-UP
   ========================================================================== */
    $('.video-popup').magnificPopup(***REMOVED***
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
***REMOVED***);


  /* 
   SMOOTH SCROLL
   ========================================================================== */
    var scrollAnimationTime = 1200,
        scrollAnimation = 'easeOutQuart';

    $('a.scrollto').on('bind', 'click.smoothscroll', function (event) ***REMOVED***
        event.preventDefault();
        var target = this.hash;
        
        $('html, body').stop().animate(***REMOVED***
            'scrollTop': $(target).offset().top
    ***REMOVED***, scrollAnimationTime, scrollAnimation, function () ***REMOVED***
            window.location.hash = target;
    ***REMOVED***);
***REMOVED***);

/* 
   Back Top Link
   ========================================================================== */
    var offset = 200;
    var duration = 500;
    $(window).scroll(function() ***REMOVED***
      if ($(this).scrollTop() > offset) ***REMOVED***
        $('.back-to-top').fadeIn(400);
  ***REMOVED*** else ***REMOVED***
        $('.back-to-top').fadeOut(400);
  ***REMOVED***
***REMOVED***);

    $('.back-to-top').on('click',function(event) ***REMOVED***
      event.preventDefault();
      $('html, body').animate(***REMOVED***
        scrollTop: 0
  ***REMOVED***, 600);
      return false;
***REMOVED***)

/* Nivo Lightbox
  ========================================================*/   
   $('.lightbox').nivoLightbox(***REMOVED***
    effect: 'fadeScale',
    keyboardNav: true,
***REMOVED***);


/* stellar js
  ========================================================
  $.stellar(***REMOVED***
    horizontalScrolling: true,
    verticalOffset: 40,
    responsive: true,
***REMOVED***); */

/* 
   Page Loader
   ==========================================================================
  window.setTimeout(() => ***REMOVED***
    $('#loader').fadeOut(() => ***REMOVED***
      if (!onload) return console.log(':(');
      onload();
***REMOVED***);
***REMOVED***, 150); */
  

}(jQuery));

window.onload = async () => ***REMOVED***
  await new Promise(res => ***REMOVED***
    setTimeout(() => res(), 500);
***REMOVED***);
  $('#loader').fadeOut();
};
