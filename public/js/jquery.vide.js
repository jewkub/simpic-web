/*
 *  Vide - v0.5.1
 *  Easy as hell jQuery plugin for video backgrounds.
 *  http://vodkabears.github.io/vide/
 *
 *  Made by Ilya Makarov
 *  Under MIT License
 */
!(function(root, factory) ***REMOVED***
  if (typeof define === 'function' && define.amd) ***REMOVED***
    define(['jquery'], factory);
***REMOVED*** else if (typeof exports === 'object') ***REMOVED***
    factory(require('jquery'));
***REMOVED*** else ***REMOVED***
    factory(root.jQuery);
***REMOVED***
})(this, function($) ***REMOVED***

  'use strict';

  /**
   * Name of the plugin
   * @private
   * @const
   * @type ***REMOVED***String}
   */
  var PLUGIN_NAME = 'vide';

  /**
   * Default settings
   * @private
   * @const
   * @type ***REMOVED***Object}
   */
  var DEFAULTS = ***REMOVED***
    volume: 1,
    playbackRate: 1,
    muted: true,
    loop: true,
    autoplay: true,
    position: '50% 50%',
    posterType: 'detect',
    resizing: true,
    bgColor: 'transparent',
    className: ''
***REMOVED***;

  /**
   * Not implemented error message
   * @private
   * @const
   * @type ***REMOVED***String}
   */
  var NOT_IMPLEMENTED_MSG = 'Not implemented';

  /**
   * Parse a string with options
   * @private
   * @param ***REMOVED***String} str
   * @returns ***REMOVED***Object|String}
   */
  function parseOptions(str) ***REMOVED***
    var obj = ***REMOVED***};
    var delimiterIndex;
    var option;
    var prop;
    var val;
    var arr;
    var len;
    var i;

    // Remove spaces around delimiters and split
    arr = str.replace(/\s*:\s*/g, ':').replace(/\s*,\s*/g, ',').split(',');

    // Parse a string
    for (i = 0, len = arr.length; i < len; i++) ***REMOVED***
      option = arr[i];

      // Ignore urls and a string without colon delimiters
      if (
        option.search(/^(http|https|ftp):\/\//) !== -1 ||
        option.search(':') === -1
      ) ***REMOVED***
        break;
  ***REMOVED***

      delimiterIndex = option.indexOf(':');
      prop = option.substring(0, delimiterIndex);
      val = option.substring(delimiterIndex + 1);

      // If val is an empty string, make it undefined
      if (!val) ***REMOVED***
        val = undefined;
  ***REMOVED***

      // Convert a string value if it is like a boolean
      if (typeof val === 'string') ***REMOVED***
        val = val === 'true' || (val === 'false' ? false : val);
  ***REMOVED***

      // Convert a string value if it is like a number
      if (typeof val === 'string') ***REMOVED***
        val = !isNaN(val) ? +val : val;
  ***REMOVED***

      obj[prop] = val;
***REMOVED***

    // If nothing is parsed
    if (prop == null && val == null) ***REMOVED***
      return str;
***REMOVED***

    return obj;
***REMOVED***

  /**
   * Parse a position option
   * @private
   * @param ***REMOVED***String} str
   * @returns ***REMOVED***Object}
   */
  function parsePosition(str) ***REMOVED***
    str = '' + str;

    // Default value is a center
    var args = str.split(/\s+/);
    var x = '50%';
    var y = '50%';
    var len;
    var arg;
    var i;

    for (i = 0, len = args.length; i < len; i++) ***REMOVED***
      arg = args[i];

      // Convert values
      if (arg === 'left') ***REMOVED***
        x = '0%';
  ***REMOVED*** else if (arg === 'right') ***REMOVED***
        x = '100%';
  ***REMOVED*** else if (arg === 'top') ***REMOVED***
        y = '0%';
  ***REMOVED*** else if (arg === 'bottom') ***REMOVED***
        y = '100%';
  ***REMOVED*** else if (arg === 'center') ***REMOVED***
        if (i === 0) ***REMOVED***
          x = '50%';
    ***REMOVED*** else ***REMOVED***
          y = '50%';
    ***REMOVED***
  ***REMOVED*** else ***REMOVED***
        if (i === 0) ***REMOVED***
          x = arg;
    ***REMOVED*** else ***REMOVED***
          y = arg;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    return ***REMOVED*** x: x, y: y };
***REMOVED***

  /**
   * Search a poster
   * @private
   * @param ***REMOVED***String} path
   * @param ***REMOVED***Function} callback
   */
  function findPoster(path, callback) ***REMOVED***
    var onLoad = function() ***REMOVED***
      callback(this.src);
***REMOVED***;

***REMOVED***

  /**
   * Vide constructor
   * @param ***REMOVED***HTMLElement} element
   * @param ***REMOVED***Object|String} path
   * @param ***REMOVED***Object|String} options
   * @constructor
   */
  function Vide(element, path, options) ***REMOVED***
    this.$element = $(element);

    // Parse path
    if (typeof path === 'string') ***REMOVED***
      path = parseOptions(path);
***REMOVED***

    // Parse options
    if (!options) ***REMOVED***
      options = ***REMOVED***};
***REMOVED*** else if (typeof options === 'string') ***REMOVED***
      options = parseOptions(options);
***REMOVED***

    // Remove an extension
    if (typeof path === 'string') ***REMOVED***
      path = path.replace(/\.\w*$/, '');
***REMOVED*** else if (typeof path === 'object') ***REMOVED***
      for (var i in path) ***REMOVED***
        if (path.hasOwnProperty(i)) ***REMOVED***
          path[i] = path[i].replace(/\.\w*$/, '');
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    this.settings = $.extend(***REMOVED***}, DEFAULTS, options);
    this.path = path;

    // https://github.com/VodkaBears/Vide/issues/110
    try ***REMOVED***
      this.init();
***REMOVED*** catch (e) ***REMOVED***
      if (e.message !== NOT_IMPLEMENTED_MSG) ***REMOVED***
        throw e;
  ***REMOVED***
***REMOVED***
***REMOVED***

  /**
   * Initialization
   * @public
   */
  Vide.prototype.init = function() ***REMOVED***
    var vide = this;
    var path = vide.path;
    var poster = path;
    var sources = '';
    var $element = vide.$element;
    var settings = vide.settings;
    var position = parsePosition(settings.position);
    var posterType = settings.posterType;
    var $video;
    var $wrapper;

    // Set styles of a video wrapper
    $wrapper = vide.$wrapper = $('<div>')
      .addClass(settings.className)
      .css(***REMOVED***
        position: 'absolute',
        'z-index': -1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        '-webkit-background-size': 'cover',
        '-moz-background-size': 'cover',
        '-o-background-size': 'cover',
        'background-size': 'cover',
        'background-color': settings.bgColor,
        'background-repeat': 'no-repeat',
        'background-position': position.x + ' ' + position.y
  ***REMOVED***);

    // Get a poster path
    if (typeof path === 'object') ***REMOVED***
      if (path.poster) ***REMOVED***
        poster = path.poster;
  ***REMOVED*** else ***REMOVED***
        if (path.mp4) ***REMOVED***
          poster = path.mp4;
    ***REMOVED*** else if (path.webm) ***REMOVED***
          poster = path.webm;
    ***REMOVED*** else if (path.ogv) ***REMOVED***
          poster = path.ogv;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    // Set a video poster
    if (posterType === 'detect') ***REMOVED***
      findPoster(poster, function(url) ***REMOVED***
        $wrapper.css('background-image', 'url(' + url + ')');
  ***REMOVED***);
***REMOVED*** else if (posterType !== 'none') ***REMOVED***
      $wrapper.css('background-image', 'url(' + poster + '.' + posterType + ')');
***REMOVED***

    // If a parent element has a static position, make it relative
    if ($element.css('position') === 'static') ***REMOVED***
      $element.css('position', 'static');
***REMOVED***

    $element.prepend($wrapper);

    if (typeof path === 'object') ***REMOVED***
      if (path.mp4) ***REMOVED***
        sources += '<source src="' + path.mp4 + '.mp4" type="video/mp4">';
  ***REMOVED***

      if (path.webm) ***REMOVED***
        sources += '<source src="' + path.webm + '.webm" type="video/webm">';
  ***REMOVED***

      if (path.ogv) ***REMOVED***
        sources += '<source src="' + path.ogv + '.ogv" type="video/ogg">';
  ***REMOVED***

      $video = vide.$video = $('<video>' + sources + '</video>');
***REMOVED*** else ***REMOVED***
      $video = vide.$video = $('<video>' +
        '<source src="' + path + '.mp4" type="video/mp4">' +
        '<source src="' + path + '.webm" type="video/webm">' +
        '<source src="' + path + '.ogv" type="video/ogg">' +
        '</video>');
***REMOVED***

    // https://github.com/VodkaBears/Vide/issues/110
    try ***REMOVED***
      $video

        // Set video properties
        .prop(***REMOVED***
          autoplay: settings.autoplay,
          loop: settings.loop,
          volume: settings.volume,
          muted: settings.muted,
          defaultMuted: settings.muted,
          playbackRate: settings.playbackRate,
          defaultPlaybackRate: settings.playbackRate
    ***REMOVED***);
***REMOVED*** catch (e) ***REMOVED***
      throw new Error(NOT_IMPLEMENTED_MSG);
***REMOVED***

    // Video alignment
    $video.css(***REMOVED***
      margin: 'auto',
      position: 'absolute',
      'z-index': -1,
      top: position.y,
      left: position.x,
      '-webkit-transform': 'translate(-' + position.x + ', -' + position.y + ')',
      '-ms-transform': 'translate(-' + position.x + ', -' + position.y + ')',
      '-moz-transform': 'translate(-' + position.x + ', -' + position.y + ')',
      transform: 'translate(-' + position.x + ', -' + position.y + ')',

      // Disable visibility, while loading
      visibility: 'hidden',
      opacity: 0
***REMOVED***)

    // Resize a video, when it's loaded
    .one('canplaythrough.' + PLUGIN_NAME, function() ***REMOVED***
      vide.resize();
***REMOVED***)

    // Make it visible, when it's already playing
    .one('playing.' + PLUGIN_NAME, function() ***REMOVED***
      $video.css(***REMOVED***
        visibility: 'visible',
        opacity: 1
  ***REMOVED***);
      $wrapper.css('background-image', 'none');
***REMOVED***);

    // Resize event is available only for 'window'
    // Use another code solutions to detect DOM elements resizing
    $element.on('resize.' + PLUGIN_NAME, function() ***REMOVED***
      if (settings.resizing) ***REMOVED***
        vide.resize();
  ***REMOVED***
***REMOVED***);

    // Append a video
    $wrapper.append($video);
***REMOVED***;

  /**
   * Get a video element
   * @public
   * @returns ***REMOVED***HTMLVideoElement}
   */
  Vide.prototype.getVideoObject = function() ***REMOVED***
    return this.$video[0];
***REMOVED***;

  /**
   * Resize a video background
   * @public
   */
  Vide.prototype.resize = function() ***REMOVED***
    if (!this.$video) ***REMOVED***
      return;
***REMOVED***

    var $wrapper = this.$wrapper;
    var $video = this.$video;
    var video = $video[0];

    // Get a native video size
    var videoHeight = video.videoHeight;
    var videoWidth = video.videoWidth;

    // Get a wrapper size
    var wrapperHeight = $wrapper.height();
    var wrapperWidth = $wrapper.width();

    if (wrapperWidth / videoWidth > wrapperHeight / videoHeight) ***REMOVED***
      $video.css(***REMOVED***

        // +2 pixels to prevent an empty space after transformation
        width: wrapperWidth + 2,
        height: 'auto'
  ***REMOVED***);
***REMOVED*** else ***REMOVED***
      $video.css(***REMOVED***
        width: 'auto',

        // +2 pixels to prevent an empty space after transformation
        height: wrapperHeight + 2
  ***REMOVED***);
***REMOVED***
***REMOVED***;

  /**
   * Destroy a video background
   * @public
   */
  Vide.prototype.destroy = function() ***REMOVED***
    delete $[PLUGIN_NAME].lookup[this.index];
    this.$video && this.$video.off(PLUGIN_NAME);
    this.$element.off(PLUGIN_NAME).removeData(PLUGIN_NAME);
    this.$wrapper.remove();
***REMOVED***;

  /**
   * Special plugin object for instances.
   * @public
   * @type ***REMOVED***Object}
   */
  $[PLUGIN_NAME] = ***REMOVED***
    lookup: []
***REMOVED***;

  /**
   * Plugin constructor
   * @param ***REMOVED***Object|String} path
   * @param ***REMOVED***Object|String} options
   * @returns ***REMOVED***JQuery}
   * @constructor
   */
  $.fn[PLUGIN_NAME] = function(path, options) ***REMOVED***
    var instance;

    this.each(function() ***REMOVED***
      instance = $.data(this, PLUGIN_NAME);

      // Destroy the plugin instance if exists
      instance && instance.destroy();

      // Create the plugin instance
      instance = new Vide(this, path, options);
      instance.index = $[PLUGIN_NAME].lookup.push(instance) - 1;
      $.data(this, PLUGIN_NAME, instance);
***REMOVED***);

    return this;
***REMOVED***;

  $(document).ready(function() ***REMOVED***
    var $window = $(window);

    // Window resize event listener
    $window.on('resize.' + PLUGIN_NAME, function() ***REMOVED***
      for (var len = $[PLUGIN_NAME].lookup.length, i = 0, instance; i < len; i++) ***REMOVED***
        instance = $[PLUGIN_NAME].lookup[i];

        if (instance && instance.settings.resizing) ***REMOVED***
          instance.resize();
    ***REMOVED***
  ***REMOVED***
***REMOVED***);

    // https://github.com/VodkaBears/Vide/issues/68
    $window.on('unload.' + PLUGIN_NAME, function() ***REMOVED***
      return false;
***REMOVED***);

    // Auto initialization
    // Add 'data-vide-bg' attribute with a path to the video without extension
    // Also you can pass options throw the 'data-vide-options' attribute
    // 'data-vide-options' must be like 'muted: false, volume: 0.5'
    $(document).find('[data-' + PLUGIN_NAME + '-bg]').each(function(i, element) ***REMOVED***
      var $element = $(element);
      var options = $element.data(PLUGIN_NAME + '-options');
      var path = $element.data(PLUGIN_NAME + '-bg');

      $element[PLUGIN_NAME](path, options);
***REMOVED***);
***REMOVED***);

});
