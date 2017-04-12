/* global $ */

$(function() {

    $('.main-visual').flexslider({
        animation: "slide",
        selector: ".slides .item",
        animationLoop: true,
        slideshow: true,
        directionNav: false,
        start: function(slider) {
            $('.main-visual').css( 'opacity', '1' );
        },
        after: function (slider) {
            if (!slider.playing) {
                slider.play();
            }
        }
    });

//    heightSet();
//    function heightSet(){
//        $('#gnb, #content').css('height','auto');
//        var gnbHeight = $('#gnb').outerHeight();
//        var conHeight = $('#content').outerHeight();
//        var winHeight = $(window).outerHeight();
//        var topHeight = $('#header').outerHeight();
//        var setHeight = [gnbHeight, conHeight, winHeight];
//        setHeight.sort(function(l,r) { return r-l });
//        $('#gnb, #content').css('height', setHeight[0] - topHeight);
//    }
//
//    $(window).resize(function(){
//        window.resizeEvt;
//        clearTimeout(window.resizeEvt);
//        window.resizeEvt = setTimeout(function(){
//            heightSet();
//        }, 0);
//    });

    // TOGGLE MENU

    $('#toggle-open').click(function() {
        if(!$('#mask').length) {
            $('body').append('<div id="mask"></div>');
        }
        $('.toggle-nav').animate({
            'left': 0
        }, 500, function() {
            $('body, html, #mask').css('overflow','hidden');
        });
    });

    $('.toggle-nav li.main-cate>a').click(function(e) {
        e.preventDefault();
        if($(this).parent().hasClass('active')) {
            $(this).parent('li').removeClass('active');
        } else {
            $('.toggle-nav li.main-cate').removeClass('active');
            $(this).parent('li').addClass('active');
        }
    });

    $('body').on('click touchstart', '#toggle-close, .btn-x, #mask', function() {
        $('.toggle-nav').animate({
            'left': -235
        }, 500, function() {
            $('#mask').fadeOut('fast', function() {
                $(this).remove();
            });
            $('body, html, #mask').css('overflow','visible');
        });

    });

    $('#gnb.main li').on({
        mouseover: function() {
            $(this).children('.sub-cate').addClass('active');
        }, mouseleave: function() {
            $(this).children('.sub-cate').removeClass('active');
        }
    });

    function tabContent(selecter, contents) {
        $(selecter).click(function() {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active').siblings(this).removeClass('active');
                $($(this).find('a').attr('href')).show().siblings(contents).hide();
            }
            return false;
        });
    }

    tabContent('.tab-nav li', '.tab-contents>div.tab-item');

    // CHECKBOX TOGGLE

    $(':checkbox').click(function(){
        var $label = $(this).next('label');
        $(this).is(':checked') ? $label.addClass('active') : $label.removeClass('active');
        $(this).is(':checked') ? $(this).prop('checked', true) : $(this).prop('checked', false);
    });

    // RADIO BUTTON TOGGLE

    $(':radio').click(function(){
        //console.log($(this));
        var $label = $(this).next('label');
        var val = $(this).attr('name');
        var $labelGroup = $('input[name='+val+']').next();
        $labelGroup.removeClass('active');
        if($(this).is(':checked')){
            $('input[name='+val+']').prop('checked',false);
            $(this).prop('checked',true);
            $label.addClass('active');
        }
    });

    // SCROLL EVENT

    $(window).scroll(function() {
        var wScroll = $(this).scrollTop();

        if(wScroll > 100) {
            $('.scroll-top').addClass('is-showing');
        } else {
            $('.scroll-top').removeClass('is-showing');
        }
    });

    // SCROLL TOP BUTTON

    $('.scroll-top').on('click', function() {
        $('html, body').animate({scrollTop:0}, '2000', function() {
            $('.scroll-top').removeClass('is-showing');
        });
        return false;

    });

});
