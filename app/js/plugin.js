
(function($){

  $.fn.offCanvasMenu = function(opt){
    var settings, snappy, openMenu, overlayPage, closeOverlay;

    var body = $('body');
    var overlay;
    settings = $.extend({
      'mainWrapper': '.main-wrapper',
      'menu':        '.nav-wrapper',
      'morph':       'morph-shape',
      'speed':       700,
      'menuWidth':   300 ,
      'overlay':     'overlay',
      'isOpen':      false
    }, opt);


    snappy = function(){
      var s        = Snap('#svg-menu'),
          path     = s.select('path'),
          myPath   = 'M-1,0h101c0,0-97.833,153.603-97.833,396.167C2.167,627.579,100,800,100,800H-1V0z',
          pathOpen = "M-1,0h101c0,0,0-1,0,395c0,404,0,405,0,405H-1V0z";
      if(!settings.isOpen){
        path.animate({'path': pathOpen}, settings.speed, mina.bounce);
      }else{
        path.animate({'path': myPath}, settings.speed / 2, mina.bounce );
      }
    };

    overlayPage = function(){

      overlay = $('<div />',{
        class: settings.overlay
      }).on('click', openMenu);
      body.prepend(overlay);
    };


    closeOverlay = function(overlay){
      overlay.remove();
    };

    openMenu = function(){
      var self = $(this);

      if(settings.isOpen){
        // self.css({
        //   'transform' : 'translate3d(0px,0,0)'
        // });
        $(settings.menu).css({
          'transform' : 'translate3d('+-settings.menuWidth +'px,0,0)'
        });
        $(settings.mainWrapper).css({
          'transform' : 'translate3d(0px,0,0)'
        });

        snappy();
        closeOverlay(overlay);
        settings.isOpen = false;

      }else{
        // self.css({
        //   'transform' : 'translate3d('+ (settings.menuWidth - 110 )  +'px,0,0)'
        // });
        $(settings.menu).css({
          'transform' : 'translate3d(0px,0,0)'
        });
        $(settings.mainWrapper).css({
          'transform' : 'translate3d('+settings.menuWidth+'px,0,0)'
        });

        snappy();
        overlayPage();
        settings.isOpen = true;
      }
    };
    $('#close-nav').on('click', openMenu);

    this.on('click', openMenu);

    return this;

  };//end of plugin

  $.fn.smoothMouseScroll = function(options){
    var opt;

    opt = $.extend({
      'speed': 500,
      'distance': 250
    }, options);

      	if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
      	window.onmousewheel = document.onmousewheel = wheel;

      	function wheel(event) {
      	    var delta = 0;
      	    if (event.wheelDelta) delta = event.wheelDelta / 120;
      	    else if (event.detail) delta = -event.detail / 3;

      	    handle(delta);
      	    if (event.preventDefault) event.preventDefault();
      	    event.returnValue = false;
      	}

      	function handle(delta) {
      	    var time = opt.speed; // delay time
      	    var distance = opt.distance; // delta point
      	    // Dom where it will apply
      	    $('html, body').stop().animate({
      	        scrollTop: $(window).scrollTop() - (distance * delta)
      	    }, time );
      	}


    return this;

  };



})(jQuery);
