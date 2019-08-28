(function() ***REMOVED***
  var Util,
    __bind = function(fn, me)***REMOVED*** return function()***REMOVED*** return fn.apply(me, arguments); }; };

  Util = (function() ***REMOVED***
    function Util() ***REMOVED***}

    Util.prototype.extend = function(custom, defaults) ***REMOVED***
      var key, value;
      for (key in custom) ***REMOVED***
        value = custom[key];
        if (value != null) ***REMOVED***
          defaults[key] = value;
    ***REMOVED***
  ***REMOVED***
      return defaults;
***REMOVED***;

    Util.prototype.isMobile = function(agent) ***REMOVED***
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
***REMOVED***;

    return Util;

***REMOVED***)();

  this.WOW = (function() ***REMOVED***
    WOW.prototype.defaults = ***REMOVED***
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true
***REMOVED***;

    function WOW(options) ***REMOVED***
      if (options == null) ***REMOVED***
        options = ***REMOVED***};
  ***REMOVED***
      this.scrollCallback = __bind(this.scrollCallback, this);
      this.scrollHandler = __bind(this.scrollHandler, this);
      this.start = __bind(this.start, this);
      this.scrolled = true;
      this.config = this.util().extend(options, this.defaults);
***REMOVED***

    WOW.prototype.init = function() ***REMOVED***
      var _ref;
      this.element = window.document.documentElement;
      this.boxes = this.element.getElementsByClassName(this.config.boxClass);
      if (this.boxes.length) ***REMOVED***
        if (this.disabled()) ***REMOVED***
          return this.resetStyle();
    ***REMOVED*** else ***REMOVED***
          if ((_ref = document.readyState) === "interactive" || _ref === "complete") ***REMOVED***
            return this.start();
      ***REMOVED*** else ***REMOVED***
            return document.addEventListener('DOMContentLoaded', this.start);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***;

    WOW.prototype.start = function() ***REMOVED***
      var box, _i, _len, _ref;
      _ref = this.boxes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) ***REMOVED***
        box = _ref[_i];
        this.applyStyle(box, true);
  ***REMOVED***
      window.addEventListener('scroll', this.scrollHandler, false);
      window.addEventListener('resize', this.scrollHandler, false);
      return this.interval = setInterval(this.scrollCallback, 50);
***REMOVED***;

    WOW.prototype.stop = function() ***REMOVED***
      window.removeEventListener('scroll', this.scrollHandler, false);
      window.removeEventListener('resize', this.scrollHandler, false);
      if (this.interval != null) ***REMOVED***
        return clearInterval(this.interval);
  ***REMOVED***
***REMOVED***;

    WOW.prototype.show = function(box) ***REMOVED***
      this.applyStyle(box);
      return box.className = "" + box.className + " " + this.config.animateClass;
***REMOVED***;

    WOW.prototype.applyStyle = function(box, hidden) ***REMOVED***
      var delay, duration, iteration;
      duration = box.getAttribute('data-wow-duration');
      delay = box.getAttribute('data-wow-delay');
      iteration = box.getAttribute('data-wow-iteration');
      return box.setAttribute('style', this.customStyle(hidden, duration, delay, iteration));
***REMOVED***;

    WOW.prototype.resetStyle = function() ***REMOVED***
      var box, _i, _len, _ref, _results;
      _ref = this.boxes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) ***REMOVED***
        box = _ref[_i];
        _results.push(box.setAttribute('style', 'visibility: visible;'));
  ***REMOVED***
      return _results;
***REMOVED***;

    WOW.prototype.customStyle = function(hidden, duration, delay, iteration) ***REMOVED***
      var style;
      style = hidden ? "visibility: hidden; -webkit-animation-name: none; -moz-animation-name: none; animation-name: none;" : "visibility: visible;";
      if (duration) ***REMOVED***
        style += "-webkit-animation-duration: " + duration + "; -moz-animation-duration: " + duration + "; animation-duration: " + duration + ";";
  ***REMOVED***
      if (delay) ***REMOVED***
        style += "-webkit-animation-delay: " + delay + "; -moz-animation-delay: " + delay + "; animation-delay: " + delay + ";";
  ***REMOVED***
      if (iteration) ***REMOVED***
        style += "-webkit-animation-iteration-count: " + iteration + "; -moz-animation-iteration-count: " + iteration + "; animation-iteration-count: " + iteration + ";";
  ***REMOVED***
      return style;
***REMOVED***;

    WOW.prototype.scrollHandler = function() ***REMOVED***
      return this.scrolled = true;
***REMOVED***;

    WOW.prototype.scrollCallback = function() ***REMOVED***
      var box;
      if (this.scrolled) ***REMOVED***
        this.scrolled = false;
        this.boxes = (function() ***REMOVED***
          var _i, _len, _ref, _results;
          _ref = this.boxes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) ***REMOVED***
            box = _ref[_i];
            if (!(box)) ***REMOVED***
              continue;
        ***REMOVED***
            if (this.isVisible(box)) ***REMOVED***
              this.show(box);
              continue;
        ***REMOVED***
            _results.push(box);
      ***REMOVED***
          return _results;
    ***REMOVED***).call(this);
        if (!this.boxes.length) ***REMOVED***
          return this.stop();
    ***REMOVED***
  ***REMOVED***
***REMOVED***;

    WOW.prototype.offsetTop = function(element) ***REMOVED***
      var top;
      top = element.offsetTop;
      while (element = element.offsetParent) ***REMOVED***
        top += element.offsetTop;
  ***REMOVED***
      return top;
***REMOVED***;

    WOW.prototype.isVisible = function(box) ***REMOVED***
      var bottom, offset, top, viewBottom, viewTop;
      offset = box.getAttribute('data-wow-offset') || this.config.offset;
      viewTop = window.pageYOffset;
      viewBottom = viewTop + this.element.clientHeight - offset;
      top = this.offsetTop(box);
      bottom = top + box.clientHeight;
      return top <= viewBottom && bottom >= viewTop;
***REMOVED***;

    WOW.prototype.util = function() ***REMOVED***
      return this._util || (this._util = new Util());
***REMOVED***;

    WOW.prototype.disabled = function() ***REMOVED***
      return this.config.mobile === false && this.util().isMobile(navigator.userAgent);
***REMOVED***;

    return WOW;

***REMOVED***)();

}).call(this);
