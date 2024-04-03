(function($) {

    "use strict";

    var cfg = {
        scrollDuration: 800,
        mailChimpURL: '#'
    },

    $WIN = $(window);

    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    if (!Modernizr.svg) {
        $(".header-logo img").attr("src", "images/logo.png");
    }

    var ssPreloader = function() {

        $("html").addClass('ss-preload');

        $WIN.on('load',
        function() {

            $('html, body').animate({
                scrollTop: 0
            },
            'normal');

            $("#loader").fadeOut("slow",
            function() {

                $("#preloader").delay(300).fadeOut("slow");
            });

            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');

        });
    };

    var ssMenuOnScrolldown = function() {

        var menuTrigger = $('.header-menu-toggle');

        $WIN.on('scroll',
        function() {

            if ($WIN.scrollTop() > 150) {
                menuTrigger.addClass('opaque');
            } else {
                menuTrigger.removeClass('opaque');
            }

        });
    };

    var ssOffCanvas = function() {

        var menuTrigger = $('.header-menu-toggle'),
        nav = $('.header-nav'),
        closeButton = nav.find('.header-nav__close'),
        siteBody = $('body'),
        mainContents = $('section, footer');

        menuTrigger.on('click',
        function(e) {
            e.preventDefault();
            siteBody.toggleClass('menu-is-open');
        });

        closeButton.on('click',
        function(e) {
            e.preventDefault();
            menuTrigger.trigger('click');
        });

        siteBody.on('click',
        function(e) {
            if (!$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span')) {
                siteBody.removeClass('menu-is-open');
            }
        });

    };

    var ssMasonryFolio = function() {

        var containerBricks = $('.masonry');

        containerBricks.imagesLoaded(function() {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                resize: true
            });
        });
    };

    var ssPhotoswipe = function() {
        var items = [],
        $pswp = $('.pswp')[0],
        $folioItems = $('.item-folio');

        $folioItems.each(function(i) {

            var $folio = $(this),
            $thumbLink = $folio.find('.thumb-link'),
            $title = $folio.find('.item-folio__title'),
            $caption = $folio.find('.item-folio__caption'),
            $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
            $captionText = $.trim($caption.html()),
            $href = $thumbLink.attr('href'),
            $size = $thumbLink.data('size').split('x'),
            $width = $size[0],
            $height = $size[1];

            var item = {
                src: $href,
                w: $width,
                h: $height
            }

            if ($caption.length > 0) {
                item.title = $.trim($titleText + $captionText);
            }

            items.push(item);
        });

        $folioItems.each(function(i) {

            $(this).on('click',
            function(e) {
                e.preventDefault();
                var options = {
                    index: i,
                    showHideOpacity: true
                }

                var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                lightBox.init();
            });

        });
    };

    var ssSlickSlider = function() {

        $('.testimonials__slider').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnFocus: false,
            autoplaySpeed: 1500
        });
    };

    var ssSmoothScroll = function() {

        $('.smoothscroll').on('click',
        function(e) {
            var target = this.hash,
            $target = $(target);

            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            },
            cfg.scrollDuration, 'swing').promise().done(function() {

                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };

    var ssAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close',
        function() {
            $(this).parent().fadeOut(500);
        });

    };

    var ssAOS = function() {

        AOS.init({
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };

    (function clInit() {

        ssPreloader();
        ssMenuOnScrolldown();
        ssOffCanvas();
        ssMasonryFolio();
        ssPhotoswipe();
        ssSlickSlider();
        ssSmoothScroll();
        ssAlertBoxes();
        ssAOS();

    })();

})(jQuery);