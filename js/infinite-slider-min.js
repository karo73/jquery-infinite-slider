/*
*
* Author Karo Hakobyan
*
*/

"use strict";!function(e){e.fn.infiniteSlider=function(n){var t=e.extend({animateType:!1,autoPlaySpeed:!1,btnsText:{next:"",prev:"",pause:"",play:""},hoverPause:!1,navigation:!1,responsive:!1,speed:"normal",swipe:!1,swipeLimit:!1,width:"100%"},n);return this.each(function(n,i){if(e(".slider-box",e(i)).size()>1){var a={};a.wrapper=e(i).width(t.width),a.current=1,a.timer=!1,a.content=e('<div class="slider-content" style="overflow: hidden;"></div>'),a.engine=e('<div class="slider-engine"></div>'),a.next=e('<span class="slider-btns slider-next">'+t.btnsText.next+"</span>"),a.prev=e('<span class="slider-btns slider-prev">'+t.btnsText.prev+"</span>"),a.autoPlay=e('<span class="slider-play-toggle" data-pause="'+t.btnsText.pause+'" data-play="'+t.btnsText.play+'">'+t.btnsText.pause+"</span>"),a.navList=e('<ul class="slider-nav"></ul>'),a.first=e(".slider-box",a.wrapper).first().clone().width(a.wrapper.width()),a.last=e(".slider-box",a.wrapper).last().clone().width(a.wrapper.width()),a.engine.append(e(".slider-box",a.wrapper).width(a.wrapper.width()),a.first).prepend(a.last),a.content.append(a.engine),a.wrapper.append(a.content,a.prev,a.next),a.count=e(".slider-box",a.wrapper).size(),a.engine.css({marginLeft:"-"+a.wrapper.width()+"px",width:a.wrapper.width()*a.count+"px"}),a.engineAnimate=function(n,i,r,s){return t.navigation&&(e(".slider-nav-items.active",a.wrapper).removeClass("active"),e(".slider-nav-items",a.wrapper).eq(i-1).addClass("active")),r?void a.engine.stop(!1,!0).animate({marginLeft:"-"+n+"px"},t.speed,t.animateType,function(){a.engine.css("margin-left","-"+a.wrapper.width()+"px"),a.engine.hasClass("moving")&&a.engine.removeClass("moving")}):s?void a.engine.stop(!1,!0).animate({marginLeft:"-"+n+"px"},t.speed,t.animateType,function(){a.engine.css("margin-left","-"+a.wrapper.width()*(a.count-2)+"px"),a.engine.hasClass("moving")&&a.engine.removeClass("moving")}):void("first"==n?a.engine.stop(!1,!0).animate({marginLeft:"-="+a.wrapper.width()+"px"},t.speed,t.animateType,function(){a.engine.css("margin-left","-"+a.wrapper.width()+"px")}):"last"==n?a.engine.stop(!1,!0).animate({marginLeft:"0px"},t.speed,t.animateType,function(){a.engine.css("margin-left","-"+a.wrapper.width()*(a.count-2)+"px")}):a.engine.stop(!1,!0).animate({marginLeft:n+"px"},t.speed,t.animateType,function(){a.engine.hasClass("moving")&&a.engine.removeClass("moving")}))},t.navigation&&(e(".slider-box",a.wrapper).each(function(n){n!=a.count-1&&n!=a.count-2&&a.navList.append(e("<li class='slider-nav-items"+(0==n?" active":"")+"' data-index='"+(n+1)+"'>"+(n+1)+"</li>"))}),a.wrapper.append(a.navList),e(".slider-nav-items",a.wrapper).click(function(){var n=e(this).data("index");n!=a.current&&a.engineAnimate("-"+a.wrapper.width()*n,a.current=n)})),t.autoPlaySpeed&&(a.interval=function(e){a.timer=setInterval(function(){a.current<a.count-2?a.engineAnimate("-="+a.wrapper.width(),++a.current):a.engineAnimate("first",a.current=1)},e)},e(a.next,a.wrapper).after(a.autoPlay),a.interval(t.autoPlaySpeed),a.autoPlay.click(function(){a.autoPlay.hasClass("pause")?(a.autoPlay.removeClass("pause").text(a.autoPlay.data("pause")),a.interval(t.autoPlaySpeed)):(a.autoPlay.addClass("pause").text(a.autoPlay.data("play")),clearInterval(a.timer))}),t.hoverPause&&e(".slider-box, .slider-btns, .slider-nav",a.wrapper).hover(function(){a.autoPlay.hasClass("pause")||(a.autoPlay.addClass("stop").text(a.autoPlay.data("play")),clearInterval(a.timer))},function(){a.autoPlay.hasClass("pause")||(a.autoPlay.removeClass("stop").text(a.autoPlay.data("pause")),a.interval(t.autoPlaySpeed))})),t.responsive&&e(window).resize(function(){var n=parseInt(e(this).width());a.wrapper.width(n),e(".slider-box",a.wrapper).width(n),a.engine.width(n*a.count),a.engineAnimate("-"+n*a.current,a.current)}),a.next.click(function(){a.current<a.count-2?a.engineAnimate("-="+a.wrapper.width(),++a.current):a.engineAnimate("first",a.current=1)}),a.prev.click(function(){a.current>1?a.engineAnimate("+="+a.wrapper.width(),--a.current):a.engineAnimate("last",a.current=a.count-2)}),t.swipe&&(a.linkPreventClick=function(e){e.click(function(){return a.engine.hasClass("moving")?!1:void 0})},a.engine.swipe({threshold:0,excludedElements:"button, input, select, textarea, .noSwipe",allowPageScroll:"vertical",swipeStatus:function(n,i,r,s){if(("left"==r||"up"==r)&&s){a.engine.addClass("moving"),a.linkPreventClick(e(".slider-box",a.wrapper));var p=a.wrapper.width()*a.current;a.engine.stop().css("margin-left","-"+(p+s)+"px"),s>=t.swipeLimit&&"end"==i||"cancel"==i?a.current<a.count-2?a.engineAnimate("-"+(a.wrapper.width()*a.current+a.wrapper.width()),++a.current):a.engineAnimate(a.wrapper.width()*a.current+a.wrapper.width(),a.current=1,!0):s<=t.swipeLimit&&"end"==i&&a.engineAnimate("-"+a.wrapper.width()*a.current,a.current)}if(("right"==r||"down"==r)&&s){a.engine.addClass("moving"),a.linkPreventClick(e(".slider-box",a.wrapper));var p=a.wrapper.width()*(a.current-1);a.current>1?a.engine.stop().css("margin-left","-"+(p+a.wrapper.width()-s)+"px"):a.engine.stop().css("margin-left","-"+(p-s+a.wrapper.width())+"px"),s>=t.swipeLimit&&"end"==i||"cancel"==i?a.current>1?a.engineAnimate("+="+(a.wrapper.width()-s),--a.current):a.engineAnimate(0,a.current=a.count-2,!1,!0):s<=t.swipeLimit&&"end"==i&&a.engineAnimate("-"+a.wrapper.width()*a.current,a.current)}}}))}})}}(jQuery);
