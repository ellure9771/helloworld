/* global $ */


//$(document).ready(function(e) {
//    $('img[usemap]').rwdImageMaps();
//});

$(function() {

    $('.main-visual.flexslider').flexslider({
        animationLoop: true,
        slideshow: true,
        directionNav: false,
        controlNav: true,
        start: function(slider) {
            slider.css( 'opacity', '1' );
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
            $('.toggle-nav-wrap').append('<div id="mask"></div>');
        }
        $('.toggle-nav').animate({
            'right': 0
        }, 500);
    });


    $('.toggle-nav #gnb>ul>li>a').click(function(e) {
        e.preventDefault();
        if($(this).parent().hasClass('active')) {
            $(this).parent('li').removeClass('active');
        } else {
            $('.toggle-nav>ul>li').removeClass('active');
            $(this).parent('li').addClass('active');
        }
    });

    $('body').on('click touchstart', '.toggle-nav-wrap #mask, #toggle-close, .toggle-nav .btn-x', function() {
        $('.toggle-nav').animate({
            'right': '-235px'
        }, 500, function() {
            $('#mask').fadeOut('fast', function() {
                $(this).remove();
            });
        });

    });

    $('#gnb.main li').on({
        mouseover: function() {
            $(this).children('.sub-cate').addClass('active');
        }, mouseleave: function() {
            $(this).children('.sub-cate').removeClass('active');
        }
    });

    $('.tab-contents').each(function() {
        $(this).find('.tab-item').hide();
        $(this).find('.tab-item').eq(0).show();
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

    tabContent('.tab-nav.use-tab li', 'div.tab-item');

    // FAQ

    $('.accd li a').click(function(e) {
        e.preventDefault();
        if($(this).hasClass('active')) {
            $(this).removeClass('active').siblings('.accd-con').hide();
        } else {
            $('.accd li a').removeClass('active');
            $('.accd-con').hide();
            $(this).addClass('active').siblings('.accd-con').show();
        }
    });


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

    $(window).resize(function() {
        resizePop();
    });

    resizePop();


    var bnTop = parseInt($('.quick-banner').css('top'));
    $(window).scroll(function(){

        var scrollTop = $(document).scrollTop();
        var hval = $(document).height();

        if (scrollTop < bnTop) {
        scrollTop = bnTop;

        }else if (scrollTop > (hval - 880) ) {
            scrollTop= hval - 880;
        }

        $(".quick-banner").stop();
        $(".quick-banner").animate( { "top" : scrollTop });
    });


});



function flexdestroy(selector) {

    var $els = $(selector);

    $els.each(function () {
        var $el = $(this);
        var $elClean = $el.clone();

        $elClean.find('.flex-viewport').children().unwrap();
        $elClean
            .removeClass('flexslider')
            .find('.clone, .flex-direction-nav, .flex-control-nav')
            .remove()
            .end()
            .find('*').removeAttr('style').removeClass(function (index, css) {
                // If element is SVG css has an Object inside (?)
                if (typeof css === 'string') {
                    return (css.match(/\bflex\S+/g) || []).join(' ');
                }
            });

        $elClean.insertBefore($el);
        $el.remove();
    });
}

function resizePop() {
    $('.popup').each(function() {
        $(this).css({
            'margin-left': -$(this).outerWidth() / 2,
            'margin-top': -$(this).outerHeight() / 2 - 30
        });
    });
}

// LAYER POPUP
function openLayer(el) {
    var temp = $('#' + el); //레이어의 id를 temp변수에 저장

    if(!$('#mask').length) {
        $("<div/>", {
            "id": "mask",
            click: function(){
                $(this).fadeOut(function() {
                    $(this).remove();
                });
            }
        }).appendTo("body");
    }
    $('.popup').hide();
    temp.show();
    resizePop();
    $('body, html, #mask').css('overflow','hidden');

    $('body').on('click touchstart', '.popup .btn-x', function(e) {
        temp.hide(0, function() {
            $('#mask').hide(0, function() {
                $(this).remove();
            });
        });
        $('body, html, #mask').css('overflow','auto');
        e.preventDefault();
    });
}
