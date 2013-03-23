var demo = true;
var ie = false;
var mobileDevice = false;
var smallDevice = false;
var androidDevice = false;
if(
	navigator.userAgent.match(/Android/i) ||
	navigator.userAgent.match(/webOS/i) ||
	navigator.userAgent.match(/iPhone/i) ||
	navigator.userAgent.match(/iPad/i) ||
	navigator.userAgent.match(/iPod/i))
{
	mobileDevice = true;
}
if ($.browser.msie && $.browser.version < 9) { 
    ie = true;	
	var e = ("article,aside,figcaption,figure,footer,header,hgroup,nav,section,time").split(',');
	for (var i = 0; i < e.length; i++) {
		document.createElement(e[i]);
	}	
}
if (navigator.userAgent.match(/Android/i)) {
	var androidDevice = true;
	$('html').addClass('android');
}
if (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)) {
	var smallDevice = true;
	$('html').addClass('smallDevice');
}

$(document).ready(function() {		
	/*Flickr*/
	flickr = $('<script src="http://www.flickr.com/badge_code_v2.gne?count=12&display=latest&size=s&layout=x&source=user&user=91205275@N03"></script>')
	$('.widget_flickr').append(flickr);

	$('body').append('<a href="javascript:void(0)" class="btn2top"></a>');
	var back2top_int = setInterval(back2top_btn, 100);
	$('.btn2top').live('click', function(){
		$("html:not(:animated)" +( !$.browser.opera ? ",body:not(:animated)" : "")).animate({ scrollTop: 0}, 500 );  
        return false;		
	});
	
	if ($('.custom_bg_cont').size() > 0) {
		$('html').addClass('user_bg_layout');
		$('.header_wrapper').wrap('<div class="header_layout"/>');
		if ($('.custom_bg_cont').hasClass('bg_pic')) {
			$('html').addClass('user_pic_layout');
		}
	}
	//Menu SetUp and animation
	$('.menu').find('li:has(ul)').addClass('has-menu');
	$('.menu').children('li.has-menu').addClass('level1');
	$('.menu').find('li.level1').find('ul.sub-menu').children('li.has-menu').addClass('level2');
	$('ul.menu').superfish();
	$('.menu').children('li:last').addClass('last');
	$('ul.sub-menu').each(function(){
		$(this).prepend('<div class="menu_arrow"></div>');
	});
	//MobileMenu
	$('header .menu').find('li').each(function(){
		cur_link = $(this).children("a");
		if (!$(this).parent('ul').hasClass('sub-menu')) {
			if ($(this).hasClass('current-menu-item')) {
				$('#mobile_select').append('<option selected value="'+cur_link.attr("href")+'">'+cur_link.text().toUpperCase()+'</option>');
			} else {
				$('#mobile_select').append('<option value="'+cur_link.attr("href")+'">'+cur_link.text().toUpperCase()+'</option>');
			}			
		}
		else {
			if ($(this).hasClass('current-menu-item')) {			
				$('#mobile_select').append('<option selected value="'+cur_link.attr("href")+'"> -- '+cur_link.text()+'</option>');
			} else {
				$('#mobile_select').append('<option value="'+cur_link.attr("href")+'"> -- '+cur_link.text()+'</option>');
			}
		}
	});
	
	$('#mobile_select').change(function(){
		select_val = $(this).val();
		window.location = select_val;
	});
	
	//Input and Textarea Click-Clear
	$('input[type=text]').focus(function() {
		if($(this).attr('readonly') || $(this).attr('readonly') == 'readonly') return false;
		if ($(this).val() === $(this).attr('title')) {
				$(this).val('');
		}   
		}).blur(function() {
		if($(this).attr('readonly') || $(this).attr('readonly') == 'readonly') return false;
		if ($(this).val().length === 0) {
			$(this).val($(this).attr('title'));
		}                        
	});	
	$('textarea').focus(function() {
		if ($(this).text() === $(this).attr('title')) {
				$(this).text('');
			}        
		}).blur(function() {
		if ($(this).text().length === 0) {
			$(this).text($(this).attr('title'));
		}                        
	});	
	
	//FeedBack Form
	$('.content_block').find('.form_field').each(function(){
		$(this).width($(this).parent('form').width()-24);				
	});	
	$('.feedback_go').click(function(){
		var par = $(this).parents(".feedback_form");
		var name = par.find(".field-name").val();
		var email = par.find(".field-email").val();
		var message = par.find(".field-message").val();
		var subject = par.find(".field-subject").val();
		if (email.indexOf('@') < 0) {			
			email = "mail_error";
		}
		if (email.indexOf('.') < 0) {			
			email = "mail_error";
		}
		$.ajax({
			url: "mail.php",
			type: "POST",
			data: { name: name, email: email, message: message, subject: subject },
			success: function(data) {
				$('.ajaxanswer').hide().empty().html(data).show("slow");
		  }
		});
	});
	
	//Portfolio
	$('.portfolio_dscr').each(function(){
		$(this).css('bottom', -($(this).height()+70)+'px');	
	});
	var $container = $('.portfolio_block');
	$('.btn_load_more').click(function() {
		var count = $(this).attr('data-count');
		var $newEls = $(fakeElement.getGroup(count));
		$container.isotope('insert', $newEls, function() {
			$container.isotope('reLayout');
			$('.portfolio_dscr').each(function(){
				$(this).css('bottom', -($(this).height()+70)+'px');	
			});
		});
		return false;
	});	
});	

$(window).load(function(){	
	setTimeout("$('#preloader').animate({'opacity' : '0'},300,function(){$('#preloader').hide()})",800);
	setTimeout("$('footer').animate({'opacity' : '1'},500)",800);
	setTimeout("$('.content_wrapper').animate({'opacity' : '1'},500)",800);
	setTimeout("$('.gallery_block').animate({'opacity' : '1'},500)",1000);
	setTimeout("$('.pre_footer').animate({'opacity' : '1'},500)",800);
	
	/*VideoFrames*/
	$('.video_frame').each(function(){
		if (!$(this).hasClass('no_script')) {
			$(this).height(($(this).width()/16)*9);
		}
	});
	
	/*module_partners*/
	$('.module_partners').each(function(){
		item_data = parseInt($(this).find('.module_partners_wrapper').attr('data-items'));
		$(this).find('.item').css('width', Math.floor((100/item_data)*100)/100+'%');
	});
		
	/*shortcode_messagebox close*/
	$('.shortcode_messagebox').find('.box_close').click(function(){
		$(this).parents('.module_messageboxes').slideUp(400);
	});
	
	/*FullScreen Image Shortcode*/
	if ($('.module_layer_slider .module_content').hasClass('fullscreen_slider')) {
		$('.fullscreen_slider').each(function(){
			$(this).width($(window).width()).css('margin-left', -1*(($(window).width()-$(this).parent('.module_layer_slider').width())/2)+'px');
		});
	}

	if ($('.module_layer_slider .module_content').hasClass('slider_type3')) {
		$('.slider_type3').each(function(){
			$(this).width($('.content_wrapper').width()).css('margin-left', -1*(($('.content_wrapper').width()-$(this).parent('.module_layer_slider').width())/2)+'px');
		});
	}
	
	if (!mobileDevice) {
		$('.headline_socials').find('a').tipsy({gravity: 'n', fade: true});
		$('.footer_socials').find('a').tipsy({gravity: 's', fade: true});
	}
	
	footer_setup();
	$('.carouselslider').each(function(){
		dispNum = parseInt($(this).attr('data-count'));
		if ($(window).width()< 485) {
			dispNum = 1;
		}
		$(this).addClass('items'+dispNum);
		$(this).carousel({
			dispItems: dispNum,
			showEmptyItems: 0			
		});				
	});

    $('.accordion').each(function(){
        if ($(this).find('.expanded_yes').size() < 1) {
            marked_h5 = 0;
        } else {
            marked_h5 = parseInt($(this).find('.expanded_yes').attr('data-count'));
        }
        activeTab = marked_h5-1;
        $(this).accordion({
            autoHeight: false,
            active: activeTab,
            collapsible: false
        });
    });
	
	$('.shortcode_toggles_item_title').click(function(){
		$(this).next().slideToggle();
		$(this).toggleClass('ui-state-active');
	});
	$('.commentlist').find('.stand_comment').each(function(){
		set_width = $(this).width() - $(this).find('.commentava').width() - 25;
		$(this).find('.thiscommentbody').width(set_width);
	});	
	
	//Portfolio
	$('.prettyPhoto').prettyPhoto();
	
	if ($('.columns1').html()) {
		$('.portfolio_block').isotope('reLayout');
	}
		
	$('.nivoSlider').each(function(){
		$(this).nivoSlider({
			directionNavHide:false,
			effect:'fade',
			pauseTime:4000
		});
		//$(this).cameraStop();		
	});	
});
$(window).resize(function(){
	footer_setup();
});

function footer_setup() {
	$('.content_wrapper').css('min-height', $(window).height()-$('header').height()-$('footer').height()-8-$('.pre_footer').height()-$('.header_filter').height()-parseInt($('header').css('border-top-width'))-parseInt($('header').css('border-bottom-width'))+'px');
}
jQuery.fn.TabScroll = function() {
	var scrollStartPos = 0;
	max_scroll = -1*($(this).width()-$('.filter_navigation').width());
	$(this).css('right', max_scroll+'px');
    $(this).bind('touchstart', function(event) {										
        var e = event.originalEvent;
        scrollStartPos = parseInt($(this).css('right')) + e.touches[0].pageX;
    });
    $(this).bind('touchmove', function(event) {										   	
        var e = event.originalEvent;			
        $(this).css('right', (scrollStartPos - e.touches[0].pageX)+'px');
		if (parseInt($(this).css('right')) > 0) {
			$(this).css('right', '0px');
		}
		if (parseInt($(this).css('right')) < max_scroll) {
			$(this).css('right', max_scroll+'px');
		}
        e.preventDefault();
    });
    return this;	
};

function back2top_btn() {
	if($(window).scrollTop() > 0) {
		$('body').find('.btn2top').fadeIn(300);
	}
	else {
		$('body').find('.btn2top').fadeOut(300);
	}
}
