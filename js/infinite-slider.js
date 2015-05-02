/*
*
* Author Karo Hakobyan
*
*/

"use strict";

(function($){
	
	$.fn.infiniteSlider = function(options) {
	
		var settings = $.extend({
			animateType   : false,
			autoPlaySpeed : false,
			btnsText      : {
				next      : "",
				prev      : "",
				pause     : "",
				play      : ""
			},
			hoverPause    : false,
			navigation    : false,
			responsive    : false,
			speed         : "normal",
			swipe         : false,
			swipeLimit    : false,
			width         : "100%"
		}, options);
		
		return this.each(function(i, elem){
			
			if ($(".slider-box", $(elem)).size() > 1) {
			
				var is = {};
					
					is.wrapper  = $(elem).width(settings.width);
					is.current  = 1;
					is.timer    = false;
					is.content  = $('<div class="slider-content" style="overflow: hidden;"></div>');
					is.engine   = $('<div class="slider-engine"></div>');
					is.next     = $('<span class="slider-btns slider-next">' + settings.btnsText.next + '</span>');
					is.prev     = $('<span class="slider-btns slider-prev">' + settings.btnsText.prev + '</span>');
					is.autoPlay = $('<span class="slider-play-toggle" data-pause="' + settings.btnsText.pause + '" data-play="' + settings.btnsText.play + '">' + settings.btnsText.pause + '</span>');
					is.navList  = $('<ul class="slider-nav"></ul>');
					is.first    = $(".slider-box", is.wrapper).first().clone().width( is.wrapper.width() );
					is.last     = $(".slider-box", is.wrapper).last().clone().width( is.wrapper.width() );
					
					// Init slider
					
					is.engine.append( $(".slider-box", is.wrapper).width( is.wrapper.width() ), is.first ).prepend( is.last );
					
					is.content.append( is.engine );
					is.wrapper.append( is.content, is.prev, is.next );
					
					is.count = $(".slider-box", is.wrapper).size();

					is.engine.css({
						marginLeft : "-" + is.wrapper.width() + "px",
						width      : is.wrapper.width() * is.count + "px"
					});
					
					// Slider animate fn
					
					is.engineAnimate = function (point, curElem, swipeFirst, swipeLast) {
					
						if (settings.navigation) {
							$(".slider-nav-items.active", is.wrapper).removeClass("active");
							$(".slider-nav-items", is.wrapper).eq(curElem - 1).addClass("active");							
						}
						
						if (swipeFirst) {
							
							is.engine.stop(false, true).animate({ marginLeft: '-' + point + 'px' }, settings.speed, settings.animateType, function(){
								is.engine.css( "margin-left", "-" + is.wrapper.width() + "px" );
								if ( is.engine.hasClass('moving') ) {
									is.engine.removeClass('moving');
								}
							});
							
							return;
							
						}
						
						if (swipeLast) {
							
							is.engine.stop(false, true).animate({ marginLeft: '-' + point + 'px' }, settings.speed, settings.animateType, function(){
								is.engine.css( "margin-left", "-" + (is.wrapper.width() * (is.count - 2)) + "px" );
								if ( is.engine.hasClass('moving') ) {
									is.engine.removeClass('moving');
								}
							});
							
							return;
							
						}
						
						if (point == "first") {
							is.engine.stop(false, true).animate({ marginLeft: "-=" + is.wrapper.width() + "px" }, settings.speed, settings.animateType, function (){
								is.engine.css( "margin-left", "-" + is.wrapper.width() + "px" );
							});
						} else if (point == "last") {
							is.engine.stop(false, true).animate({ marginLeft: "0px" }, settings.speed, settings.animateType, function (){
								is.engine.css( "margin-left", "-" + (is.wrapper.width() * (is.count - 2)) + "px" );
							});
						} else {
							is.engine.stop(false, true).animate({ marginLeft: point + "px" }, settings.speed, settings.animateType, function(){
								if ( is.engine.hasClass('moving') ) {
									is.engine.removeClass('moving');
								}
							});
						}
						
					}
					
					// Pagination
					
					if (settings.navigation) {
					
						$(".slider-box", is.wrapper).each(function(i, elem){
							if (i != (is.count - 1) && i != (is.count - 2)) {
								is.navList.append($("<li class='slider-nav-items" + ((i == 0) ? " active" : "") + "' data-index='" + (i+1) + "'>" + (i+1) + "</li>"));
							}
						});
						is.wrapper.append( is.navList );
						
						$(".slider-nav-items", is.wrapper).click(function(){
						
							var dataIndex = $(this).data("index");
							
							if (dataIndex != is.current) {										
								is.engineAnimate( "-" + (is.wrapper.width() * dataIndex), is.current = dataIndex );
							}
						});
						
					}
					
					// Auto play
					
					if (settings.autoPlaySpeed) {
					
						is.interval = function (autoPlaySpeed) {
							is.timer = setInterval(function(){
								(is.current < is.count - 2) ? is.engineAnimate( "-=" + is.wrapper.width(), ++is.current) : is.engineAnimate( "first", is.current = 1 );
							}, autoPlaySpeed);
						}
						$(is.next, is.wrapper).after( is.autoPlay );
						is.interval(settings.autoPlaySpeed);
						
						is.autoPlay.click(function(){
							if (!is.autoPlay.hasClass("pause")) {
								is.autoPlay.addClass("pause").text(is.autoPlay.data("play"));
								clearInterval(is.timer);
							} else {
								is.autoPlay.removeClass("pause").text(is.autoPlay.data("pause"));
								is.interval(settings.autoPlaySpeed);
							}
						});
						
						if (settings.hoverPause) {
							$(".slider-box, .slider-btns, .slider-nav", is.wrapper).hover(function(){
								if (!is.autoPlay.hasClass("pause")) {
									is.autoPlay.addClass("stop").text(is.autoPlay.data("play"));
									clearInterval(is.timer);
								}
							}, function(){
								if (!is.autoPlay.hasClass("pause")) {
									is.autoPlay.removeClass("stop").text(is.autoPlay.data("pause"));
									is.interval(settings.autoPlaySpeed);
								}
							});
						}
					}
					
					// Responsive
					
					if (settings.responsive) {
					
						$(window).resize(function(){
							
							var selfWidth = parseInt($(this).width());
								
							is.wrapper.width( selfWidth );
							$(".slider-box", is.wrapper).width( selfWidth );
							
							is.engine.width(selfWidth * is.count);
							is.engineAnimate( "-" + (selfWidth * is.current), is.current );
							
						});
						
						
					}
					
					// Slide buttons
					
					is.next.click(function(){
						(is.current < is.count - 2) ? is.engineAnimate( "-=" + is.wrapper.width(), ++is.current) : is.engineAnimate( "first", is.current = 1 );
					});
					
					is.prev.click(function(){								
						(is.current > 1) ? is.engineAnimate( "+=" + is.wrapper.width(), --is.current ) : is.engineAnimate( "last", is.current = is.count - 2 );
					});
					
					// Swipe
					
					if (settings.swipe) {
						
						is.linkPreventClick = function( elem ) {
							
							elem.click(function(){
										
								if ( is.engine.hasClass('moving') ) {
									return false;
								}
								
							});
							
						};
						
						is.engine.swipe({
							threshold        : 0,
							excludedElements : 'button, input, select, textarea, .noSwipe',
							allowPageScroll  : 'vertical',
							swipeStatus      : function(event, phase, direction, distance, duration, fingerCount){
								
								if ((direction == 'left' || direction == 'up') && distance) {
								
									is.engine.addClass('moving');
								
									is.linkPreventClick( $('.slider-box', is.wrapper) );
									
									var distancePoint = (is.wrapper.width() * is.current);
									
									is.engine.stop().css('margin-left', '-' + (distancePoint + distance) + 'px');
									
									if ((distance >= settings.swipeLimit && phase == 'end') || phase == 'cancel') {
										
										(is.current < is.count - 2) ?
											is.engineAnimate('-' + ((is.wrapper.width() * is.current) + is.wrapper.width()), ++is.current) :
												is.engineAnimate( ((is.wrapper.width() * is.current) + is.wrapper.width()), is.current = 1, true );
										
									} else if (distance <= settings.swipeLimit && phase == 'end') {
										
										is.engineAnimate( '-' + (is.wrapper.width() * is.current), is.current );
										
									}
									
								}
								
								if ((direction == 'right' || direction == 'down') && distance) {
								
									is.engine.addClass('moving');
								
									is.linkPreventClick( $('.slider-box', is.wrapper) );
									
									var distancePoint = (is.wrapper.width() * (is.current - 1));
									
									(is.current > 1) ?
										is.engine.stop().css('margin-left', '-' + ((distancePoint + is.wrapper.width()) - distance) + 'px') :
											is.engine.stop().css('margin-left', '-' + ((distancePoint - distance) + is.wrapper.width()) + 'px');
									
									if ((distance >= settings.swipeLimit && phase == 'end') || phase == 'cancel') {
										
										(is.current > 1) ?
											is.engineAnimate( '+=' + (is.wrapper.width() - distance), --is.current ) :
												is.engineAnimate( 0, is.current = is.count - 2, false, true );
										
									} else if (distance <= settings.swipeLimit && phase == 'end') {
										
										is.engineAnimate('-' + (is.wrapper.width() * is.current), is.current);
										
									}
									
								}
								
							}
							
						});
					}
			
			}
			
		});
	};
	
})(jQuery);
