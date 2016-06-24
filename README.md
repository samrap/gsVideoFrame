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
