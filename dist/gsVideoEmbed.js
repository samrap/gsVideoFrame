(function($){
  /**
   * Video Anchors
   */
  $.fn.videoFrame = function(options){
    // Unique ID
    var d = new Date();

    // Set options
    var defaults = {
      'autoplay': 1,
      'element': $(this),
      'playing': false,
      'id': 'video' + d.getTime(),
      'container': '.embed-responsive',
      'type': '',
      'src': ''
    };
    options = $.extend(defaults, options);

    // If Video Type Specified
    if( typeof options.element.data('type') !== 'undefined' && ['youtube','vimeo'].indexOf(options.element.data('type').trim()) ){
      options.type = $(this).data('type');
    }

    // If Video Src Specified
    if( options.src.trim() === '' ){
      if (typeof options.element.data('src') !== 'undefined') {
        options.src = $(this).data('src');
      } else if(typeof options.element.attr('href') !== 'undefined') {
        options.src = $(this).attr('href');
      }
    }





    // Inject API
    options.api = function( url, id, callback ){
      // Callback
      if( typeof callback !== 'function' ){
        callback = function(){};
      }

      // Create Variables
      var js, vjs = document.getElementsByTagName('script')[0];

      // If element already exists
      if (document.getElementById(id)){
        // Callback
        callback();

        // Exit
        return;
      }

      // Create Script
      js = document.createElement('script');

      // Set ID
      js.id = id;

      // API Loaded
      js.onload = function(){
        // Callback
        callback();
      };
      js.src = url;
      vjs.parentNode.insertBefore(js, vjs);
    };





    /**
     * YouTube Embed Functions
     */
    options.youtube = function(){
      // Return "youtube.com" video ID
      options.com = function(){
        // Split by "?"
        options.tmp = options.src.split('?')[1];

        // Split all options
        options.tmp = options.tmp.split('&');

        // Loop through parameters
        for( var i=0; i<options.tmp.length; i++ ){
          // Split
          options.param = options.tmp[i].split('=');

          // Return ID
          if( options.param[0] === 'v' && typeof options.param[1] !== 'undefined' ){
            return options.param[1];
          }
        }

        // Default to empty
        return '';
      };



      // Return "Youtu.be" URL
      options.be = function(){
        // Split by domain
        options.tmp = options.src.split('youtu.be/');

        // Return ID
        if( typeof options.tmp[1] !== 'undefined' ){
          return options.tmp[1].split('/')[0];
        }

        return '';
      };



      // Get YouTube Video ID
      options.getVidId = function(){
        // YouTu.be
        if( options.src.indexOf('youtu.be') >= 0 ){
          return options.be();
        }

        // YouTube.com
        else if( options.src.indexOf('youtube.') >= 0 ){
          return options.com();
        }

        return '';
      };



      // iFrame URL
      options.getUrl = function(){
        options.tmp = 'https://www.youtube.com/embed/' + options.getVidId() + '?enablejsapi=1&color=white&iv_load_policy=3&showinfo=0&rel=0';

        // Autoplay?
        if( options.autoplay ){
          options.tmp += '&autoplay=1';
        }

        return options.tmp;
      };



      // State Change Listener
      options.state = function( state ){
        if( state.data === 0 ){
          options.close();
        }
      };



      // Listen to player
      options.listen = function(){
        // Player options
        options.tmp = {'events': {
          'onStateChange': options.state
        }};

        // Autoplay?
        if( options.autoplay ){
          options.tmp.autoplay = 1;
        }

        // Initiate player
        options.player = new YT.Player( options.id, options.tmp);
      };



      // Initiate
      this.init = function(){
        options.vidId = options.getVidId();
        // Inject API with callback function
        options.api( 'https://www.youtube.com/player_api', 'youtube-api', function(){
          // Create Iframe
          options.frame( options.getUrl() );

          // Listen for end
          setTimeout(function(){
            options.listen();
          }, 1000);
        });
      };

      this.init();
    };
    /**
     * End YouTube Embed
     */





    /**
     * Vimeo Embed
     */
    options.vimeo = function(){
      // Get Embed URL
      options.getUrl = function(){
        // Split by domain
        options.tmp = options.src.split('?')[0].split('vimeo.com/');

        // Return URL if ID Set
        if( typeof options.tmp[1] !== 'undefined' ){
          options.tmp = 'https://player.vimeo.com/video/' + options.tmp[1].split('/')[0] + 
            '?api=1&badge=0&byline=0&portrait=0&title=0&color=ffffff&buttons=0&player_id=' + options.id;

          // Autoplay?
          if( options.autoplay ){
            options.tmp += '&autoplay=1';
          }

          return options.tmp;
        }

        return '';
      };

      // Listen for finish
      options.listen = function(){
        // Vimeo API wrapper
        options.player = $f( options.iframe[0] );

        // When the player is ready/loaded, add a finish event listener
        options.player.addEvent('ready', function() {
          options.player.addEvent('finish', function(){
            options.close();
          });
        });
      };

      // Initiate
      this.init = function(){
        // Inject API with callback function
        options.api('//f.vimeocdn.com/js/froogaloop2.min.js', 'vimeo-api', function(){
          // Create Iframe
          options.frame( options.getUrl() );

          // Listen for end
          options.listen();
        });
      };

      // Initialize
      this.init();
    };
    /**
     * End Vimeo Embed
     */





    // Get Embed URL
    options.embed = function(){
      // YouTube
      if( options.type === 'youtube' || options.src.indexOf('youtu') >= 0 ){
        options.youtube();
      }
      // Vimeo
      else if( options.type === 'vimeo' || options.src.indexOf('vimeo') >= 0 ){
        options.vimeo();
      }
    };



    // Close Video
    options.close = function(){
      // Remove "esc" key listener
      options.playing = false;

      // Remove Video
      options.content.stop().animate({'opacity':0}, 250, function(){
        $(this).remove();
        options = {};
      });

      options = {};
    };



    // Initialize close functions
    options.initClose = function(){
      // Playing
      options.playing = true;

      // Listen for "esc" key
      $(window).on('keyup', function(e){
        if( options.playing ){
          if( e.keyCode === 27 ){
            options.close();
          }
        }
      });
    };



    // Append Content
    options.append = function( content ){
      options.content = content;

      // Append Iframe
      if( options.element.parents( options.container ).length > 0 ){
        options.element.parents( options.container ).first().append( content );
      } else {
        $('body').append( options.content );
      }

      // Fade In
      options.content.stop().animate({'opacity':1}, 250);

      // Create close functions
      options.initClose();
    };



    // Create Iframe
    options.frame = function( url ){
      // Return if invalid URL
      if( typeof url === 'undefined' || url === null || url === '' ){
        return;
      }

      // iFrame
      options.iframe = $('<iframe allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen />').attr({
        'src': url,
        'frameborder': '0',
        'id': options.id
      });

      // Create Close Button
      options.tmp = $('<i />').attr({
        'class': 'close'
      }).on('click', function(){
        options.close();
      });

      // Div containing iFrame
      options.tmp = $('<div />').attr({
        'class': 'embed-responsive-item'
      }).css({'opacity':0}).append( options.iframe, options.tmp );

      // Append Content
      options.append( options.tmp );
    };

    // Initialize Embed
    options.embed();
  };
}(jQuery));