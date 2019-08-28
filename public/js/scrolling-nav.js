//jQuery to collapse the navbar on scroll
$(window).scroll(function() ***REMOVED***
    if ($(".navbar").offset().top > 50) ***REMOVED***
        $(".navbar-fixed-top").addClass("top-nav-collapse");
***REMOVED*** else ***REMOVED***
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
***REMOVED***
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() ***REMOVED***
    $(document).on('click', 'a.page-scroll', function(event) ***REMOVED***
        var $anchor = $(this);
        $('html, body').stop().animate(***REMOVED***
            scrollTop: $($anchor.attr('href')).offset().top
    ***REMOVED***, 1500, 'easeOutQuart');
        event.preventDefault();
***REMOVED***);
});
