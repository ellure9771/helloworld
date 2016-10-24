/* global $ */

$(function() {

    if ($("#menu").length != 0) {
        $("#menu").treeview({
            animated: "fast",
            //collapsed: true,
        });
        $("#menu a").click(function(e){
            e.preventDefault();
            $this = $(this);
            $link = $this.attr("href");
            $("iframe").attr("src", $link);
        });
    };

    // TOGGLE MENU

    $('#toggle-open').click(function() {
        if(!$('#mask').length) {
            $('body').append('<div id="mask"></div>');
        }
        $('.toggle-nav').animate({
            'right': 0
        }, 500);
    });

    $('body').on('click', '#toggle-close, .btn-x', function() {
        $('.toggle-nav').animate({
            'right': -235
        }, 500, function() {
            $('#mask').fadeOut(300, function() {
                $(this).remove();
            });
        });
    });


    // TAB



    $('.tab-contents-wrap').children().css('display', 'none');
    $('.tab-contents-wrap div:first-child').css('display', 'block');
    $('.tab-nav li:first-child').addClass('selected');
    function tabonoff(o) {
        var index = $('.tab-nav li').index(o);
        $(o).siblings().removeClass('selected');
        $(o).addClass('selected');
        $(o).parent().next('.tab-contents-wrap').children().siblings().hide().eq(index).show();
    }
    (function(a){
        a.fn.tabonoff_auto=function(p){
            var s_t_i=p&&p.scroller_time_interval?p.scroller_time_interval:"3000"; //롤링타임 수정가능
            var dom=a(this);
            var s_length=dom.length;
            var timer;
            var current = 0; begin(); play();
            function begin(){
                dom.click(function(e){e.preventDefault(); current = dom.index($(this)); play(); stop()});
                dom.parent().parent().hover(function(){stop();},function(){timer = setTimeout(play,s_t_i);});
            }
            function stop(){clearTimeout(timer);}
            function play(){
                clearTimeout(timer); tabonoff(dom[current]);
                if(current >= s_length-1){current = 0;} else{current ++;}
                timer = setTimeout(play,s_t_i);
            }
        }
    })(jQuery);
    $(".tab-nav li").tabonoff_auto();


    if(('.project-slider').length) {
        var slider = $('.project-slider').bxSlider({
            mode: 'fade',
            speed: 1200,
            pause: 6000,
            moveSlides: 1,
            auto: true,
            autoHover: false,
            autoDelay: 1000,
            controls: true,
            pager: false,
            infiniteLoop: true,
            stopAuto: false,
            adaptiveHeight: true,
            adaptiveHeightSpeed: 0,
            onSlideAfter: function() {
                slider.stopAuto();
                slider.startAuto();

            }
        });
    }

    $(window).resize(function() {
        console.log('opps');
        slider.destroySlider();
        slider.reloadSlider();
    });
});
