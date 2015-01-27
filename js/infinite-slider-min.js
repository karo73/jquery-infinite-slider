/*
*
* Author Karo Hakobyan
*
*/

"use strict";!function(e){e.fn.infiniteSlider=function(t){var n=e.extend({autoPlaySpeed:!1,btnsText:{next:"",prev:"",pause:"",play:""},hoverPause:!1,navigation:!1,responsive:!1,speed:"normal",swipe:!1,swipeLimit:!1,width:"100%"},t);return this.each(function(t,a){if(e(".slider-box",e(a)).size()>1){var i={};i.wrapper=e(a).width(n.width),i.current=1,i.timer=!1,i.content=e('<div class="slider-content" style="overflow: hidden;"></div>'),i.engine=e('<div class="slider-engine"></div>'),i.next=e('<span class="slider-btns slider-next">'+n.btnsText.next+"</span>"),i.prev=e('<span class="slider-btns slider-prev">'+n.btnsText.prev+"</span>"),i.autoPlay=e('<span class="slider-play-toggle" data-pause="'+n.btnsText.pause+'" data-play="'+n.btnsText.play+'">'+n.btnsText.pause+"</span>"),i.navList=e('<ul class="slider-nav"></ul>'),i.first=e(".slider-box",i.wrapper).first().clone().width(i.wrapper.width()),i.last=e(".slider-box",i.wrapper).last().clone().width(i.wrapper.width()),i.engine.append(e(".slider-box",i.wrapper).width(i.wrapper.width()),i.first).prepend(i.last),i.content.append(i.engine),i.wrapper.append(i.content,i.prev,i.next),i.count=e(".slider-box",i.wrapper).size(),i.engine.css({marginLeft:"-"+i.wrapper.width()+"px",width:i.wrapper.width()*i.count+"px"}),i.engineAnimate=function(t,a,r,p){return n.navigation&&(e(".slider-nav-items.active",i.wrapper).removeClass("active"),e(".slider-nav-items",i.wrapper).eq(a-1).addClass("active")),r?void i.engine.stop(!1,!0).animate({marginLeft:"-"+t+"px"},n.speed,function(){i.engine.css("margin-left","-"+i.wrapper.width()+"px")}):p?void i.engine.stop(!1,!0).animate({marginLeft:"-"+t+"px"},n.speed,function(){i.engine.css("margin-left","-"+i.wrapper.width()*(i.count-2)+"px")}):void("first"==t?i.engine.stop(!1,!0).animate({marginLeft:"-="+i.wrapper.width()+"px"},n.speed,function(){i.engine.css("margin-left","-"+i.wrapper.width()+"px")}):"last"==t?i.engine.stop(!1,!0).animate({marginLeft:"0px"},n.speed,function(){i.engine.css("margin-left","-"+i.wrapper.width()*(i.count-2)+"px")}):i.engine.stop(!1,!0).animate({marginLeft:t+"px"},n.speed))},n.navigation&&(e(".slider-box",i.wrapper).each(function(t){t!=i.count-1&&t!=i.count-2&&i.navList.append(e("<li class='slider-nav-items"+(0==t?" active":"")+"' data-index='"+(t+1)+"'>"+(t+1)+"</li>"))}),i.wrapper.append(i.navList),e(".slider-nav-items",i.wrapper).click(function(){var t=e(this).data("index");t!=i.current&&i.engineAnimate("-"+i.wrapper.width()*t,i.current=t)})),n.autoPlaySpeed&&(i.interval=function(e){i.timer=setInterval(function(){i.current<i.count-2?i.engineAnimate("-="+i.wrapper.width(),++i.current):i.engineAnimate("first",i.current=1)},e)},e(i.next,i.wrapper).after(i.autoPlay),i.interval(n.autoPlaySpeed),i.autoPlay.click(function(){i.autoPlay.hasClass("pause")?(i.autoPlay.removeClass("pause").text(i.autoPlay.data("pause")),i.interval(n.autoPlaySpeed)):(i.autoPlay.addClass("pause").text(i.autoPlay.data("play")),clearInterval(i.timer))}),n.hoverPause&&e(".slider-box, .slider-btns, .slider-nav",i.wrapper).hover(function(){i.autoPlay.hasClass("pause")||(i.autoPlay.addClass("stop").text(i.autoPlay.data("play")),clearInterval(i.timer))},function(){i.autoPlay.hasClass("pause")||(i.autoPlay.removeClass("stop").text(i.autoPlay.data("pause")),i.interval(n.autoPlaySpeed))})),n.responsive&&e(window).resize(function(){var t=e(this).width()+"px";i.wrapper.width(t),i.engine.stop(!1,!0).css({marginLeft:"-"+t*i.current,width:t*i.count}),e(".slider-box",i.wrapper).width(t)}),i.next.click(function(){i.current<i.count-2?i.engineAnimate("-="+i.wrapper.width(),++i.current):i.engineAnimate("first",i.current=1)}),i.prev.click(function(){i.current>1?i.engineAnimate("+="+i.wrapper.width(),--i.current):i.engineAnimate("last",i.current=i.count-2)}),n.swipe&&i.engine.swipe({threshold:0,swipeStatus:function(e,t,a,r){if("left"==a){var p=i.wrapper.width()*i.current;i.engine.stop().css("margin-left","-"+(p+r)+"px"),r>n.swipeLimit&&"end"==t?i.current<i.count-2?i.engineAnimate("-"+(i.wrapper.width()*i.current+i.wrapper.width()),++i.current):i.engineAnimate(i.wrapper.width()*i.current+i.wrapper.width(),i.current=1,!0):r<n.swipeLimit&&"end"==t&&i.engineAnimate("-"+i.wrapper.width()*i.current,i.current)}if("right"==a){var p=i.wrapper.width()*(i.current-1);i.current>1?i.engine.stop().css("margin-left","-"+(p+i.wrapper.width()-r)+"px"):i.engine.stop().css("margin-left","-"+(p-r+i.wrapper.width())+"px"),r>n.swipeLimit&&"end"==t?i.current>1?i.engineAnimate("+="+(i.wrapper.width()-r),--i.current):i.engineAnimate(0,i.current=i.count-2,!1,!0):r<n.swipeLimit&&"end"==t&&i.engineAnimate("-"+i.wrapper.width()*i.current,i.current)}}})}})}}(jQuery);
