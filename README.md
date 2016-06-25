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

#### src - (string)
The `src` attribute is the URL to view the video. The script will parse YouTube and Vimeo URL's and will create an iFrame embed from them.

Note: YouTube URL's with `.com` and `.be` are currently supported.

#### type - (string)
The video type. Accepted values are: `youtube` and `vimeo`

#### target - (string|jQuery Object)
The target where the video should be embedded. This can either be a selector string (ex: `#gsVideoFrame`) or a jQuery object (ex: `$('#gsVideoFrame')`)

Default `false`. In the default case or if the target cannot be found, the video will be appended to the `body` element.

#### container - (string)
The type of element the iFrame should be wrapped in.

#### containerClass - (string)
Class to be assigned to the container element.

#### closeButton (string|jQuery Object)
A jQuery object to be appended to the iFrames container.

Example:
> $('a.gsVideoFrame').gsVideoFrame({
>     'closeButton': $('<div />').addClass('close')
> });

#### closeButtonClass (string)
Class to be added to closeButton element.

#### autoplay - (boolean)
This parameter determines whether or not the video automatically plays once it is opened



## Events

#### onBeforeOpen()
Called before the frame is embedded.

#### onOpen()
Called when the frame is embedded.

#### onPlay()
Called when the video is played

#### onPause()
Called when the video is paused

#### onBeforeClose()
Called before the video is closed

#### onClose()
Called when the video is closed
