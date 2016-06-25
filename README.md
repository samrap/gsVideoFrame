# Gigasavvy VideoFrame jQuery Plugin
Iframe embedded popups for common Video providers

## Install with Bower

```bower install --save gsVideoFrame```



## Usage

Include jQuery

```<script type="text/javascript" src="//code.jquery.com/jquery-3.0.0.min.js"></script>```

Include gsVideoFrame

```<script type="text/javascript" src="./dist/gsVideoFrame.min.js"></script>```



## Options

  - **src** ([string](http://api.jquery.com/Types/#String))
    - The `src` attribute is the URL to view the video.
      - The script will parse YouTube and Vimeo URL's and will create an iFrame embed from them.
      - _**Note:**_ YouTube URL's with `.com` and `.be` are currently supported.
  - **type** ([string](http://api.jquery.com/Types/#String))
    - The video type. Accepted values are: `youtube` and `vimeo`
  - **target** ([string](http://api.jquery.com/Types/#String) | jQuery [object](http://api.jquery.com/Types/#Object)) [Default `false`]
    - The target where the video should be embedded.
      - This can be a selector string (ex: `"#gsVideoFrame"`)
      - Or this can be a jQuery object (ex: `$('#gsVideoFrame')`).
      - In the default case `false` or if the target cannot be found, the video will be appended to the `body` element.
  - **container** ([string](http://api.jquery.com/Types/#String)) [Default `div`]
    - The type of element the iFrame should be wrapped in.
  - **containerClass** ([string](http://api.jquery.com/Types/#String))
    - Class to be assigned to the container element.
  - **closeButton** ([string](http://api.jquery.com/Types/#String) | jQuery [object](http://api.jquery.com/Types/#Object))
    - A jQuery object to be appended to the iFrames container.
      - Example: `$('a.gsVideoFrame').gsVideoFrame({'closeButton': $('<div />').addClass('close')});`
  - **closeButtonClass** ([string](http://api.jquery.com/Types/#String))
    - Class to be added to closeButton element.
  - **autoplay** ([boolean](http://api.jquery.com/Types/#Boolean))
    - This parameter determines whether or not the video automatically plays once it is opened



## Events

  - **onBeforeOpen()** ([function](http://api.jquery.com/Types/#Function))
    - Called before the frame is embedded.
  - **onOpen()** ([function](http://api.jquery.com/Types/#Function))
    - Called when the frame is embedded.
  - **onPlay()** ([function](http://api.jquery.com/Types/#Function))
    - Called when the video is played
  - **onPause()** ([function](http://api.jquery.com/Types/#Function))
    - Called when the video is paused
  - **onBeforeClose()** ([function](http://api.jquery.com/Types/#Function))
    - Called before the video is closed
  - **onClose()** ([function](http://api.jquery.com/Types/#Function))
    - Called when the video is closed
