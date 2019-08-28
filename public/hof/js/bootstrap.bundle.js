/*!
  * Bootstrap v4.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) ***REMOVED***
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (factory((global.bootstrap = ***REMOVED***}),global.jQuery));
}(this, (function (exports,$) ***REMOVED*** 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function _defineProperties(target, props) ***REMOVED***
    for (var i = 0; i < props.length; i++) ***REMOVED***
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
***REMOVED***
***REMOVED***

  function _createClass(Constructor, protoProps, staticProps) ***REMOVED***
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
***REMOVED***

  function _defineProperty(obj, key, value) ***REMOVED***
    if (key in obj) ***REMOVED***
      Object.defineProperty(obj, key, ***REMOVED***
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
  ***REMOVED***);
***REMOVED*** else ***REMOVED***
      obj[key] = value;
***REMOVED***

    return obj;
***REMOVED***

  function _objectSpread(target) ***REMOVED***
    for (var i = 1; i < arguments.length; i++) ***REMOVED***
      var source = arguments[i] != null ? arguments[i] : ***REMOVED***};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') ***REMOVED***
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) ***REMOVED***
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
    ***REMOVED***));
  ***REMOVED***

      ownKeys.forEach(function (key) ***REMOVED***
        _defineProperty(target, key, source[key]);
  ***REMOVED***);
***REMOVED***

    return target;
***REMOVED***

  function _inheritsLoose(subClass, superClass) ***REMOVED***
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
***REMOVED***

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Util = function ($$$1) ***REMOVED***
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */
    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

    function toType(obj) ***REMOVED***
      return ***REMOVED***}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
***REMOVED***

    function getSpecialTransitionEndEvent() ***REMOVED***
      return ***REMOVED***
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) ***REMOVED***
          if ($$$1(event.target).is(this)) ***REMOVED***
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
      ***REMOVED***

          return undefined; // eslint-disable-line no-undefined
    ***REMOVED***
  ***REMOVED***;
***REMOVED***

    function transitionEndEmulator(duration) ***REMOVED***
      var _this = this;

      var called = false;
      $$$1(this).one(Util.TRANSITION_END, function () ***REMOVED***
        called = true;
  ***REMOVED***);
      setTimeout(function () ***REMOVED***
        if (!called) ***REMOVED***
          Util.triggerTransitionEnd(_this);
    ***REMOVED***
  ***REMOVED***, duration);
      return this;
***REMOVED***

    function setTransitionEndSupport() ***REMOVED***
      $$$1.fn.emulateTransitionEnd = transitionEndEmulator;
      $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
***REMOVED***
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */


    var Util = ***REMOVED***
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function getUID(prefix) ***REMOVED***
        do ***REMOVED***
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
    ***REMOVED*** while (document.getElementById(prefix));

        return prefix;
  ***REMOVED***,
      getSelectorFromElement: function getSelectorFromElement(element) ***REMOVED***
        var selector = element.getAttribute('data-target');

        if (!selector || selector === '#') ***REMOVED***
          selector = element.getAttribute('href') || '';
    ***REMOVED***

        try ***REMOVED***
          return document.querySelector(selector) ? selector : null;
    ***REMOVED*** catch (err) ***REMOVED***
          return null;
    ***REMOVED***
  ***REMOVED***,
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) ***REMOVED***
        if (!element) ***REMOVED***
          return 0;
    ***REMOVED*** // Get transition-duration of the element


        var transitionDuration = $$$1(element).css('transition-duration');
        var floatTransitionDuration = parseFloat(transitionDuration); // Return 0 if element or transition duration is not found

        if (!floatTransitionDuration) ***REMOVED***
          return 0;
    ***REMOVED*** // If multiple durations are defined, take the first


        transitionDuration = transitionDuration.split(',')[0];
        return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
  ***REMOVED***,
      reflow: function reflow(element) ***REMOVED***
        return element.offsetHeight;
  ***REMOVED***,
      triggerTransitionEnd: function triggerTransitionEnd(element) ***REMOVED***
        $$$1(element).trigger(TRANSITION_END);
  ***REMOVED***,
      // TODO: Remove in v5
      supportsTransitionEnd: function supportsTransitionEnd() ***REMOVED***
        return Boolean(TRANSITION_END);
  ***REMOVED***,
      isElement: function isElement(obj) ***REMOVED***
        return (obj[0] || obj).nodeType;
  ***REMOVED***,
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) ***REMOVED***
        for (var property in configTypes) ***REMOVED***
          if (Object.prototype.hasOwnProperty.call(configTypes, property)) ***REMOVED***
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && Util.isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) ***REMOVED***
              throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***;
    setTransitionEndSupport();
    return Util;
***REMOVED***($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Alert = function ($$$1) ***REMOVED***
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'alert';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Selector = ***REMOVED***
      DISMISS: '[data-dismiss="alert"]'
***REMOVED***;
    var Event = ***REMOVED***
      CLOSE: "close" + EVENT_KEY,
      CLOSED: "closed" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
***REMOVED***;
    var ClassName = ***REMOVED***
      ALERT: 'alert',
      FADE: 'fade',
      SHOW: 'show'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

***REMOVED***;

    var Alert =
    /*#__PURE__*/
    function () ***REMOVED***
      function Alert(element) ***REMOVED***
        this._element = element;
  ***REMOVED*** // Getters


      var _proto = Alert.prototype;

      // Public
      _proto.close = function close(element) ***REMOVED***
        var rootElement = this._element;

        if (element) ***REMOVED***
          rootElement = this._getRootElement(element);
    ***REMOVED***

        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) ***REMOVED***
          return;
    ***REMOVED***

        this._removeElement(rootElement);
  ***REMOVED***;

      _proto.dispose = function dispose() ***REMOVED***
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
  ***REMOVED***; // Private


      _proto._getRootElement = function _getRootElement(element) ***REMOVED***
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) ***REMOVED***
          parent = document.querySelector(selector);
    ***REMOVED***

        if (!parent) ***REMOVED***
          parent = $$$1(element).closest("." + ClassName.ALERT)[0];
    ***REMOVED***

        return parent;
  ***REMOVED***;

      _proto._triggerCloseEvent = function _triggerCloseEvent(element) ***REMOVED***
        var closeEvent = $$$1.Event(Event.CLOSE);
        $$$1(element).trigger(closeEvent);
        return closeEvent;
  ***REMOVED***;

      _proto._removeElement = function _removeElement(element) ***REMOVED***
        var _this = this;

        $$$1(element).removeClass(ClassName.SHOW);

        if (!$$$1(element).hasClass(ClassName.FADE)) ***REMOVED***
          this._destroyElement(element);

          return;
    ***REMOVED***

        var transitionDuration = Util.getTransitionDurationFromElement(element);
        $$$1(element).one(Util.TRANSITION_END, function (event) ***REMOVED***
          return _this._destroyElement(element, event);
    ***REMOVED***).emulateTransitionEnd(transitionDuration);
  ***REMOVED***;

      _proto._destroyElement = function _destroyElement(element) ***REMOVED***
        $$$1(element).detach().trigger(Event.CLOSED).remove();
  ***REMOVED***; // Static


      Alert._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
        return this.each(function () ***REMOVED***
          var $element = $$$1(this);
          var data = $element.data(DATA_KEY);

          if (!data) ***REMOVED***
            data = new Alert(this);
            $element.data(DATA_KEY, data);
      ***REMOVED***

          if (config === 'close') ***REMOVED***
            data[config](this);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

      Alert._handleDismiss = function _handleDismiss(alertInstance) ***REMOVED***
        return function (event) ***REMOVED***
          if (event) ***REMOVED***
            event.preventDefault();
      ***REMOVED***

          alertInstance.close(this);
    ***REMOVED***;
  ***REMOVED***;

      _createClass(Alert, null, [***REMOVED***
        key: "VERSION",
        get: function get() ***REMOVED***
          return VERSION;
    ***REMOVED***
  ***REMOVED***]);

      return Alert;
***REMOVED***();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Alert._jQueryInterface;
    $$$1.fn[NAME].Constructor = Alert;

    $$$1.fn[NAME].noConflict = function () ***REMOVED***
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
***REMOVED***;

    return Alert;
***REMOVED***($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Button = function ($$$1) ***REMOVED***
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'button';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ClassName = ***REMOVED***
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
***REMOVED***;
    var Selector = ***REMOVED***
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input',
      ACTIVE: '.active',
      BUTTON: '.btn'
***REMOVED***;
    var Event = ***REMOVED***
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

***REMOVED***;

    var Button =
    /*#__PURE__*/
    function () ***REMOVED***
      function Button(element) ***REMOVED***
        this._element = element;
  ***REMOVED*** // Getters


      var _proto = Button.prototype;

      // Public
      _proto.toggle = function toggle() ***REMOVED***
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $$$1(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) ***REMOVED***
          var input = this._element.querySelector(Selector.INPUT);

          if (input) ***REMOVED***
            if (input.type === 'radio') ***REMOVED***
              if (input.checked && this._element.classList.contains(ClassName.ACTIVE)) ***REMOVED***
                triggerChangeEvent = false;
          ***REMOVED*** else ***REMOVED***
                var activeElement = rootElement.querySelector(Selector.ACTIVE);

                if (activeElement) ***REMOVED***
                  $$$1(activeElement).removeClass(ClassName.ACTIVE);
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***

            if (triggerChangeEvent) ***REMOVED***
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) ***REMOVED***
                return;
          ***REMOVED***

              input.checked = !this._element.classList.contains(ClassName.ACTIVE);
              $$$1(input).trigger('change');
        ***REMOVED***

            input.focus();
            addAriaPressed = false;
      ***REMOVED***
    ***REMOVED***

        if (addAriaPressed) ***REMOVED***
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName.ACTIVE));
    ***REMOVED***

        if (triggerChangeEvent) ***REMOVED***
          $$$1(this._element).toggleClass(ClassName.ACTIVE);
    ***REMOVED***
  ***REMOVED***;

      _proto.dispose = function dispose() ***REMOVED***
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
  ***REMOVED***; // Static


      Button._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
        return this.each(function () ***REMOVED***
          var data = $$$1(this).data(DATA_KEY);

          if (!data) ***REMOVED***
            data = new Button(this);
            $$$1(this).data(DATA_KEY, data);
      ***REMOVED***

          if (config === 'toggle') ***REMOVED***
            data[config]();
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

      _createClass(Button, null, [***REMOVED***
        key: "VERSION",
        get: function get() ***REMOVED***
          return VERSION;
    ***REMOVED***
  ***REMOVED***]);

      return Button;
***REMOVED***();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) ***REMOVED***
      event.preventDefault();
      var button = event.target;

      if (!$$$1(button).hasClass(ClassName.BUTTON)) ***REMOVED***
        button = $$$1(button).closest(Selector.BUTTON);
  ***REMOVED***

      Button._jQueryInterface.call($$$1(button), 'toggle');
***REMOVED***).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) ***REMOVED***
      var button = $$$1(event.target).closest(Selector.BUTTON)[0];
      $$$1(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
***REMOVED***);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Button._jQueryInterface;
    $$$1.fn[NAME].Constructor = Button;

    $$$1.fn[NAME].noConflict = function () ***REMOVED***
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
***REMOVED***;

    return Button;
***REMOVED***($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Carousel = function ($$$1) ***REMOVED***
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'carousel';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.carousel';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

    var Default = ***REMOVED***
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
***REMOVED***;
    var DefaultType = ***REMOVED***
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
***REMOVED***;
    var Direction = ***REMOVED***
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right'
***REMOVED***;
    var Event = ***REMOVED***
      SLIDE: "slide" + EVENT_KEY,
      SLID: "slid" + EVENT_KEY,
      KEYDOWN: "keydown" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY,
      TOUCHEND: "touchend" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
***REMOVED***;
    var ClassName = ***REMOVED***
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'carousel-item-right',
      LEFT: 'carousel-item-left',
      NEXT: 'carousel-item-next',
      PREV: 'carousel-item-prev',
      ITEM: 'carousel-item'
***REMOVED***;
    var Selector = ***REMOVED***
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

***REMOVED***;

    var Carousel =
    /*#__PURE__*/
    function () ***REMOVED***
      function Carousel(element, config) ***REMOVED***
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this._config = this._getConfig(config);
        this._element = $$$1(element)[0];
        this._indicatorsElement = this._element.querySelector(Selector.INDICATORS);

        this._addEventListeners();
  ***REMOVED*** // Getters


      var _proto = Carousel.prototype;

      // Public
      _proto.next = function next() ***REMOVED***
        if (!this._isSliding) ***REMOVED***
          this._slide(Direction.NEXT);
    ***REMOVED***
  ***REMOVED***;

      _proto.nextWhenVisible = function nextWhenVisible() ***REMOVED***
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') ***REMOVED***
          this.next();
    ***REMOVED***
  ***REMOVED***;

      _proto.prev = function prev() ***REMOVED***
        if (!this._isSliding) ***REMOVED***
          this._slide(Direction.PREV);
    ***REMOVED***
  ***REMOVED***;

      _proto.pause = function pause(event) ***REMOVED***
        if (!event) ***REMOVED***
          this._isPaused = true;
    ***REMOVED***

        if (this._element.querySelector(Selector.NEXT_PREV)) ***REMOVED***
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
    ***REMOVED***

        clearInterval(this._interval);
        this._interval = null;
  ***REMOVED***;

      _proto.cycle = function cycle(event) ***REMOVED***
        if (!event) ***REMOVED***
          this._isPaused = false;
    ***REMOVED***

        if (this._interval) ***REMOVED***
          clearInterval(this._interval);
          this._interval = null;
    ***REMOVED***

        if (this._config.interval && !this._isPaused) ***REMOVED***
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
    ***REMOVED***
  ***REMOVED***;

      _proto.to = function to(index) ***REMOVED***
        var _this = this;

        this._activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) ***REMOVED***
          return;
    ***REMOVED***

        if (this._isSliding) ***REMOVED***
          $$$1(this._element).one(Event.SLID, function () ***REMOVED***
            return _this.to(index);
      ***REMOVED***);
          return;
    ***REMOVED***

        if (activeIndex === index) ***REMOVED***
          this.pause();
          this.cycle();
          return;
    ***REMOVED***

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

        this._slide(direction, this._items[index]);
  ***REMOVED***;

      _proto.dispose = function dispose() ***REMOVED***
        $$$1(this._element).off(EVENT_KEY);
        $$$1.removeData(this._element, DATA_KEY);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
  ***REMOVED***; // Private


      _proto._getConfig = function _getConfig(config) ***REMOVED***
        config = _objectSpread(***REMOVED***}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
  ***REMOVED***;

      _proto._addEventListeners = function _addEventListeners() ***REMOVED***
        var _this2 = this;

        if (this._config.keyboard) ***REMOVED***
          $$$1(this._element).on(Event.KEYDOWN, function (event) ***REMOVED***
            return _this2._keydown(event);
      ***REMOVED***);
    ***REMOVED***

        if (this._config.pause === 'hover') ***REMOVED***
          $$$1(this._element).on(Event.MOUSEENTER, function (event) ***REMOVED***
            return _this2.pause(event);
      ***REMOVED***).on(Event.MOUSELEAVE, function (event) ***REMOVED***
            return _this2.cycle(event);
      ***REMOVED***);

          if ('ontouchstart' in document.documentElement) ***REMOVED***
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            $$$1(this._element).on(Event.TOUCHEND, function () ***REMOVED***
              _this2.pause();

              if (_this2.touchTimeout) ***REMOVED***
                clearTimeout(_this2.touchTimeout);
          ***REMOVED***

              _this2.touchTimeout = setTimeout(function (event) ***REMOVED***
                return _this2.cycle(event);
          ***REMOVED***, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
        ***REMOVED***);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;

      _proto._keydown = function _keydown(event) ***REMOVED***
        if (/input|textarea/i.test(event.target.tagName)) ***REMOVED***
          return;
    ***REMOVED***

        switch (event.which) ***REMOVED***
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;

          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;

          default:
    ***REMOVED***
  ***REMOVED***;

      _proto._getItemIndex = function _getItemIndex(element) ***REMOVED***
        this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector.ITEM)) : [];
        return this._items.indexOf(element);
  ***REMOVED***;

      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) ***REMOVED***
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;

        var activeIndex = this._getItemIndex(activeElement);

        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) ***REMOVED***
          return activeElement;
    ***REMOVED***

        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;
        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
  ***REMOVED***;

      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) ***REMOVED***
        var targetIndex = this._getItemIndex(relatedTarget);

        var fromIndex = this._getItemIndex(this._element.querySelector(Selector.ACTIVE_ITEM));

        var slideEvent = $$$1.Event(Event.SLIDE, ***REMOVED***
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
    ***REMOVED***);
        $$$1(this._element).trigger(slideEvent);
        return slideEvent;
  ***REMOVED***;

      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) ***REMOVED***
        if (this._indicatorsElement) ***REMOVED***
          var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector.ACTIVE));
          $$$1(indicators).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) ***REMOVED***
            $$$1(nextIndicator).addClass(ClassName.ACTIVE);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;

      _proto._slide = function _slide(direction, element) ***REMOVED***
        var _this3 = this;

        var activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeElementIndex = this._getItemIndex(activeElement);

        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var nextElementIndex = this._getItemIndex(nextElement);

        var isCycling = Boolean(this._interval);
        var directionalClassName;
        var orderClassName;
        var eventDirectionName;

        if (direction === Direction.NEXT) ***REMOVED***
          directionalClassName = ClassName.LEFT;
          orderClassName = ClassName.NEXT;
          eventDirectionName = Direction.LEFT;
    ***REMOVED*** else ***REMOVED***
          directionalClassName = ClassName.RIGHT;
          orderClassName = ClassName.PREV;
          eventDirectionName = Direction.RIGHT;
    ***REMOVED***

        if (nextElement && $$$1(nextElement).hasClass(ClassName.ACTIVE)) ***REMOVED***
          this._isSliding = false;
          return;
    ***REMOVED***

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

        if (slideEvent.isDefaultPrevented()) ***REMOVED***
          return;
    ***REMOVED***

        if (!activeElement || !nextElement) ***REMOVED***
          // Some weirdness is happening, so we bail
          return;
    ***REMOVED***

        this._isSliding = true;

        if (isCycling) ***REMOVED***
          this.pause();
    ***REMOVED***

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $$$1.Event(Event.SLID, ***REMOVED***
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
    ***REMOVED***);

        if ($$$1(this._element).hasClass(ClassName.SLIDE)) ***REMOVED***
          $$$1(nextElement).addClass(orderClassName);
          Util.reflow(nextElement);
          $$$1(activeElement).addClass(directionalClassName);
          $$$1(nextElement).addClass(directionalClassName);
          var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
          $$$1(activeElement).one(Util.TRANSITION_END, function () ***REMOVED***
            $$$1(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
            $$$1(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
            _this3._isSliding = false;
            setTimeout(function () ***REMOVED***
              return $$$1(_this3._element).trigger(slidEvent);
        ***REMOVED***, 0);
      ***REMOVED***).emulateTransitionEnd(transitionDuration);
    ***REMOVED*** else ***REMOVED***
          $$$1(activeElement).removeClass(ClassName.ACTIVE);
          $$$1(nextElement).addClass(ClassName.ACTIVE);
          this._isSliding = false;
          $$$1(this._element).trigger(slidEvent);
    ***REMOVED***

        if (isCycling) ***REMOVED***
          this.cycle();
    ***REMOVED***
  ***REMOVED***; // Static


      Carousel._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
        return this.each(function () ***REMOVED***
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread(***REMOVED***}, Default, $$$1(this).data());

          if (typeof config === 'object') ***REMOVED***
            _config = _objectSpread(***REMOVED***}, _config, config);
      ***REMOVED***

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) ***REMOVED***
            data = new Carousel(this, _config);
            $$$1(this).data(DATA_KEY, data);
      ***REMOVED***

          if (typeof config === 'number') ***REMOVED***
            data.to(config);
      ***REMOVED*** else if (typeof action === 'string') ***REMOVED***
            if (typeof data[action] === 'undefined') ***REMOVED***
              throw new TypeError("No method named \"" + action + "\"");
        ***REMOVED***

            data[action]();
      ***REMOVED*** else if (_config.interval) ***REMOVED***
            data.pause();
            data.cycle();
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) ***REMOVED***
        var selector = Util.getSelectorFromElement(this);

        if (!selector) ***REMOVED***
          return;
    ***REMOVED***

        var target = $$$1(selector)[0];

        if (!target || !$$$1(target).hasClass(ClassName.CAROUSEL)) ***REMOVED***
          return;
    ***REMOVED***

        var config = _objectSpread(***REMOVED***}, $$$1(target).data(), $$$1(this).data());

        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) ***REMOVED***
          config.interval = false;
    ***REMOVED***

        Carousel._jQueryInterface.call($$$1(target), config);

        if (slideIndex) ***REMOVED***
          $$$1(target).data(DATA_KEY).to(slideIndex);
    ***REMOVED***

        event.preventDefault();
  ***REMOVED***;

      _createClass(Carousel, null, [***REMOVED***
        key: "VERSION",
        get: function get() ***REMOVED***
          return VERSION;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "Default",
        get: function get() ***REMOVED***
          return Default;
    ***REMOVED***
  ***REMOVED***]);

      return Carousel;
***REMOVED***();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
    $$$1(window).on(Event.LOAD_DATA_API, function () ***REMOVED***
      var carousels = [].slice.call(document.querySelectorAll(Selector.DATA_RIDE));

      for (var i = 0, len = carousels.length; i < len; i++) ***REMOVED***
        var $carousel = $$$1(carousels[i]);

        Carousel._jQueryInterface.call($carousel, $carousel.data());
  ***REMOVED***
***REMOVED***);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Carousel._jQueryInterface;
    $$$1.fn[NAME].Constructor = Carousel;

    $$$1.fn[NAME].noConflict = function () ***REMOVED***
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
***REMOVED***;

    return Carousel;
***REMOVED***($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Collapse = function ($$$1) ***REMOVED***
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'collapse';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = ***REMOVED***
      toggle: true,
      parent: ''
***REMOVED***;
    var DefaultType = ***REMOVED***
      toggle: 'boolean',
      parent: '(string|element)'
***REMOVED***;
    var Event = ***REMOVED***
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
***REMOVED***;
    var ClassName = ***REMOVED***
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
***REMOVED***;
    var Dimension = ***REMOVED***
      WIDTH: 'width',
      HEIGHT: 'height'
***REMOVED***;
    var Selector = ***REMOVED***
      ACTIVES: '.show, .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

***REMOVED***;

    var Collapse =
    /*#__PURE__*/
    function () ***REMOVED***
      function Collapse(element, config) ***REMOVED***
        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = $$$1.makeArray(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var toggleList = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggleList.length; i < len; i++) ***REMOVED***
          var elem = toggleList[i];
          var selector = Util.getSelectorFromElement(elem);
          var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) ***REMOVED***
            return foundElem === element;
      ***REMOVED***);

          if (selector !== null && filterElement.length > 0) ***REMOVED***
            this._selector = selector;

            this._triggerArray.push(elem);
      ***REMOVED***
    ***REMOVED***

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) ***REMOVED***
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
    ***REMOVED***

        if (this._config.toggle) ***REMOVED***
          this.toggle();
    ***REMOVED***
  ***REMOVED*** // Getters


      var _proto = Collapse.prototype;

      // Public
      _proto.toggle = function toggle() ***REMOVED***
        if ($$$1(this._element).hasClass(ClassName.SHOW)) ***REMOVED***
          this.hide();
    ***REMOVED*** else ***REMOVED***
          this.show();
    ***REMOVED***
  ***REMOVED***;

      _proto.show = function show() ***REMOVED***
        var _this = this;

        if (this._isTransitioning || $$$1(this._element).hasClass(ClassName.SHOW)) ***REMOVED***
          return;
    ***REMOVED***

        var actives;
        var activesData;

        if (this._parent) ***REMOVED***
          actives = [].slice.call(this._parent.querySelectorAll(Selector.ACTIVES)).filter(function (elem) ***REMOVED***
            return elem.getAttribute('data-parent') === _this._config.parent;
      ***REMOVED***);

          if (actives.length === 0) ***REMOVED***
            actives = null;
      ***REMOVED***
    ***REMOVED***

        if (actives) ***REMOVED***
          activesData = $$$1(actives).not(this._selector).data(DATA_KEY);

          if (activesData && activesData._isTransitioning) ***REMOVED***
            return;
      ***REMOVED***
    ***REMOVED***

        var startEvent = $$$1.Event(Event.SHOW);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) ***REMOVED***
          return;
    ***REMOVED***

        if (actives) ***REMOVED***
          Collapse._jQueryInterface.call($$$1(actives).not(this._selector), 'hide');

          if (!activesData) ***REMOVED***
            $$$1(actives).data(DATA_KEY, null);
      ***REMOVED***
    ***REMOVED***

        var dimension = this._getDimension();

        $$$1(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
        this._element.style[dimension] = 0;

        if (this._triggerArray.length) ***REMOVED***
          $$$1(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
    ***REMOVED***

        this.setTransitioning(true);

        var complete = function complete() ***REMOVED***
          $$$1(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
          _this._element.style[dimension] = '';

          _this.setTransitioning(false);

          $$$1(_this._element).trigger(Event.SHOWN);
    ***REMOVED***;

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
  ***REMOVED***;

      _proto.hide = function hide() ***REMOVED***
        var _this2 = this;

        if (this._isTransitioning || !$$$1(this._element).hasClass(ClassName.SHOW)) ***REMOVED***
          return;
    ***REMOVED***

        var startEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) ***REMOVED***
          return;
    ***REMOVED***

        var dimension = this._getDimension();

        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        $$$1(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);
        var triggerArrayLength = this._triggerArray.length;

        if (triggerArrayLength > 0) ***REMOVED***
          for (var i = 0; i < triggerArrayLength; i++) ***REMOVED***
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);

            if (selector !== null) ***REMOVED***
              var $elem = $$$1([].slice.call(document.querySelectorAll(selector)));

              if (!$elem.hasClass(ClassName.SHOW)) ***REMOVED***
                $$$1(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

        this.setTransitioning(true);

        var complete = function complete() ***REMOVED***
          _this2.setTransitioning(false);

          $$$1(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
    ***REMOVED***;

        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
  ***REMOVED***;

      _proto.setTransitioning = function setTransitioning(isTransitioning) ***REMOVED***
        this._isTransitioning = isTransitioning;
  ***REMOVED***;

      _proto.dispose = function dispose() ***REMOVED***
        $$$1.removeData(this._element, DATA_KEY);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
  ***REMOVED***; // Private


      _proto._getConfig = function _getConfig(config) ***REMOVED***
        config = _objectSpread(***REMOVED***}, Default, config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
  ***REMOVED***;

      _proto._getDimension = function _getDimension() ***REMOVED***
        var hasWidth = $$$1(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
  ***REMOVED***;

      _proto._getParent = function _getParent() ***REMOVED***
        var _this3 = this;

        var parent = null;

        if (Util.isElement(this._config.parent)) ***REMOVED***
          parent = this._config.parent; // It's a jQuery object

          if (typeof this._config.parent.jquery !== 'undefined') ***REMOVED***
            parent = this._config.parent[0];
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
          parent = document.querySelector(this._config.parent);
    ***REMOVED***

        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        var children = [].slice.call(parent.querySelectorAll(selector));
        $$$1(children).each(function (i, element) ***REMOVED***
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
    ***REMOVED***);
        return parent;
  ***REMOVED***;

      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) ***REMOVED***
        if (element) ***REMOVED***
          var isOpen = $$$1(element).hasClass(ClassName.SHOW);

          if (triggerArray.length) ***REMOVED***
            $$$1(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***; // Static


      Collapse._getTargetFromElement = function _getTargetFromElement(element) ***REMOVED***
        var selector = Util.getSelectorFromElement(element);
        return selector ? document.querySelector(selector) : null;
  ***REMOVED***;

      Collapse._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
        return this.each(function () ***REMOVED***
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          var _config = _objectSpread(***REMOVED***}, Default, $this.data(), typeof config === 'object' && config ? config : ***REMOVED***});

          if (!data && _config.toggle && /show|hide/.test(config)) ***REMOVED***
            _config.toggle = false;
      ***REMOVED***

          if (!data) ***REMOVED***
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
      ***REMOVED***

          if (typeof config === 'string') ***REMOVED***
            if (typeof data[config] === 'undefined') ***REMOVED***
              throw new TypeError("No method named \"" + config + "\"");
        ***REMOVED***

            data[config]();
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

      _createClass(Collapse, null, [***REMOVED***
        key: "VERSION",
        get: function get() ***REMOVED***
          return VERSION;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "Default",
        get: function get() ***REMOVED***
          return Default;
    ***REMOVED***
  ***REMOVED***]);

      return Collapse;
***REMOVED***();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) ***REMOVED***
      // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
      if (event.currentTarget.tagName === 'A') ***REMOVED***
        event.preventDefault();
  ***REMOVED***

      var $trigger = $$$1(this);
      var selector = Util.getSelectorFromElement(this);
      var selectors = [].slice.call(document.querySelectorAll(selector));
      $$$1(selectors).each(function () ***REMOVED***
        var $target = $$$1(this);
        var data = $target.data(DATA_KEY);
        var config = data ? 'toggle' : $trigger.data();

        Collapse._jQueryInterface.call($target, config);
  ***REMOVED***);
***REMOVED***);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Collapse._jQueryInterface;
    $$$1.fn[NAME].Constructor = Collapse;

    $$$1.fn[NAME].noConflict = function () ***REMOVED***
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
***REMOVED***;

    return Collapse;
***REMOVED***($);

  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.14.3
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  var timeoutDuration = 0;
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) ***REMOVED***
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) ***REMOVED***
      timeoutDuration = 1;
      break;
***REMOVED***
***REMOVED***

  function microtaskDebounce(fn) ***REMOVED***
    var called = false;
    return function () ***REMOVED***
      if (called) ***REMOVED***
        return;
  ***REMOVED***
      called = true;
      window.Promise.resolve().then(function () ***REMOVED***
        called = false;
        fn();
  ***REMOVED***);
***REMOVED***;
***REMOVED***

  function taskDebounce(fn) ***REMOVED***
    var scheduled = false;
    return function () ***REMOVED***
      if (!scheduled) ***REMOVED***
        scheduled = true;
        setTimeout(function () ***REMOVED***
          scheduled = false;
          fn();
    ***REMOVED***, timeoutDuration);
  ***REMOVED***
***REMOVED***;
***REMOVED***

  var supportsMicroTasks = isBrowser && window.Promise;

  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument ***REMOVED***Function} fn
  * @returns ***REMOVED***Function}
  */
  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***Any} functionToCheck - variable to check
   * @returns ***REMOVED***Boolean} answer to: is a function?
   */
  function isFunction(functionToCheck) ***REMOVED***
    var getType = ***REMOVED***};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
***REMOVED***

  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***Eement} element
   * @argument ***REMOVED***String} property
   */
  function getStyleComputedProperty(element, property) ***REMOVED***
    if (element.nodeType !== 1) ***REMOVED***
      return [];
***REMOVED***
    // NOTE: 1 DOM access here
    var css = getComputedStyle(element, null);
    return property ? css[property] : css;
***REMOVED***

  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***Element} element
   * @returns ***REMOVED***Element} parent
   */
  function getParentNode(element) ***REMOVED***
    if (element.nodeName === 'HTML') ***REMOVED***
      return element;
***REMOVED***
    return element.parentNode || element.host;
***REMOVED***

  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***Element} element
   * @returns ***REMOVED***Element} scroll parent
   */
  function getScrollParent(element) ***REMOVED***
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) ***REMOVED***
      return document.body;
***REMOVED***

    switch (element.nodeName) ***REMOVED***
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;
      case '#document':
        return element.body;
***REMOVED***

    // Firefox want us to check `-x` and `-y` variations as well

    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) ***REMOVED***
      return element;
***REMOVED***

    return getScrollParent(getParentNode(element));
***REMOVED***

  var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param ***REMOVED***Number} version to check
   * @returns ***REMOVED***Boolean} isIE
   */
  function isIE(version) ***REMOVED***
    if (version === 11) ***REMOVED***
      return isIE11;
***REMOVED***
    if (version === 10) ***REMOVED***
      return isIE10;
***REMOVED***
    return isIE11 || isIE10;
***REMOVED***

  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***Element} element
   * @returns ***REMOVED***Element} offset parent
   */
  function getOffsetParent(element) ***REMOVED***
    if (!element) ***REMOVED***
      return document.documentElement;
***REMOVED***

    var noOffsetParent = isIE(10) ? document.body : null;

    // NOTE: 1 DOM access here
    var offsetParent = element.offsetParent;
    // Skip hidden elements which don't have an offsetParent
    while (offsetParent === noOffsetParent && element.nextElementSibling) ***REMOVED***
      offsetParent = (element = element.nextElementSibling).offsetParent;
***REMOVED***

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') ***REMOVED***
      return element ? element.ownerDocument.documentElement : document.documentElement;
***REMOVED***

    // .offsetParent will return the closest TD or TABLE in case
    // no offsetParent is present, I hate this job...
    if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') ***REMOVED***
      return getOffsetParent(offsetParent);
***REMOVED***

    return offsetParent;
***REMOVED***

  function isOffsetContainer(element) ***REMOVED***
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') ***REMOVED***
      return false;
***REMOVED***
    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
***REMOVED***

  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***Element} node
   * @returns ***REMOVED***Element} root node
   */
  function getRoot(node) ***REMOVED***
    if (node.parentNode !== null) ***REMOVED***
      return getRoot(node.parentNode);
***REMOVED***

    return node;
***REMOVED***

  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***Element} element1
   * @argument ***REMOVED***Element} element2
   * @returns ***REMOVED***Element} common offset parent
   */
  function findCommonOffsetParent(element1, element2) ***REMOVED***
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) ***REMOVED***
      return document.documentElement;
***REMOVED***

    // Here we make sure to give as "start" the element that comes first in the DOM
    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1;

    // Get common ancestor container
    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer;

    // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) ***REMOVED***
      if (isOffsetContainer(commonAncestorContainer)) ***REMOVED***
        return commonAncestorContainer;
  ***REMOVED***

      return getOffsetParent(commonAncestorContainer);
***REMOVED***

    // one of the nodes is inside shadowDOM, find which one
    var element1root = getRoot(element1);
    if (element1root.host) ***REMOVED***
      return findCommonOffsetParent(element1root.host, element2);
***REMOVED*** else ***REMOVED***
      return findCommonOffsetParent(element1, getRoot(element2).host);
***REMOVED***
***REMOVED***

  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***Element} element
   * @argument ***REMOVED***String} side `top` or `left`
   * @returns ***REMOVED***number} amount of scrolled pixels
   */
  function getScroll(element) ***REMOVED***
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') ***REMOVED***
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
***REMOVED***

    return element[upperSide];
***REMOVED***

  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param ***REMOVED***Object} rect - Rect object you want to change
   * @param ***REMOVED***HTMLElement} element - The element from the function reads the scroll values
   * @param ***REMOVED***Boolean} subtract - set to true if you want to subtract the scroll values
   * @return ***REMOVED***Object} rect - The modifier rect object
   */
  function includeScroll(rect, element) ***REMOVED***
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
***REMOVED***

  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param ***REMOVED***CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param ***REMOVED***String} axis - `x` or `y`
   * @return ***REMOVED***number} borders - The borders size of the given axis
   */

  function getBordersSize(styles, axis) ***REMOVED***
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

    return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
***REMOVED***

  function getSize(axis, body, html, computedStyle) ***REMOVED***
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
***REMOVED***

  function getWindowSizes() ***REMOVED***
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);

    return ***REMOVED***
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
***REMOVED***;
***REMOVED***

  var classCallCheck = function (instance, Constructor) ***REMOVED***
    if (!(instance instanceof Constructor)) ***REMOVED***
      throw new TypeError("Cannot call a class as a function");
***REMOVED***
***REMOVED***;

  var createClass = function () ***REMOVED***
    function defineProperties(target, props) ***REMOVED***
      for (var i = 0; i < props.length; i++) ***REMOVED***
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
  ***REMOVED***
***REMOVED***

    return function (Constructor, protoProps, staticProps) ***REMOVED***
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
***REMOVED***;
***REMOVED***();





  var defineProperty = function (obj, key, value) ***REMOVED***
    if (key in obj) ***REMOVED***
      Object.defineProperty(obj, key, ***REMOVED***
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
  ***REMOVED***);
***REMOVED*** else ***REMOVED***
      obj[key] = value;
***REMOVED***

    return obj;
***REMOVED***;

  var _extends = Object.assign || function (target) ***REMOVED***
    for (var i = 1; i < arguments.length; i++) ***REMOVED***
      var source = arguments[i];

      for (var key in source) ***REMOVED***
        if (Object.prototype.hasOwnProperty.call(source, key)) ***REMOVED***
          target[key] = source[key];
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    return target;
***REMOVED***;

  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***Object} offsets
   * @returns ***REMOVED***Object} ClientRect like output
   */
  function getClientRect(offsets) ***REMOVED***
    return _extends(***REMOVED***}, offsets, ***REMOVED***
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
***REMOVED***);
***REMOVED***

  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param ***REMOVED***HTMLElement} element
   * @return ***REMOVED***Object} client rect
   */
  function getBoundingClientRect(element) ***REMOVED***
    var rect = ***REMOVED***};

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    try ***REMOVED***
      if (isIE(10)) ***REMOVED***
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
  ***REMOVED*** else ***REMOVED***
        rect = element.getBoundingClientRect();
  ***REMOVED***
***REMOVED*** catch (e) ***REMOVED***}

    var result = ***REMOVED***
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
***REMOVED***;

    // subtract scrollbar size from sizes
    var sizes = element.nodeName === 'HTML' ? getWindowSizes() : ***REMOVED***};
    var width = sizes.width || element.clientWidth || result.right - result.left;
    var height = sizes.height || element.clientHeight || result.bottom - result.top;

    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height;

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) ***REMOVED***
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');

      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
***REMOVED***

    return getClientRect(result);
***REMOVED***

  function getOffsetRectRelativeToArbitraryNode(children, parent) ***REMOVED***
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);

    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

    // In cases where the parent is fixed, we must ignore negative scroll in offset calc
    if (fixedPosition && parent.nodeName === 'HTML') ***REMOVED***
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
***REMOVED***
    var offsets = getClientRect(***REMOVED***
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
***REMOVED***);
    offsets.marginTop = 0;
    offsets.marginLeft = 0;

    // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.
    if (!isIE10 && isHTML) ***REMOVED***
      var marginTop = parseFloat(styles.marginTop, 10);
      var marginLeft = parseFloat(styles.marginLeft, 10);

      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft;

      // Attach marginTop and marginLeft because in some circumstances we may need them
      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
***REMOVED***

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') ***REMOVED***
      offsets = includeScroll(offsets, parent);
***REMOVED***

    return offsets;
***REMOVED***

  function getViewportOffsetRectRelativeToArtbitraryNode(element) ***REMOVED***
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);

    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

    var offset = ***REMOVED***
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
***REMOVED***;

    return getClientRect(offset);
***REMOVED***

  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***Element} element
   * @argument ***REMOVED***Element} customContainer
   * @returns ***REMOVED***Boolean} answer to "isFixed?"
   */
  function isFixed(element) ***REMOVED***
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') ***REMOVED***
      return false;
***REMOVED***
    if (getStyleComputedProperty(element, 'position') === 'fixed') ***REMOVED***
      return true;
***REMOVED***
    return isFixed(getParentNode(element));
***REMOVED***

  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***Element} element
   * @returns ***REMOVED***Element} first transformed parent or documentElement
   */

  function getFixedPositionOffsetParent(element) ***REMOVED***
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE()) ***REMOVED***
      return document.documentElement;
***REMOVED***
    var el = element.parentElement;
    while (el && getStyleComputedProperty(el, 'transform') === 'none') ***REMOVED***
      el = el.parentElement;
***REMOVED***
    return el || document.documentElement;
***REMOVED***

  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param ***REMOVED***HTMLElement} popper
   * @param ***REMOVED***HTMLElement} reference
   * @param ***REMOVED***number} padding
   * @param ***REMOVED***HTMLElement} boundariesElement - Element used to define the boundaries
   * @param ***REMOVED***Boolean} fixedPosition - Is in fixed position mode
   * @returns ***REMOVED***Object} Coordinates of the boundaries
   */
  function getBoundaries(popper, reference, padding, boundariesElement) ***REMOVED***
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    // NOTE: 1 DOM access here

    var boundaries = ***REMOVED*** top: 0, left: 0 };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

    // Handle viewport case
    if (boundariesElement === 'viewport') ***REMOVED***
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
***REMOVED*** else ***REMOVED***
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;
      if (boundariesElement === 'scrollParent') ***REMOVED***
        boundariesNode = getScrollParent(getParentNode(reference));
        if (boundariesNode.nodeName === 'BODY') ***REMOVED***
          boundariesNode = popper.ownerDocument.documentElement;
    ***REMOVED***
  ***REMOVED*** else if (boundariesElement === 'window') ***REMOVED***
        boundariesNode = popper.ownerDocument.documentElement;
  ***REMOVED*** else ***REMOVED***
        boundariesNode = boundariesElement;
  ***REMOVED***

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

      // In case of HTML, we need a different computation
      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) ***REMOVED***
        var _getWindowSizes = getWindowSizes(),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
  ***REMOVED*** else ***REMOVED***
        // for all the other DOM elements, this one is good
        boundaries = offsets;
  ***REMOVED***
***REMOVED***

    // Add paddings
    boundaries.left += padding;
    boundaries.top += padding;
    boundaries.right -= padding;
    boundaries.bottom -= padding;

    return boundaries;
***REMOVED***

  function getArea(_ref) ***REMOVED***
    var width = _ref.width,
        height = _ref.height;

    return width * height;
***REMOVED***

  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***Object} data - The data object generated by update method
   * @argument ***REMOVED***Object} options - Modifiers configuration and options
   * @returns ***REMOVED***Object} The data object, properly modified
   */
  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) ***REMOVED***
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) ***REMOVED***
      return placement;
***REMOVED***

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

    var rects = ***REMOVED***
      top: ***REMOVED***
        width: boundaries.width,
        height: refRect.top - boundaries.top
  ***REMOVED***,
      right: ***REMOVED***
        width: boundaries.right - refRect.right,
        height: boundaries.height
  ***REMOVED***,
      bottom: ***REMOVED***
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
  ***REMOVED***,
      left: ***REMOVED***
        width: refRect.left - boundaries.left,
        height: boundaries.height
  ***REMOVED***
***REMOVED***;

    var sortedAreas = Object.keys(rects).map(function (key) ***REMOVED***
      return _extends(***REMOVED***
        key: key
  ***REMOVED***, rects[key], ***REMOVED***
        area: getArea(rects[key])
  ***REMOVED***);
***REMOVED***).sort(function (a, b) ***REMOVED***
      return b.area - a.area;
***REMOVED***);

    var filteredAreas = sortedAreas.filter(function (_ref2) ***REMOVED***
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
***REMOVED***);

    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

    var variation = placement.split('-')[1];

    return computedPlacement + (variation ? '-' + variation : '');
***REMOVED***

  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param ***REMOVED***Object} state
   * @param ***REMOVED***Element} popper - the popper element
   * @param ***REMOVED***Element} reference - the reference element (the popper will be relative to this)
   * @param ***REMOVED***Element} fixedPosition - is in fixed position mode
   * @returns ***REMOVED***Object} An object containing the offsets which will be applied to the popper
   */
  function getReferenceOffsets(state, popper, reference) ***REMOVED***
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
***REMOVED***

  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***Element} element
   * @returns ***REMOVED***Object} object containing width and height properties
   */
  function getOuterSizes(element) ***REMOVED***
    var styles = getComputedStyle(element);
    var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
    var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
    var result = ***REMOVED***
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
***REMOVED***;
    return result;
***REMOVED***

  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***String} placement
   * @returns ***REMOVED***String} flipped placement
   */
  function getOppositePlacement(placement) ***REMOVED***
    var hash = ***REMOVED*** left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
    return placement.replace(/left|right|bottom|top/g, function (matched) ***REMOVED***
      return hash[matched];
***REMOVED***);
***REMOVED***

  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param ***REMOVED***Object} position - CSS position the Popper will get applied
   * @param ***REMOVED***HTMLElement} popper - the popper element
   * @param ***REMOVED***Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param ***REMOVED***String} placement - one of the valid placement options
   * @returns ***REMOVED***Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */
  function getPopperOffsets(popper, referenceOffsets, placement) ***REMOVED***
    placement = placement.split('-')[0];

    // Get popper node sizes
    var popperRect = getOuterSizes(popper);

    // Add position, width and height to our offsets object
    var popperOffsets = ***REMOVED***
      width: popperRect.width,
      height: popperRect.height
***REMOVED***;

    // depending by the popper placement we have to compute its offsets slightly differently
    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) ***REMOVED***
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
***REMOVED*** else ***REMOVED***
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
***REMOVED***

    return popperOffsets;
***REMOVED***

  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function find(arr, check) ***REMOVED***
    // use native find if supported
    if (Array.prototype.find) ***REMOVED***
      return arr.find(check);
***REMOVED***

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
***REMOVED***

  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function findIndex(arr, prop, value) ***REMOVED***
    // use native findIndex if supported
    if (Array.prototype.findIndex) ***REMOVED***
      return arr.findIndex(function (cur) ***REMOVED***
        return cur[prop] === value;
  ***REMOVED***);
***REMOVED***

    // use `find` + `indexOf` if `findIndex` isn't supported
    var match = find(arr, function (obj) ***REMOVED***
      return obj[prop] === value;
***REMOVED***);
    return arr.indexOf(match);
***REMOVED***

  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param ***REMOVED***dataObject} data
   * @param ***REMOVED***Array} modifiers
   * @param ***REMOVED***String} ends - Optional modifier name used as stopper
   * @returns ***REMOVED***dataObject}
   */
  function runModifiers(modifiers, data, ends) ***REMOVED***
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

    modifiersToRun.forEach(function (modifier) ***REMOVED***
      if (modifier['function']) ***REMOVED***
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
  ***REMOVED***
      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
      if (modifier.enabled && isFunction(fn)) ***REMOVED***
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);

        data = fn(data, modifier);
  ***REMOVED***
***REMOVED***);

    return data;
***REMOVED***

  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */
  function update() ***REMOVED***
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) ***REMOVED***
      return;
***REMOVED***

    var data = ***REMOVED***
      instance: this,
      styles: ***REMOVED***},
      arrowStyles: ***REMOVED***},
      attributes: ***REMOVED***},
      flipped: false,
      offsets: ***REMOVED***}
***REMOVED***;

    // compute reference element offsets
    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

    // store the computed placement inside `originalPlacement`
    data.originalPlacement = data.placement;

    data.positionFixed = this.options.positionFixed;

    // compute the popper offsets
    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

    // run the modifiers
    data = runModifiers(this.modifiers, data);

    // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback
    if (!this.state.isCreated) ***REMOVED***
      this.state.isCreated = true;
      this.options.onCreate(data);
***REMOVED*** else ***REMOVED***
      this.options.onUpdate(data);
***REMOVED***
***REMOVED***

  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns ***REMOVED***Boolean}
   */
  function isModifierEnabled(modifiers, modifierName) ***REMOVED***
    return modifiers.some(function (_ref) ***REMOVED***
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
***REMOVED***);
***REMOVED***

  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***String} property (camelCase)
   * @returns ***REMOVED***String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */
  function getSupportedPropertyName(property) ***REMOVED***
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) ***REMOVED***
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;
      if (typeof document.body.style[toCheck] !== 'undefined') ***REMOVED***
        return toCheck;
  ***REMOVED***
***REMOVED***
    return null;
***REMOVED***

  /**
   * Destroy the popper
   * @method
   * @memberof Popper
   */
  function destroy() ***REMOVED***
    this.state.isDestroyed = true;

    // touch DOM only if `applyStyle` modifier is enabled
    if (isModifierEnabled(this.modifiers, 'applyStyle')) ***REMOVED***
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
***REMOVED***

    this.disableEventListeners();

    // remove the popper if user explicity asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it
    if (this.options.removeOnDestroy) ***REMOVED***
      this.popper.parentNode.removeChild(this.popper);
***REMOVED***
    return this;
***REMOVED***

  /**
   * Get the window associated with the element
   * @argument ***REMOVED***Element} element
   * @returns ***REMOVED***Window}
   */
  function getWindow(element) ***REMOVED***
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
***REMOVED***

  function attachToScrollParents(scrollParent, event, callback, scrollParents) ***REMOVED***
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, ***REMOVED*** passive: true });

    if (!isBody) ***REMOVED***
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
***REMOVED***
    scrollParents.push(target);
***REMOVED***

  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function setupEventListeners(reference, options, state, updateBound) ***REMOVED***
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, ***REMOVED*** passive: true });

    // Scroll event listener on scroll parents
    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;

    return state;
***REMOVED***

  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */
  function enableEventListeners() ***REMOVED***
    if (!this.state.eventsEnabled) ***REMOVED***
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
***REMOVED***
***REMOVED***

  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function removeEventListeners(reference, state) ***REMOVED***
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound);

    // Remove scroll event listener on scroll parents
    state.scrollParents.forEach(function (target) ***REMOVED***
      target.removeEventListener('scroll', state.updateBound);
***REMOVED***);

    // Reset state
    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
***REMOVED***

  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger onUpdate callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */
  function disableEventListeners() ***REMOVED***
    if (this.state.eventsEnabled) ***REMOVED***
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
***REMOVED***
***REMOVED***

  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param ***REMOVED****} input to check
   * @return ***REMOVED***Boolean}
   */
  function isNumeric(n) ***REMOVED***
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
***REMOVED***

  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***Element} element - Element to apply the style to
   * @argument ***REMOVED***Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setStyles(element, styles) ***REMOVED***
    Object.keys(styles).forEach(function (prop) ***REMOVED***
      var unit = '';
      // add unit if the value is numeric and is one of the following
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) ***REMOVED***
        unit = 'px';
  ***REMOVED***
      element.style[prop] = styles[prop] + unit;
***REMOVED***);
***REMOVED***

  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***Element} element - Element to apply the attributes to
   * @argument ***REMOVED***Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setAttributes(element, attributes) ***REMOVED***
    Object.keys(attributes).forEach(function (prop) ***REMOVED***
      var value = attributes[prop];
      if (value !== false) ***REMOVED***
        element.setAttribute(prop, attributes[prop]);
  ***REMOVED*** else ***REMOVED***
        element.removeAttribute(prop);
  ***REMOVED***
***REMOVED***);
***REMOVED***

  /**
   * @function
   * @memberof Modifiers
   * @argument ***REMOVED***Object} data - The data object generated by `update` method
   * @argument ***REMOVED***Object} data.styles - List of style properties - values to apply to popper element
   * @argument ***REMOVED***Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument ***REMOVED***Object} options - Modifiers configuration and options
   * @returns ***REMOVED***Object} The same data object
   */
  function applyStyle(data) ***REMOVED***
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles);

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes(data.instance.popper, data.attributes);

    // if arrowElement is defined and arrowStyles has some properties
    if (data.arrowElement && Object.keys(data.arrowStyles).length) ***REMOVED***
      setStyles(data.arrowElement, data.arrowStyles);
***REMOVED***

    return data;
***REMOVED***

  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param ***REMOVED***HTMLElement} reference - The reference element used to position the popper
   * @param ***REMOVED***HTMLElement} popper - The HTML element used as popper
   * @param ***REMOVED***Object} options - Popper.js options
   */
  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) ***REMOVED***
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

    popper.setAttribute('x-placement', placement);

    // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations
    setStyles(popper, ***REMOVED*** position: options.positionFixed ? 'fixed' : 'absolute' });

    return options;
***REMOVED***

  /**
   * @function
   * @memberof Modifiers
   * @argument ***REMOVED***Object} data - The data object generated by `update` method
   * @argument ***REMOVED***Object} options - Modifiers configuration and options
   * @returns ***REMOVED***Object} The data object, properly modified
   */
  function computeStyle(data, options) ***REMOVED***
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper;

    // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) ***REMOVED***
      return modifier.name === 'applyStyle';
***REMOVED***).gpuAcceleration;
    if (legacyGpuAccelerationOption !== undefined) ***REMOVED***
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
***REMOVED***
    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent);

    // Styles
    var styles = ***REMOVED***
      position: popper.position
***REMOVED***;

    // Avoid blurry text by using full pixel integers.
    // For pixel-perfect positioning, top/bottom prefers rounded
    // values, while left/right prefers floored values.
    var offsets = ***REMOVED***
      left: Math.floor(popper.left),
      top: Math.round(popper.top),
      bottom: Math.round(popper.bottom),
      right: Math.floor(popper.right)
***REMOVED***;

    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right';

    // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    var prefixedProperty = getSupportedPropertyName('transform');

    // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.
    var left = void 0,
        top = void 0;
    if (sideA === 'bottom') ***REMOVED***
      top = -offsetParentRect.height + offsets.bottom;
***REMOVED*** else ***REMOVED***
      top = offsets.top;
***REMOVED***
    if (sideB === 'right') ***REMOVED***
      left = -offsetParentRect.width + offsets.right;
***REMOVED*** else ***REMOVED***
      left = offsets.left;
***REMOVED***
    if (gpuAcceleration && prefixedProperty) ***REMOVED***
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
***REMOVED*** else ***REMOVED***
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
***REMOVED***

    // Attributes
    var attributes = ***REMOVED***
      'x-placement': data.placement
***REMOVED***;

    // Update `data` attributes, styles and arrowStyles
    data.attributes = _extends(***REMOVED***}, attributes, data.attributes);
    data.styles = _extends(***REMOVED***}, styles, data.styles);
    data.arrowStyles = _extends(***REMOVED***}, data.offsets.arrow, data.arrowStyles);

    return data;
***REMOVED***

  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param ***REMOVED***Array} modifiers - list of modifiers
   * @param ***REMOVED***String} requestingName - name of requesting modifier
   * @param ***REMOVED***String} requestedName - name of requested modifier
   * @returns ***REMOVED***Boolean}
   */
  function isModifierRequired(modifiers, requestingName, requestedName) ***REMOVED***
    var requesting = find(modifiers, function (_ref) ***REMOVED***
      var name = _ref.name;
      return name === requestingName;
***REMOVED***);

    var isRequired = !!requesting && modifiers.some(function (modifier) ***REMOVED***
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
***REMOVED***);

    if (!isRequired) ***REMOVED***
      var _requesting = '`' + requestingName + '`';
      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
***REMOVED***
    return isRequired;
***REMOVED***

  /**
   * @function
   * @memberof Modifiers
   * @argument ***REMOVED***Object} data - The data object generated by update method
   * @argument ***REMOVED***Object} options - Modifiers configuration and options
   * @returns ***REMOVED***Object} The data object, properly modified
   */
  function arrow(data, options) ***REMOVED***
    var _data$offsets$arrow;

    // arrow depends on keepTogether in order to work
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) ***REMOVED***
      return data;
***REMOVED***

    var arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') ***REMOVED***
      arrowElement = data.instance.popper.querySelector(arrowElement);

      // if arrowElement is not found, don't run the modifier
      if (!arrowElement) ***REMOVED***
        return data;
  ***REMOVED***
***REMOVED*** else ***REMOVED***
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) ***REMOVED***
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
  ***REMOVED***
***REMOVED***

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isVertical = ['left', 'right'].indexOf(placement) !== -1;

    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjuction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) ***REMOVED***
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
***REMOVED***
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) ***REMOVED***
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
***REMOVED***
    data.offsets.popper = getClientRect(data.offsets.popper);

    // compute center of the popper
    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available
    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = ***REMOVED***}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

    return data;
***REMOVED***

  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***String} placement variation
   * @returns ***REMOVED***String} flipped placement variation
   */
  function getOppositeVariation(variation) ***REMOVED***
    if (variation === 'end') ***REMOVED***
      return 'start';
***REMOVED*** else if (variation === 'start') ***REMOVED***
      return 'end';
***REMOVED***
    return variation;
***REMOVED***

  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-right` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type ***REMOVED***Array}
   * @enum ***REMOVED***String}
   * @readonly
   * @method placements
   * @memberof Popper
   */
  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

  // Get rid of `auto` `auto-start` and `auto-end`
  var validPlacements = placements.slice(3);

  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument ***REMOVED***String} placement - A valid placement (it accepts variations)
   * @argument ***REMOVED***Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns ***REMOVED***Array} placements including their variations
   */
  function clockwise(placement) ***REMOVED***
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
***REMOVED***

  var BEHAVIORS = ***REMOVED***
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
***REMOVED***;

  /**
   * @function
   * @memberof Modifiers
   * @argument ***REMOVED***Object} data - The data object generated by update method
   * @argument ***REMOVED***Object} options - Modifiers configuration and options
   * @returns ***REMOVED***Object} The data object, properly modified
   */
  function flip(data, options) ***REMOVED***
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) ***REMOVED***
      return data;
***REMOVED***

    if (data.flipped && data.placement === data.originalPlacement) ***REMOVED***
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
***REMOVED***

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';

    var flipOrder = [];

    switch (options.behavior) ***REMOVED***
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;
      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;
      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;
      default:
        flipOrder = options.behavior;
***REMOVED***

    flipOrder.forEach(function (step, index) ***REMOVED***
      if (placement !== step || flipOrder.length === index + 1) ***REMOVED***
        return data;
  ***REMOVED***

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);

      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference;

      // using floor because the reference offsets may contain decimals we are not going to consider here
      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

      // flip the variation if required
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
      var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      if (overlapsRef || overflowsBoundaries || flippedVariation) ***REMOVED***
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) ***REMOVED***
          placement = flipOrder[index + 1];
    ***REMOVED***

        if (flippedVariation) ***REMOVED***
          variation = getOppositeVariation(variation);
    ***REMOVED***

        data.placement = placement + (variation ? '-' + variation : '');

        // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future
        data.offsets.popper = _extends(***REMOVED***}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

        data = runModifiers(data.instance.modifiers, data, 'flip');
  ***REMOVED***
***REMOVED***);
    return data;
***REMOVED***

  /**
   * @function
   * @memberof Modifiers
   * @argument ***REMOVED***Object} data - The data object generated by update method
   * @argument ***REMOVED***Object} options - Modifiers configuration and options
   * @returns ***REMOVED***Object} The data object, properly modified
   */
  function keepTogether(data) ***REMOVED***
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) ***REMOVED***
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
***REMOVED***
    if (popper[opSide] > floor(reference[side])) ***REMOVED***
      data.offsets.popper[opSide] = floor(reference[side]);
***REMOVED***

    return data;
***REMOVED***

  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof ***REMOVED***modifiers~offset}
   * @private
   * @argument ***REMOVED***String} str - Value + unit string
   * @argument ***REMOVED***String} measurement - `height` or `width`
   * @argument ***REMOVED***Object} popperOffsets
   * @argument ***REMOVED***Object} referenceOffsets
   * @returns ***REMOVED***Number|String}
   * Value in pixels, or original string if no values were extracted
   */
  function toValue(str, measurement, popperOffsets, referenceOffsets) ***REMOVED***
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2];

    // If it's not a number it's an operator, I guess
    if (!value) ***REMOVED***
      return str;
***REMOVED***

    if (unit.indexOf('%') === 0) ***REMOVED***
      var element = void 0;
      switch (unit) ***REMOVED***
        case '%p':
          element = popperOffsets;
          break;
        case '%':
        case '%r':
        default:
          element = referenceOffsets;
  ***REMOVED***

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
***REMOVED*** else if (unit === 'vh' || unit === 'vw') ***REMOVED***
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;
      if (unit === 'vh') ***REMOVED***
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  ***REMOVED*** else ***REMOVED***
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  ***REMOVED***
      return size / 100 * value;
***REMOVED*** else ***REMOVED***
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
***REMOVED***
***REMOVED***

  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof ***REMOVED***modifiers~offset}
   * @private
   * @argument ***REMOVED***String} offset
   * @argument ***REMOVED***Object} popperOffsets
   * @argument ***REMOVED***Object} referenceOffsets
   * @argument ***REMOVED***String} basePlacement
   * @returns ***REMOVED***Array} a two cells array with x and y offsets in numbers
   */
  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) ***REMOVED***
    var offsets = [0, 0];

    // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one
    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

    // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
    var fragments = offset.split(/(\+|\-)/).map(function (frag) ***REMOVED***
      return frag.trim();
***REMOVED***);

    // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space
    var divider = fragments.indexOf(find(fragments, function (frag) ***REMOVED***
      return frag.search(/,|\s/) !== -1;
***REMOVED***));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) ***REMOVED***
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
***REMOVED***

    // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.
    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

    // Convert the values with units to absolute pixels to allow our computations
    ops = ops.map(function (op, index) ***REMOVED***
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op
      // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) ***REMOVED***
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) ***REMOVED***
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
    ***REMOVED*** else if (mergeWithPrevious) ***REMOVED***
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
    ***REMOVED*** else ***REMOVED***
          return a.concat(b);
    ***REMOVED***
  ***REMOVED***, [])
      // Here we convert the string values into number values (in px)
      .map(function (str) ***REMOVED***
        return toValue(str, measurement, popperOffsets, referenceOffsets);
  ***REMOVED***);
***REMOVED***);

    // Loop trough the offsets arrays and execute the operations
    ops.forEach(function (op, index) ***REMOVED***
      op.forEach(function (frag, index2) ***REMOVED***
        if (isNumeric(frag)) ***REMOVED***
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
    ***REMOVED***
  ***REMOVED***);
***REMOVED***);
    return offsets;
***REMOVED***

  /**
   * @function
   * @memberof Modifiers
   * @argument ***REMOVED***Object} data - The data object generated by update method
   * @argument ***REMOVED***Object} options - Modifiers configuration and options
   * @argument ***REMOVED***Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns ***REMOVED***Object} The data object, properly modified
   */
  function offset(data, _ref) ***REMOVED***
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var basePlacement = placement.split('-')[0];

    var offsets = void 0;
    if (isNumeric(+offset)) ***REMOVED***
      offsets = [+offset, 0];
***REMOVED*** else ***REMOVED***
      offsets = parseOffset(offset, popper, reference, basePlacement);
***REMOVED***

    if (basePlacement === 'left') ***REMOVED***
      popper.top += offsets[0];
      popper.left -= offsets[1];
***REMOVED*** else if (basePlacement === 'right') ***REMOVED***
      popper.top += offsets[0];
      popper.left += offsets[1];
***REMOVED*** else if (basePlacement === 'top') ***REMOVED***
      popper.left += offsets[0];
      popper.top -= offsets[1];
***REMOVED*** else if (basePlacement === 'bottom') ***REMOVED***
      popper.left += offsets[0];
      popper.top += offsets[1];
***REMOVED***

    data.popper = popper;
    return data;
***REMOVED***

  /**
   * @function
   * @memberof Modifiers
   * @argument ***REMOVED***Object} data - The data object generated by `update` method
   * @argument ***REMOVED***Object} options - Modifiers configuration and options
   * @returns ***REMOVED***Object} The data object, properly modified
   */
  function preventOverflow(data, options) ***REMOVED***
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

    // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken
    if (data.instance.reference === boundariesElement) ***REMOVED***
      boundariesElement = getOffsetParent(boundariesElement);
***REMOVED***

    // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself
    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification
    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];

    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;

    options.boundaries = boundaries;

    var order = options.priority;
    var popper = data.offsets.popper;

    var check = ***REMOVED***
      primary: function primary(placement) ***REMOVED***
        var value = popper[placement];
        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) ***REMOVED***
          value = Math.max(popper[placement], boundaries[placement]);
    ***REMOVED***
        return defineProperty(***REMOVED***}, placement, value);
  ***REMOVED***,
      secondary: function secondary(placement) ***REMOVED***
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];
        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) ***REMOVED***
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
    ***REMOVED***
        return defineProperty(***REMOVED***}, mainSide, value);
  ***REMOVED***
***REMOVED***;

    order.forEach(function (placement) ***REMOVED***
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends(***REMOVED***}, popper, check[side](placement));
***REMOVED***);

    data.offsets.popper = popper;

    return data;
***REMOVED***

  /**
   * @function
   * @memberof Modifiers
   * @argument ***REMOVED***Object} data - The data object generated by `update` method
   * @argument ***REMOVED***Object} options - Modifiers configuration and options
   * @returns ***REMOVED***Object} The data object, properly modified
   */
  function shift(data) ***REMOVED***
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) ***REMOVED***
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;

      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      var shiftOffsets = ***REMOVED***
        start: defineProperty(***REMOVED***}, side, reference[side]),
        end: defineProperty(***REMOVED***}, side, reference[side] + reference[measurement] - popper[measurement])
  ***REMOVED***;

      data.offsets.popper = _extends(***REMOVED***}, popper, shiftOffsets[shiftvariation]);
***REMOVED***

    return data;
***REMOVED***

  /**
   * @function
   * @memberof Modifiers
   * @argument ***REMOVED***Object} data - The data object generated by update method
   * @argument ***REMOVED***Object} options - Modifiers configuration and options
   * @returns ***REMOVED***Object} The data object, properly modified
   */
  function hide(data) ***REMOVED***
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) ***REMOVED***
      return data;
***REMOVED***

    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function (modifier) ***REMOVED***
      return modifier.name === 'preventOverflow';
***REMOVED***).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) ***REMOVED***
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) ***REMOVED***
        return data;
  ***REMOVED***

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
***REMOVED*** else ***REMOVED***
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) ***REMOVED***
        return data;
  ***REMOVED***

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
***REMOVED***

    return data;
***REMOVED***

  /**
   * @function
   * @memberof Modifiers
   * @argument ***REMOVED***Object} data - The data object generated by `update` method
   * @argument ***REMOVED***Object} options - Modifiers configuration and options
   * @returns ***REMOVED***Object} The data object, properly modified
   */
  function inner(data) ***REMOVED***
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);

    return data;
***REMOVED***

  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument ***REMOVED***dataObject} data - The data object generated by `update` method
   * @argument ***REMOVED***Object} options - Modifiers configuration and options
   * @returns ***REMOVED***dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */
  var modifiers = ***REMOVED***
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: ***REMOVED***
      /** @prop ***REMOVED***number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop ***REMOVED***Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop ***REMOVED***ModifierFn} */
      fn: shift
***REMOVED***,

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unitless, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the height.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
     *
     * @memberof modifiers
     * @inner
     */
    offset: ***REMOVED***
      /** @prop ***REMOVED***number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop ***REMOVED***Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop ***REMOVED***ModifierFn} */
      fn: offset,
      /** @prop ***REMOVED***Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
***REMOVED***,

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * An scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: ***REMOVED***
      /** @prop ***REMOVED***number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop ***REMOVED***Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop ***REMOVED***ModifierFn} */
      fn: preventOverflow,
      /**
       * @prop ***REMOVED***Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],
      /**
       * @prop ***REMOVED***number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper this makes sure the popper has always a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop ***REMOVED***String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier, can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
***REMOVED***,

    /**
     * Modifier used to make sure the reference and its popper stay near eachothers
     * without leaving any gap between the two. Expecially useful when the arrow is
     * enabled and you want to assure it to point to its reference element.
     * It cares only about the first axis, you can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: ***REMOVED***
      /** @prop ***REMOVED***number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop ***REMOVED***Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop ***REMOVED***ModifierFn} */
      fn: keepTogether
***REMOVED***,

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjuction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: ***REMOVED***
      /** @prop ***REMOVED***number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop ***REMOVED***Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop ***REMOVED***ModifierFn} */
      fn: arrow,
      /** @prop ***REMOVED***String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
***REMOVED***,

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: ***REMOVED***
      /** @prop ***REMOVED***number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop ***REMOVED***Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop ***REMOVED***ModifierFn} */
      fn: flip,
      /**
       * @prop ***REMOVED***String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations).
       */
      behavior: 'flip',
      /**
       * @prop ***REMOVED***number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop ***REMOVED***String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position,
       * the popper will never be placed outside of the defined boundaries
       * (except if keepTogether is enabled)
       */
      boundariesElement: 'viewport'
***REMOVED***,

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: ***REMOVED***
      /** @prop ***REMOVED***number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop ***REMOVED***Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,
      /** @prop ***REMOVED***ModifierFn} */
      fn: inner
***REMOVED***,

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: ***REMOVED***
      /** @prop ***REMOVED***number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop ***REMOVED***Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop ***REMOVED***ModifierFn} */
      fn: hide
***REMOVED***,

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: ***REMOVED***
      /** @prop ***REMOVED***number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop ***REMOVED***Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop ***REMOVED***ModifierFn} */
      fn: computeStyle,
      /**
       * @prop ***REMOVED***Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3d transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties.
       */
      gpuAcceleration: true,
      /**
       * @prop ***REMOVED***string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',
      /**
       * @prop ***REMOVED***string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
***REMOVED***,

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define you own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: ***REMOVED***
      /** @prop ***REMOVED***number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop ***REMOVED***Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop ***REMOVED***ModifierFn} */
      fn: applyStyle,
      /** @prop ***REMOVED***Function} */
      onLoad: applyStyleOnLoad,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop ***REMOVED***Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3d transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties.
       */
      gpuAcceleration: undefined
***REMOVED***
***REMOVED***;

  /**
   * The `dataObject` is an object containing all the informations used by Popper.js
   * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property ***REMOVED***Object} data.instance The Popper.js instance
   * @property ***REMOVED***String} data.placement Placement applied to popper
   * @property ***REMOVED***String} data.originalPlacement Placement originally defined on init
   * @property ***REMOVED***Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property ***REMOVED***Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
   * @property ***REMOVED***HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property ***REMOVED***Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property ***REMOVED***Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property ***REMOVED***Object} data.boundaries Offsets of the popper boundaries
   * @property ***REMOVED***Object} data.offsets The measurements of popper, reference and arrow elements.
   * @property ***REMOVED***Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property ***REMOVED***Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property ***REMOVED***Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overriden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass as 3rd argument an object with the same
   * structure of this object, example:
   * ```
   * new Popper(ref, pop, ***REMOVED***
   *   modifiers: ***REMOVED***
   *     preventOverflow: ***REMOVED*** enabled: false }
   * ***REMOVED***
   * })
   * ```
   * @type ***REMOVED***Object}
   * @static
   * @memberof Popper
   */
  var Defaults = ***REMOVED***
    /**
     * Popper's placement
     * @prop ***REMOVED***Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop ***REMOVED***Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled
     * @prop ***REMOVED***Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop ***REMOVED***Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop ***REMOVED***onCreate}
     */
    onCreate: function onCreate() ***REMOVED***},

    /**
     * Callback called when the popper is updated, this callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop ***REMOVED***onUpdate}
     */
    onUpdate: function onUpdate() ***REMOVED***},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js
     * @prop ***REMOVED***modifiers}
     */
    modifiers: modifiers
***REMOVED***;

  /**
   * @callback onCreate
   * @param ***REMOVED***dataObject} data
   */

  /**
   * @callback onUpdate
   * @param ***REMOVED***dataObject} data
   */

  // Utils
  // Methods
  var Popper = function () ***REMOVED***
    /**
     * Create a new Popper.js instance
     * @class Popper
     * @param ***REMOVED***HTMLElement|referenceObject} reference - The reference element used to position the popper
     * @param ***REMOVED***HTMLElement} popper - The HTML element used as popper.
     * @param ***REMOVED***Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return ***REMOVED***Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) ***REMOVED***
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ***REMOVED***};
      classCallCheck(this, Popper);

      this.scheduleUpdate = function () ***REMOVED***
        return requestAnimationFrame(_this.update);
  ***REMOVED***;

      // make update() debounced, so that it only runs at most once-per-tick
      this.update = debounce(this.update.bind(this));

      // with ***REMOVED***} we create a new object with the options inside it
      this.options = _extends(***REMOVED***}, Popper.Defaults, options);

      // init state
      this.state = ***REMOVED***
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
  ***REMOVED***;

      // get reference and popper elements (allow jQuery wrappers)
      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper;

      // Deep merge modifiers options
      this.options.modifiers = ***REMOVED***};
      Object.keys(_extends(***REMOVED***}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) ***REMOVED***
        _this.options.modifiers[name] = _extends(***REMOVED***}, Popper.Defaults.modifiers[name] || ***REMOVED***}, options.modifiers ? options.modifiers[name] : ***REMOVED***});
  ***REMOVED***);

      // Refactoring modifiers' list (Object => Array)
      this.modifiers = Object.keys(this.options.modifiers).map(function (name) ***REMOVED***
        return _extends(***REMOVED***
          name: name
    ***REMOVED***, _this.options.modifiers[name]);
  ***REMOVED***)
      // sort the modifiers by order
      .sort(function (a, b) ***REMOVED***
        return a.order - b.order;
  ***REMOVED***);

      // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
      this.modifiers.forEach(function (modifierOptions) ***REMOVED***
        if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) ***REMOVED***
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
    ***REMOVED***
  ***REMOVED***);

      // fire the first update to position the popper in the right place
      this.update();

      var eventsEnabled = this.options.eventsEnabled;
      if (eventsEnabled) ***REMOVED***
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
  ***REMOVED***

      this.state.eventsEnabled = eventsEnabled;
***REMOVED***

    // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass(Popper, [***REMOVED***
      key: 'update',
      value: function update$$1() ***REMOVED***
        return update.call(this);
  ***REMOVED***
***REMOVED***, ***REMOVED***
      key: 'destroy',
      value: function destroy$$1() ***REMOVED***
        return destroy.call(this);
  ***REMOVED***
***REMOVED***, ***REMOVED***
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() ***REMOVED***
        return enableEventListeners.call(this);
  ***REMOVED***
***REMOVED***, ***REMOVED***
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() ***REMOVED***
        return disableEventListeners.call(this);
  ***REMOVED***

      /**
       * Schedule an update, it will run on the next UI update available
       * @method scheduleUpdate
       * @memberof Popper
       */


      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type ***REMOVED***Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

***REMOVED***]);
    return Popper;
***REMOVED***();

  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10
   * @name referenceObject
   * @property ***REMOVED***Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property ***REMOVED***number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property ***REMOVED***number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Dropdown = function ($$$1) ***REMOVED***
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'dropdown';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event = ***REMOVED***
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
      KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
***REMOVED***;
    var ClassName = ***REMOVED***
      DISABLED: 'disabled',
      SHOW: 'show',
      DROPUP: 'dropup',
      DROPRIGHT: 'dropright',
      DROPLEFT: 'dropleft',
      MENURIGHT: 'dropdown-menu-right',
      MENULEFT: 'dropdown-menu-left',
      POSITION_STATIC: 'position-static'
***REMOVED***;
    var Selector = ***REMOVED***
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
***REMOVED***;
    var AttachmentMap = ***REMOVED***
      TOP: 'top-start',
      TOPEND: 'top-end',
      BOTTOM: 'bottom-start',
      BOTTOMEND: 'bottom-end',
      RIGHT: 'right-start',
      RIGHTEND: 'right-end',
      LEFT: 'left-start',
      LEFTEND: 'left-end'
***REMOVED***;
    var Default = ***REMOVED***
      offset: 0,
      flip: true,
      boundary: 'scrollParent',
      reference: 'toggle',
      display: 'dynamic'
***REMOVED***;
    var DefaultType = ***REMOVED***
      offset: '(number|string|function)',
      flip: 'boolean',
      boundary: '(string|element)',
      reference: '(string|element)',
      display: 'string'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

***REMOVED***;

    var Dropdown =
    /*#__PURE__*/
    function () ***REMOVED***
      function Dropdown(element, config) ***REMOVED***
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
  ***REMOVED*** // Getters


      var _proto = Dropdown.prototype;

      // Public
      _proto.toggle = function toggle() ***REMOVED***
        if (this._element.disabled || $$$1(this._element).hasClass(ClassName.DISABLED)) ***REMOVED***
          return;
    ***REMOVED***

        var parent = Dropdown._getParentFromElement(this._element);

        var isActive = $$$1(this._menu).hasClass(ClassName.SHOW);

        Dropdown._clearMenus();

        if (isActive) ***REMOVED***
          return;
    ***REMOVED***

        var relatedTarget = ***REMOVED***
          relatedTarget: this._element
    ***REMOVED***;
        var showEvent = $$$1.Event(Event.SHOW, relatedTarget);
        $$$1(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) ***REMOVED***
          return;
    ***REMOVED*** // Disable totally Popper.js for Dropdown in Navbar


        if (!this._inNavbar) ***REMOVED***
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') ***REMOVED***
            throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
      ***REMOVED***

          var referenceElement = this._element;

          if (this._config.reference === 'parent') ***REMOVED***
            referenceElement = parent;
      ***REMOVED*** else if (Util.isElement(this._config.reference)) ***REMOVED***
            referenceElement = this._config.reference; // Check if it's jQuery element

            if (typeof this._config.reference.jquery !== 'undefined') ***REMOVED***
              referenceElement = this._config.reference[0];
        ***REMOVED***
      ***REMOVED*** // If boundary is not `scrollParent`, then set position to `static`
          // to allow the menu to "escape" the scroll parent's boundaries
          // https://github.com/twbs/bootstrap/issues/24251


          if (this._config.boundary !== 'scrollParent') ***REMOVED***
            $$$1(parent).addClass(ClassName.POSITION_STATIC);
      ***REMOVED***

          this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
    ***REMOVED*** // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && $$$1(parent).closest(Selector.NAVBAR_NAV).length === 0) ***REMOVED***
          $$$1(document.body).children().on('mouseover', null, $$$1.noop);
    ***REMOVED***

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        $$$1(this._menu).toggleClass(ClassName.SHOW);
        $$$1(parent).toggleClass(ClassName.SHOW).trigger($$$1.Event(Event.SHOWN, relatedTarget));
  ***REMOVED***;

      _proto.dispose = function dispose() ***REMOVED***
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._element).off(EVENT_KEY);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) ***REMOVED***
          this._popper.destroy();

          this._popper = null;
    ***REMOVED***
  ***REMOVED***;

      _proto.update = function update() ***REMOVED***
        this._inNavbar = this._detectNavbar();

        if (this._popper !== null) ***REMOVED***
          this._popper.scheduleUpdate();
    ***REMOVED***
  ***REMOVED***; // Private


      _proto._addEventListeners = function _addEventListeners() ***REMOVED***
        var _this = this;

        $$$1(this._element).on(Event.CLICK, function (event) ***REMOVED***
          event.preventDefault();
          event.stopPropagation();

          _this.toggle();
    ***REMOVED***);
  ***REMOVED***;

      _proto._getConfig = function _getConfig(config) ***REMOVED***
        config = _objectSpread(***REMOVED***}, this.constructor.Default, $$$1(this._element).data(), config);
        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
  ***REMOVED***;

      _proto._getMenuElement = function _getMenuElement() ***REMOVED***
        if (!this._menu) ***REMOVED***
          var parent = Dropdown._getParentFromElement(this._element);

          if (parent) ***REMOVED***
            this._menu = parent.querySelector(Selector.MENU);
      ***REMOVED***
    ***REMOVED***

        return this._menu;
  ***REMOVED***;

      _proto._getPlacement = function _getPlacement() ***REMOVED***
        var $parentDropdown = $$$1(this._element.parentNode);
        var placement = AttachmentMap.BOTTOM; // Handle dropup

        if ($parentDropdown.hasClass(ClassName.DROPUP)) ***REMOVED***
          placement = AttachmentMap.TOP;

          if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) ***REMOVED***
            placement = AttachmentMap.TOPEND;
      ***REMOVED***
    ***REMOVED*** else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) ***REMOVED***
          placement = AttachmentMap.RIGHT;
    ***REMOVED*** else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) ***REMOVED***
          placement = AttachmentMap.LEFT;
    ***REMOVED*** else if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) ***REMOVED***
          placement = AttachmentMap.BOTTOMEND;
    ***REMOVED***

        return placement;
  ***REMOVED***;

      _proto._detectNavbar = function _detectNavbar() ***REMOVED***
        return $$$1(this._element).closest('.navbar').length > 0;
  ***REMOVED***;

      _proto._getPopperConfig = function _getPopperConfig() ***REMOVED***
        var _this2 = this;

        var offsetConf = ***REMOVED***};

        if (typeof this._config.offset === 'function') ***REMOVED***
          offsetConf.fn = function (data) ***REMOVED***
            data.offsets = _objectSpread(***REMOVED***}, data.offsets, _this2._config.offset(data.offsets) || ***REMOVED***});
            return data;
      ***REMOVED***;
    ***REMOVED*** else ***REMOVED***
          offsetConf.offset = this._config.offset;
    ***REMOVED***

        var popperConfig = ***REMOVED***
          placement: this._getPlacement(),
          modifiers: ***REMOVED***
            offset: offsetConf,
            flip: ***REMOVED***
              enabled: this._config.flip
        ***REMOVED***,
            preventOverflow: ***REMOVED***
              boundariesElement: this._config.boundary
        ***REMOVED***
      ***REMOVED*** // Disable Popper.js if we have a static display

    ***REMOVED***;

        if (this._config.display === 'static') ***REMOVED***
          popperConfig.modifiers.applyStyle = ***REMOVED***
            enabled: false
      ***REMOVED***;
    ***REMOVED***

        return popperConfig;
  ***REMOVED***; // Static


      Dropdown._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
        return this.each(function () ***REMOVED***
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data) ***REMOVED***
            data = new Dropdown(this, _config);
            $$$1(this).data(DATA_KEY, data);
      ***REMOVED***

          if (typeof config === 'string') ***REMOVED***
            if (typeof data[config] === 'undefined') ***REMOVED***
              throw new TypeError("No method named \"" + config + "\"");
        ***REMOVED***

            data[config]();
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

      Dropdown._clearMenus = function _clearMenus(event) ***REMOVED***
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) ***REMOVED***
          return;
    ***REMOVED***

        var toggles = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggles.length; i < len; i++) ***REMOVED***
          var parent = Dropdown._getParentFromElement(toggles[i]);

          var context = $$$1(toggles[i]).data(DATA_KEY);
          var relatedTarget = ***REMOVED***
            relatedTarget: toggles[i]
      ***REMOVED***;

          if (event && event.type === 'click') ***REMOVED***
            relatedTarget.clickEvent = event;
      ***REMOVED***

          if (!context) ***REMOVED***
            continue;
      ***REMOVED***

          var dropdownMenu = context._menu;

          if (!$$$1(parent).hasClass(ClassName.SHOW)) ***REMOVED***
            continue;
      ***REMOVED***

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $$$1.contains(parent, event.target)) ***REMOVED***
            continue;
      ***REMOVED***

          var hideEvent = $$$1.Event(Event.HIDE, relatedTarget);
          $$$1(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) ***REMOVED***
            continue;
      ***REMOVED*** // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) ***REMOVED***
            $$$1(document.body).children().off('mouseover', null, $$$1.noop);
      ***REMOVED***

          toggles[i].setAttribute('aria-expanded', 'false');
          $$$1(dropdownMenu).removeClass(ClassName.SHOW);
          $$$1(parent).removeClass(ClassName.SHOW).trigger($$$1.Event(Event.HIDDEN, relatedTarget));
    ***REMOVED***
  ***REMOVED***;

      Dropdown._getParentFromElement = function _getParentFromElement(element) ***REMOVED***
        var parent;
        var selector = Util.getSelectorFromElement(element);

        if (selector) ***REMOVED***
          parent = document.querySelector(selector);
    ***REMOVED***

        return parent || element.parentNode;
  ***REMOVED***; // eslint-disable-next-line complexity


      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) ***REMOVED***
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $$$1(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) ***REMOVED***
          return;
    ***REMOVED***

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $$$1(this).hasClass(ClassName.DISABLED)) ***REMOVED***
          return;
    ***REMOVED***

        var parent = Dropdown._getParentFromElement(this);

        var isActive = $$$1(parent).hasClass(ClassName.SHOW);

        if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) ***REMOVED***
          if (event.which === ESCAPE_KEYCODE) ***REMOVED***
            var toggle = parent.querySelector(Selector.DATA_TOGGLE);
            $$$1(toggle).trigger('focus');
      ***REMOVED***

          $$$1(this).trigger('click');
          return;
    ***REMOVED***

        var items = [].slice.call(parent.querySelectorAll(Selector.VISIBLE_ITEMS));

        if (items.length === 0) ***REMOVED***
          return;
    ***REMOVED***

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) ***REMOVED***
          // Up
          index--;
    ***REMOVED***

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) ***REMOVED***
          // Down
          index++;
    ***REMOVED***

        if (index < 0) ***REMOVED***
          index = 0;
    ***REMOVED***

        items[index].focus();
  ***REMOVED***;

      _createClass(Dropdown, null, [***REMOVED***
        key: "VERSION",
        get: function get() ***REMOVED***
          return VERSION;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "Default",
        get: function get() ***REMOVED***
          return Default;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "DefaultType",
        get: function get() ***REMOVED***
          return DefaultType;
    ***REMOVED***
  ***REMOVED***]);

      return Dropdown;
***REMOVED***();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) ***REMOVED***
      event.preventDefault();
      event.stopPropagation();

      Dropdown._jQueryInterface.call($$$1(this), 'toggle');
***REMOVED***).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) ***REMOVED***
      e.stopPropagation();
***REMOVED***);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Dropdown._jQueryInterface;
    $$$1.fn[NAME].Constructor = Dropdown;

    $$$1.fn[NAME].noConflict = function () ***REMOVED***
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
***REMOVED***;

    return Dropdown;
***REMOVED***($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Modal = function ($$$1) ***REMOVED***
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'modal';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.modal';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default = ***REMOVED***
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
***REMOVED***;
    var DefaultType = ***REMOVED***
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
***REMOVED***;
    var Event = ***REMOVED***
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      RESIZE: "resize" + EVENT_KEY,
      CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
      KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
      MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
***REMOVED***;
    var ClassName = ***REMOVED***
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      SHOW: 'show'
***REMOVED***;
    var Selector = ***REMOVED***
      DIALOG: '.modal-dialog',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
      STICKY_CONTENT: '.sticky-top'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

***REMOVED***;

    var Modal =
    /*#__PURE__*/
    function () ***REMOVED***
      function Modal(element, config) ***REMOVED***
        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = element.querySelector(Selector.DIALOG);
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._scrollbarWidth = 0;
  ***REMOVED*** // Getters


      var _proto = Modal.prototype;

      // Public
      _proto.toggle = function toggle(relatedTarget) ***REMOVED***
        return this._isShown ? this.hide() : this.show(relatedTarget);
  ***REMOVED***;

      _proto.show = function show(relatedTarget) ***REMOVED***
        var _this = this;

        if (this._isTransitioning || this._isShown) ***REMOVED***
          return;
    ***REMOVED***

        if ($$$1(this._element).hasClass(ClassName.FADE)) ***REMOVED***
          this._isTransitioning = true;
    ***REMOVED***

        var showEvent = $$$1.Event(Event.SHOW, ***REMOVED***
          relatedTarget: relatedTarget
    ***REMOVED***);
        $$$1(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) ***REMOVED***
          return;
    ***REMOVED***

        this._isShown = true;

        this._checkScrollbar();

        this._setScrollbar();

        this._adjustDialog();

        $$$1(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) ***REMOVED***
          return _this.hide(event);
    ***REMOVED***);
        $$$1(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () ***REMOVED***
          $$$1(_this._element).one(Event.MOUSEUP_DISMISS, function (event) ***REMOVED***
            if ($$$1(event.target).is(_this._element)) ***REMOVED***
              _this._ignoreBackdropClick = true;
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***);

        this._showBackdrop(function () ***REMOVED***
          return _this._showElement(relatedTarget);
    ***REMOVED***);
  ***REMOVED***;

      _proto.hide = function hide(event) ***REMOVED***
        var _this2 = this;

        if (event) ***REMOVED***
          event.preventDefault();
    ***REMOVED***

        if (this._isTransitioning || !this._isShown) ***REMOVED***
          return;
    ***REMOVED***

        var hideEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) ***REMOVED***
          return;
    ***REMOVED***

        this._isShown = false;
        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (transition) ***REMOVED***
          this._isTransitioning = true;
    ***REMOVED***

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(document).off(Event.FOCUSIN);
        $$$1(this._element).removeClass(ClassName.SHOW);
        $$$1(this._element).off(Event.CLICK_DISMISS);
        $$$1(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (transition) ***REMOVED***
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._element).one(Util.TRANSITION_END, function (event) ***REMOVED***
            return _this2._hideModal(event);
      ***REMOVED***).emulateTransitionEnd(transitionDuration);
    ***REMOVED*** else ***REMOVED***
          this._hideModal();
    ***REMOVED***
  ***REMOVED***;

      _proto.dispose = function dispose() ***REMOVED***
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(window, document, this._element, this._backdrop).off(EVENT_KEY);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._scrollbarWidth = null;
  ***REMOVED***;

      _proto.handleUpdate = function handleUpdate() ***REMOVED***
        this._adjustDialog();
  ***REMOVED***; // Private


      _proto._getConfig = function _getConfig(config) ***REMOVED***
        config = _objectSpread(***REMOVED***}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
  ***REMOVED***;

      _proto._showElement = function _showElement(relatedTarget) ***REMOVED***
        var _this3 = this;

        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) ***REMOVED***
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
    ***REMOVED***

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.scrollTop = 0;

        if (transition) ***REMOVED***
          Util.reflow(this._element);
    ***REMOVED***

        $$$1(this._element).addClass(ClassName.SHOW);

        if (this._config.focus) ***REMOVED***
          this._enforceFocus();
    ***REMOVED***

        var shownEvent = $$$1.Event(Event.SHOWN, ***REMOVED***
          relatedTarget: relatedTarget
    ***REMOVED***);

        var transitionComplete = function transitionComplete() ***REMOVED***
          if (_this3._config.focus) ***REMOVED***
            _this3._element.focus();
      ***REMOVED***

          _this3._isTransitioning = false;
          $$$1(_this3._element).trigger(shownEvent);
    ***REMOVED***;

        if (transition) ***REMOVED***
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
    ***REMOVED*** else ***REMOVED***
          transitionComplete();
    ***REMOVED***
  ***REMOVED***;

      _proto._enforceFocus = function _enforceFocus() ***REMOVED***
        var _this4 = this;

        $$$1(document).off(Event.FOCUSIN) // Guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) ***REMOVED***
          if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) ***REMOVED***
            _this4._element.focus();
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

      _proto._setEscapeEvent = function _setEscapeEvent() ***REMOVED***
        var _this5 = this;

        if (this._isShown && this._config.keyboard) ***REMOVED***
          $$$1(this._element).on(Event.KEYDOWN_DISMISS, function (event) ***REMOVED***
            if (event.which === ESCAPE_KEYCODE) ***REMOVED***
              event.preventDefault();

              _this5.hide();
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED*** else if (!this._isShown) ***REMOVED***
          $$$1(this._element).off(Event.KEYDOWN_DISMISS);
    ***REMOVED***
  ***REMOVED***;

      _proto._setResizeEvent = function _setResizeEvent() ***REMOVED***
        var _this6 = this;

        if (this._isShown) ***REMOVED***
          $$$1(window).on(Event.RESIZE, function (event) ***REMOVED***
            return _this6.handleUpdate(event);
      ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
          $$$1(window).off(Event.RESIZE);
    ***REMOVED***
  ***REMOVED***;

      _proto._hideModal = function _hideModal() ***REMOVED***
        var _this7 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._isTransitioning = false;

        this._showBackdrop(function () ***REMOVED***
          $$$1(document.body).removeClass(ClassName.OPEN);

          _this7._resetAdjustments();

          _this7._resetScrollbar();

          $$$1(_this7._element).trigger(Event.HIDDEN);
    ***REMOVED***);
  ***REMOVED***;

      _proto._removeBackdrop = function _removeBackdrop() ***REMOVED***
        if (this._backdrop) ***REMOVED***
          $$$1(this._backdrop).remove();
          this._backdrop = null;
    ***REMOVED***
  ***REMOVED***;

      _proto._showBackdrop = function _showBackdrop(callback) ***REMOVED***
        var _this8 = this;

        var animate = $$$1(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) ***REMOVED***
          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) ***REMOVED***
            this._backdrop.classList.add(animate);
      ***REMOVED***

          $$$1(this._backdrop).appendTo(document.body);
          $$$1(this._element).on(Event.CLICK_DISMISS, function (event) ***REMOVED***
            if (_this8._ignoreBackdropClick) ***REMOVED***
              _this8._ignoreBackdropClick = false;
              return;
        ***REMOVED***

            if (event.target !== event.currentTarget) ***REMOVED***
              return;
        ***REMOVED***

            if (_this8._config.backdrop === 'static') ***REMOVED***
              _this8._element.focus();
        ***REMOVED*** else ***REMOVED***
              _this8.hide();
        ***REMOVED***
      ***REMOVED***);

          if (animate) ***REMOVED***
            Util.reflow(this._backdrop);
      ***REMOVED***

          $$$1(this._backdrop).addClass(ClassName.SHOW);

          if (!callback) ***REMOVED***
            return;
      ***REMOVED***

          if (!animate) ***REMOVED***
            callback();
            return;
      ***REMOVED***

          var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
          $$$1(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
    ***REMOVED*** else if (!this._isShown && this._backdrop) ***REMOVED***
          $$$1(this._backdrop).removeClass(ClassName.SHOW);

          var callbackRemove = function callbackRemove() ***REMOVED***
            _this8._removeBackdrop();

            if (callback) ***REMOVED***
              callback();
        ***REMOVED***
      ***REMOVED***;

          if ($$$1(this._element).hasClass(ClassName.FADE)) ***REMOVED***
            var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

            $$$1(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
      ***REMOVED*** else ***REMOVED***
            callbackRemove();
      ***REMOVED***
    ***REMOVED*** else if (callback) ***REMOVED***
          callback();
    ***REMOVED***
  ***REMOVED***; // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------


      _proto._adjustDialog = function _adjustDialog() ***REMOVED***
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) ***REMOVED***
          this._element.style.paddingLeft = this._scrollbarWidth + "px";
    ***REMOVED***

        if (this._isBodyOverflowing && !isModalOverflowing) ***REMOVED***
          this._element.style.paddingRight = this._scrollbarWidth + "px";
    ***REMOVED***
  ***REMOVED***;

      _proto._resetAdjustments = function _resetAdjustments() ***REMOVED***
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
  ***REMOVED***;

      _proto._checkScrollbar = function _checkScrollbar() ***REMOVED***
        var rect = document.body.getBoundingClientRect();
        this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
  ***REMOVED***;

      _proto._setScrollbar = function _setScrollbar() ***REMOVED***
        var _this9 = this;

        if (this._isBodyOverflowing) ***REMOVED***
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
          var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
          var stickyContent = [].slice.call(document.querySelectorAll(Selector.STICKY_CONTENT)); // Adjust fixed content padding

          $$$1(fixedContent).each(function (index, element) ***REMOVED***
            var actualPadding = element.style.paddingRight;
            var calculatedPadding = $$$1(element).css('padding-right');
            $$$1(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
      ***REMOVED***); // Adjust sticky content margin

          $$$1(stickyContent).each(function (index, element) ***REMOVED***
            var actualMargin = element.style.marginRight;
            var calculatedMargin = $$$1(element).css('margin-right');
            $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
      ***REMOVED***); // Adjust body padding

          var actualPadding = document.body.style.paddingRight;
          var calculatedPadding = $$$1(document.body).css('padding-right');
          $$$1(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
    ***REMOVED***
  ***REMOVED***;

      _proto._resetScrollbar = function _resetScrollbar() ***REMOVED***
        // Restore fixed content padding
        var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
        $$$1(fixedContent).each(function (index, element) ***REMOVED***
          var padding = $$$1(element).data('padding-right');
          $$$1(element).removeData('padding-right');
          element.style.paddingRight = padding ? padding : '';
    ***REMOVED***); // Restore sticky content

        var elements = [].slice.call(document.querySelectorAll("" + Selector.STICKY_CONTENT));
        $$$1(elements).each(function (index, element) ***REMOVED***
          var margin = $$$1(element).data('margin-right');

          if (typeof margin !== 'undefined') ***REMOVED***
            $$$1(element).css('margin-right', margin).removeData('margin-right');
      ***REMOVED***
    ***REMOVED***); // Restore body padding

        var padding = $$$1(document.body).data('padding-right');
        $$$1(document.body).removeData('padding-right');
        document.body.style.paddingRight = padding ? padding : '';
  ***REMOVED***;

      _proto._getScrollbarWidth = function _getScrollbarWidth() ***REMOVED***
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
  ***REMOVED***; // Static


      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) ***REMOVED***
        return this.each(function () ***REMOVED***
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread(***REMOVED***}, Default, $$$1(this).data(), typeof config === 'object' && config ? config : ***REMOVED***});

          if (!data) ***REMOVED***
            data = new Modal(this, _config);
            $$$1(this).data(DATA_KEY, data);
      ***REMOVED***

          if (typeof config === 'string') ***REMOVED***
            if (typeof data[config] === 'undefined') ***REMOVED***
              throw new TypeError("No method named \"" + config + "\"");
        ***REMOVED***

            data[config](relatedTarget);
      ***REMOVED*** else if (_config.show) ***REMOVED***
            data.show(relatedTarget);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

      _createClass(Modal, null, [***REMOVED***
        key: "VERSION",
        get: function get() ***REMOVED***
          return VERSION;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "Default",
        get: function get() ***REMOVED***
          return Default;
    ***REMOVED***
  ***REMOVED***]);

      return Modal;
***REMOVED***();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) ***REMOVED***
      var _this10 = this;

      var target;
      var selector = Util.getSelectorFromElement(this);

      if (selector) ***REMOVED***
        target = document.querySelector(selector);
  ***REMOVED***

      var config = $$$1(target).data(DATA_KEY) ? 'toggle' : _objectSpread(***REMOVED***}, $$$1(target).data(), $$$1(this).data());

      if (this.tagName === 'A' || this.tagName === 'AREA') ***REMOVED***
        event.preventDefault();
  ***REMOVED***

      var $target = $$$1(target).one(Event.SHOW, function (showEvent) ***REMOVED***
        if (showEvent.isDefaultPrevented()) ***REMOVED***
          // Only register focus restorer if modal will actually get shown
          return;
    ***REMOVED***

        $target.one(Event.HIDDEN, function () ***REMOVED***
          if ($$$1(_this10).is(':visible')) ***REMOVED***
            _this10.focus();
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***);

      Modal._jQueryInterface.call($$$1(target), config, this);
***REMOVED***);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Modal._jQueryInterface;
    $$$1.fn[NAME].Constructor = Modal;

    $$$1.fn[NAME].noConflict = function () ***REMOVED***
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal._jQueryInterface;
***REMOVED***;

    return Modal;
***REMOVED***($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tooltip = function ($$$1) ***REMOVED***
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tooltip';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DefaultType = ***REMOVED***
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: '(number|string)',
      container: '(string|element|boolean)',
      fallbackPlacement: '(string|array)',
      boundary: '(string|element)'
***REMOVED***;
    var AttachmentMap = ***REMOVED***
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: 'right',
      BOTTOM: 'bottom',
      LEFT: 'left'
***REMOVED***;
    var Default = ***REMOVED***
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: 0,
      container: false,
      fallbackPlacement: 'flip',
      boundary: 'scrollParent'
***REMOVED***;
    var HoverState = ***REMOVED***
      SHOW: 'show',
      OUT: 'out'
***REMOVED***;
    var Event = ***REMOVED***
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
***REMOVED***;
    var ClassName = ***REMOVED***
      FADE: 'fade',
      SHOW: 'show'
***REMOVED***;
    var Selector = ***REMOVED***
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner',
      ARROW: '.arrow'
***REMOVED***;
    var Trigger = ***REMOVED***
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

***REMOVED***;

    var Tooltip =
    /*#__PURE__*/
    function () ***REMOVED***
      function Tooltip(element, config) ***REMOVED***
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') ***REMOVED***
          throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
    ***REMOVED*** // private


        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = ***REMOVED***};
        this._popper = null; // Protected

        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
  ***REMOVED*** // Getters


      var _proto = Tooltip.prototype;

      // Public
      _proto.enable = function enable() ***REMOVED***
        this._isEnabled = true;
  ***REMOVED***;

      _proto.disable = function disable() ***REMOVED***
        this._isEnabled = false;
  ***REMOVED***;

      _proto.toggleEnabled = function toggleEnabled() ***REMOVED***
        this._isEnabled = !this._isEnabled;
  ***REMOVED***;

      _proto.toggle = function toggle(event) ***REMOVED***
        if (!this._isEnabled) ***REMOVED***
          return;
    ***REMOVED***

        if (event) ***REMOVED***
          var dataKey = this.constructor.DATA_KEY;
          var context = $$$1(event.currentTarget).data(dataKey);

          if (!context) ***REMOVED***
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $$$1(event.currentTarget).data(dataKey, context);
      ***REMOVED***

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) ***REMOVED***
            context._enter(null, context);
      ***REMOVED*** else ***REMOVED***
            context._leave(null, context);
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
          if ($$$1(this.getTipElement()).hasClass(ClassName.SHOW)) ***REMOVED***
            this._leave(null, this);

            return;
      ***REMOVED***

          this._enter(null, this);
    ***REMOVED***
  ***REMOVED***;

      _proto.dispose = function dispose() ***REMOVED***
        clearTimeout(this._timeout);
        $$$1.removeData(this.element, this.constructor.DATA_KEY);
        $$$1(this.element).off(this.constructor.EVENT_KEY);
        $$$1(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) ***REMOVED***
          $$$1(this.tip).remove();
    ***REMOVED***

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;

        if (this._popper !== null) ***REMOVED***
          this._popper.destroy();
    ***REMOVED***

        this._popper = null;
        this.element = null;
        this.config = null;
        this.tip = null;
  ***REMOVED***;

      _proto.show = function show() ***REMOVED***
        var _this = this;

        if ($$$1(this.element).css('display') === 'none') ***REMOVED***
          throw new Error('Please use show on visible elements');
    ***REMOVED***

        var showEvent = $$$1.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) ***REMOVED***
          $$$1(this.element).trigger(showEvent);
          var isInTheDom = $$$1.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) ***REMOVED***
            return;
      ***REMOVED***

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);
          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);
          this.setContent();

          if (this.config.animation) ***REMOVED***
            $$$1(tip).addClass(ClassName.FADE);
      ***REMOVED***

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          this.addAttachmentClass(attachment);
          var container = this.config.container === false ? document.body : $$$1(document).find(this.config.container);
          $$$1(tip).data(this.constructor.DATA_KEY, this);

          if (!$$$1.contains(this.element.ownerDocument.documentElement, this.tip)) ***REMOVED***
            $$$1(tip).appendTo(container);
      ***REMOVED***

          $$$1(this.element).trigger(this.constructor.Event.INSERTED);
          this._popper = new Popper(this.element, tip, ***REMOVED***
            placement: attachment,
            modifiers: ***REMOVED***
              offset: ***REMOVED***
                offset: this.config.offset
          ***REMOVED***,
              flip: ***REMOVED***
                behavior: this.config.fallbackPlacement
          ***REMOVED***,
              arrow: ***REMOVED***
                element: Selector.ARROW
          ***REMOVED***,
              preventOverflow: ***REMOVED***
                boundariesElement: this.config.boundary
          ***REMOVED***
        ***REMOVED***,
            onCreate: function onCreate(data) ***REMOVED***
              if (data.originalPlacement !== data.placement) ***REMOVED***
                _this._handlePopperPlacementChange(data);
          ***REMOVED***
        ***REMOVED***,
            onUpdate: function onUpdate(data) ***REMOVED***
              _this._handlePopperPlacementChange(data);
        ***REMOVED***
      ***REMOVED***);
          $$$1(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

          if ('ontouchstart' in document.documentElement) ***REMOVED***
            $$$1(document.body).children().on('mouseover', null, $$$1.noop);
      ***REMOVED***

          var complete = function complete() ***REMOVED***
            if (_this.config.animation) ***REMOVED***
              _this._fixTransition();
        ***REMOVED***

            var prevHoverState = _this._hoverState;
            _this._hoverState = null;
            $$$1(_this.element).trigger(_this.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) ***REMOVED***
              _this._leave(null, _this);
        ***REMOVED***
      ***REMOVED***;

          if ($$$1(this.tip).hasClass(ClassName.FADE)) ***REMOVED***
            var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
            $$$1(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      ***REMOVED*** else ***REMOVED***
            complete();
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;

      _proto.hide = function hide(callback) ***REMOVED***
        var _this2 = this;

        var tip = this.getTipElement();
        var hideEvent = $$$1.Event(this.constructor.Event.HIDE);

        var complete = function complete() ***REMOVED***
          if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) ***REMOVED***
            tip.parentNode.removeChild(tip);
      ***REMOVED***

          _this2._cleanTipClass();

          _this2.element.removeAttribute('aria-describedby');

          $$$1(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

          if (_this2._popper !== null) ***REMOVED***
            _this2._popper.destroy();
      ***REMOVED***

          if (callback) ***REMOVED***
            callback();
      ***REMOVED***
    ***REMOVED***;

        $$$1(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) ***REMOVED***
          return;
    ***REMOVED***

        $$$1(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) ***REMOVED***
          $$$1(document.body).children().off('mouseover', null, $$$1.noop);
    ***REMOVED***

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if ($$$1(this.tip).hasClass(ClassName.FADE)) ***REMOVED***
          var transitionDuration = Util.getTransitionDurationFromElement(tip);
          $$$1(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    ***REMOVED*** else ***REMOVED***
          complete();
    ***REMOVED***

        this._hoverState = '';
  ***REMOVED***;

      _proto.update = function update() ***REMOVED***
        if (this._popper !== null) ***REMOVED***
          this._popper.scheduleUpdate();
    ***REMOVED***
  ***REMOVED***; // Protected


      _proto.isWithContent = function isWithContent() ***REMOVED***
        return Boolean(this.getTitle());
  ***REMOVED***;

      _proto.addAttachmentClass = function addAttachmentClass(attachment) ***REMOVED***
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
  ***REMOVED***;

      _proto.getTipElement = function getTipElement() ***REMOVED***
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
  ***REMOVED***;

      _proto.setContent = function setContent() ***REMOVED***
        var tip = this.getTipElement();
        this.setElementContent($$$1(tip.querySelectorAll(Selector.TOOLTIP_INNER)), this.getTitle());
        $$$1(tip).removeClass(ClassName.FADE + " " + ClassName.SHOW);
  ***REMOVED***;

      _proto.setElementContent = function setElementContent($element, content) ***REMOVED***
        var html = this.config.html;

        if (typeof content === 'object' && (content.nodeType || content.jquery)) ***REMOVED***
          // Content is a DOM node or a jQuery
          if (html) ***REMOVED***
            if (!$$$1(content).parent().is($element)) ***REMOVED***
              $element.empty().append(content);
        ***REMOVED***
      ***REMOVED*** else ***REMOVED***
            $element.text($$$1(content).text());
      ***REMOVED***
    ***REMOVED*** else ***REMOVED***
          $element[html ? 'html' : 'text'](content);
    ***REMOVED***
  ***REMOVED***;

      _proto.getTitle = function getTitle() ***REMOVED***
        var title = this.element.getAttribute('data-original-title');

        if (!title) ***REMOVED***
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
    ***REMOVED***

        return title;
  ***REMOVED***; // Private


      _proto._getAttachment = function _getAttachment(placement) ***REMOVED***
        return AttachmentMap[placement.toUpperCase()];
  ***REMOVED***;

      _proto._setListeners = function _setListeners() ***REMOVED***
        var _this3 = this;

        var triggers = this.config.trigger.split(' ');
        triggers.forEach(function (trigger) ***REMOVED***
          if (trigger === 'click') ***REMOVED***
            $$$1(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) ***REMOVED***
              return _this3.toggle(event);
        ***REMOVED***);
      ***REMOVED*** else if (trigger !== Trigger.MANUAL) ***REMOVED***
            var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
            $$$1(_this3.element).on(eventIn, _this3.config.selector, function (event) ***REMOVED***
              return _this3._enter(event);
        ***REMOVED***).on(eventOut, _this3.config.selector, function (event) ***REMOVED***
              return _this3._leave(event);
        ***REMOVED***);
      ***REMOVED***

          $$$1(_this3.element).closest('.modal').on('hide.bs.modal', function () ***REMOVED***
            return _this3.hide();
      ***REMOVED***);
    ***REMOVED***);

        if (this.config.selector) ***REMOVED***
          this.config = _objectSpread(***REMOVED***}, this.config, ***REMOVED***
            trigger: 'manual',
            selector: ''
      ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
          this._fixTitle();
    ***REMOVED***
  ***REMOVED***;

      _proto._fixTitle = function _fixTitle() ***REMOVED***
        var titleType = typeof this.element.getAttribute('data-original-title');

        if (this.element.getAttribute('title') || titleType !== 'string') ***REMOVED***
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
    ***REMOVED***
  ***REMOVED***;

      _proto._enter = function _enter(event, context) ***REMOVED***
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) ***REMOVED***
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
    ***REMOVED***

        if (event) ***REMOVED***
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
    ***REMOVED***

        if ($$$1(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) ***REMOVED***
          context._hoverState = HoverState.SHOW;
          return;
    ***REMOVED***

        clearTimeout(context._timeout);
        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) ***REMOVED***
          context.show();
          return;
    ***REMOVED***

        context._timeout = setTimeout(function () ***REMOVED***
          if (context._hoverState === HoverState.SHOW) ***REMOVED***
            context.show();
      ***REMOVED***
    ***REMOVED***, context.config.delay.show);
  ***REMOVED***;

      _proto._leave = function _leave(event, context) ***REMOVED***
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) ***REMOVED***
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
    ***REMOVED***

        if (event) ***REMOVED***
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
    ***REMOVED***

        if (context._isWithActiveTrigger()) ***REMOVED***
          return;
    ***REMOVED***

        clearTimeout(context._timeout);
        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) ***REMOVED***
          context.hide();
          return;
    ***REMOVED***

        context._timeout = setTimeout(function () ***REMOVED***
          if (context._hoverState === HoverState.OUT) ***REMOVED***
            context.hide();
      ***REMOVED***
    ***REMOVED***, context.config.delay.hide);
  ***REMOVED***;

      _proto._isWithActiveTrigger = function _isWithActiveTrigger() ***REMOVED***
        for (var trigger in this._activeTrigger) ***REMOVED***
          if (this._activeTrigger[trigger]) ***REMOVED***
            return true;
      ***REMOVED***
    ***REMOVED***

        return false;
  ***REMOVED***;

      _proto._getConfig = function _getConfig(config) ***REMOVED***
        config = _objectSpread(***REMOVED***}, this.constructor.Default, $$$1(this.element).data(), typeof config === 'object' && config ? config : ***REMOVED***});

        if (typeof config.delay === 'number') ***REMOVED***
          config.delay = ***REMOVED***
            show: config.delay,
            hide: config.delay
      ***REMOVED***;
    ***REMOVED***

        if (typeof config.title === 'number') ***REMOVED***
          config.title = config.title.toString();
    ***REMOVED***

        if (typeof config.content === 'number') ***REMOVED***
          config.content = config.content.toString();
    ***REMOVED***

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
  ***REMOVED***;

      _proto._getDelegateConfig = function _getDelegateConfig() ***REMOVED***
        var config = ***REMOVED***};

        if (this.config) ***REMOVED***
          for (var key in this.config) ***REMOVED***
            if (this.constructor.Default[key] !== this.config[key]) ***REMOVED***
              config[key] = this.config[key];
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

        return config;
  ***REMOVED***;

      _proto._cleanTipClass = function _cleanTipClass() ***REMOVED***
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length) ***REMOVED***
          $tip.removeClass(tabClass.join(''));
    ***REMOVED***
  ***REMOVED***;

      _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) ***REMOVED***
        var popperInstance = popperData.instance;
        this.tip = popperInstance.popper;

        this._cleanTipClass();

        this.addAttachmentClass(this._getAttachment(popperData.placement));
  ***REMOVED***;

      _proto._fixTransition = function _fixTransition() ***REMOVED***
        var tip = this.getTipElement();
        var initConfigAnimation = this.config.animation;

        if (tip.getAttribute('x-placement') !== null) ***REMOVED***
          return;
    ***REMOVED***

        $$$1(tip).removeClass(ClassName.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
  ***REMOVED***; // Static


      Tooltip._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
        return this.each(function () ***REMOVED***
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data && /dispose|hide/.test(config)) ***REMOVED***
            return;
      ***REMOVED***

          if (!data) ***REMOVED***
            data = new Tooltip(this, _config);
            $$$1(this).data(DATA_KEY, data);
      ***REMOVED***

          if (typeof config === 'string') ***REMOVED***
            if (typeof data[config] === 'undefined') ***REMOVED***
              throw new TypeError("No method named \"" + config + "\"");
        ***REMOVED***

            data[config]();
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

      _createClass(Tooltip, null, [***REMOVED***
        key: "VERSION",
        get: function get() ***REMOVED***
          return VERSION;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "Default",
        get: function get() ***REMOVED***
          return Default;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "NAME",
        get: function get() ***REMOVED***
          return NAME;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "DATA_KEY",
        get: function get() ***REMOVED***
          return DATA_KEY;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "Event",
        get: function get() ***REMOVED***
          return Event;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "EVENT_KEY",
        get: function get() ***REMOVED***
          return EVENT_KEY;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "DefaultType",
        get: function get() ***REMOVED***
          return DefaultType;
    ***REMOVED***
  ***REMOVED***]);

      return Tooltip;
***REMOVED***();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Tooltip._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tooltip;

    $$$1.fn[NAME].noConflict = function () ***REMOVED***
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip._jQueryInterface;
***REMOVED***;

    return Tooltip;
***REMOVED***($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Popover = function ($$$1) ***REMOVED***
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'popover';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.popover';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-popover';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');

    var Default = _objectSpread(***REMOVED***}, Tooltip.Default, ***REMOVED***
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
***REMOVED***);

    var DefaultType = _objectSpread(***REMOVED***}, Tooltip.DefaultType, ***REMOVED***
      content: '(string|element|function)'
***REMOVED***);

    var ClassName = ***REMOVED***
      FADE: 'fade',
      SHOW: 'show'
***REMOVED***;
    var Selector = ***REMOVED***
      TITLE: '.popover-header',
      CONTENT: '.popover-body'
***REMOVED***;
    var Event = ***REMOVED***
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

***REMOVED***;

    var Popover =
    /*#__PURE__*/
    function (_Tooltip) ***REMOVED***
      _inheritsLoose(Popover, _Tooltip);

      function Popover() ***REMOVED***
        return _Tooltip.apply(this, arguments) || this;
  ***REMOVED***

      var _proto = Popover.prototype;

      // Overrides
      _proto.isWithContent = function isWithContent() ***REMOVED***
        return this.getTitle() || this._getContent();
  ***REMOVED***;

      _proto.addAttachmentClass = function addAttachmentClass(attachment) ***REMOVED***
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
  ***REMOVED***;

      _proto.getTipElement = function getTipElement() ***REMOVED***
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
  ***REMOVED***;

      _proto.setContent = function setContent() ***REMOVED***
        var $tip = $$$1(this.getTipElement()); // We use append for html objects to maintain js events

        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') ***REMOVED***
          content = content.call(this.element);
    ***REMOVED***

        this.setElementContent($tip.find(Selector.CONTENT), content);
        $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
  ***REMOVED***; // Private


      _proto._getContent = function _getContent() ***REMOVED***
        return this.element.getAttribute('data-content') || this.config.content;
  ***REMOVED***;

      _proto._cleanTipClass = function _cleanTipClass() ***REMOVED***
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length > 0) ***REMOVED***
          $tip.removeClass(tabClass.join(''));
    ***REMOVED***
  ***REMOVED***; // Static


      Popover._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
        return this.each(function () ***REMOVED***
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) ***REMOVED***
            return;
      ***REMOVED***

          if (!data) ***REMOVED***
            data = new Popover(this, _config);
            $$$1(this).data(DATA_KEY, data);
      ***REMOVED***

          if (typeof config === 'string') ***REMOVED***
            if (typeof data[config] === 'undefined') ***REMOVED***
              throw new TypeError("No method named \"" + config + "\"");
        ***REMOVED***

            data[config]();
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

      _createClass(Popover, null, [***REMOVED***
        key: "VERSION",
        // Getters
        get: function get() ***REMOVED***
          return VERSION;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "Default",
        get: function get() ***REMOVED***
          return Default;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "NAME",
        get: function get() ***REMOVED***
          return NAME;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "DATA_KEY",
        get: function get() ***REMOVED***
          return DATA_KEY;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "Event",
        get: function get() ***REMOVED***
          return Event;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "EVENT_KEY",
        get: function get() ***REMOVED***
          return EVENT_KEY;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "DefaultType",
        get: function get() ***REMOVED***
          return DefaultType;
    ***REMOVED***
  ***REMOVED***]);

      return Popover;
***REMOVED***(Tooltip);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Popover._jQueryInterface;
    $$$1.fn[NAME].Constructor = Popover;

    $$$1.fn[NAME].noConflict = function () ***REMOVED***
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
***REMOVED***;

    return Popover;
***REMOVED***($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var ScrollSpy = function ($$$1) ***REMOVED***
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'scrollspy';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.scrollspy';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = ***REMOVED***
      offset: 10,
      method: 'auto',
      target: ''
***REMOVED***;
    var DefaultType = ***REMOVED***
      offset: 'number',
      method: 'string',
      target: '(string|element)'
***REMOVED***;
    var Event = ***REMOVED***
      ACTIVATE: "activate" + EVENT_KEY,
      SCROLL: "scroll" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
***REMOVED***;
    var ClassName = ***REMOVED***
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active'
***REMOVED***;
    var Selector = ***REMOVED***
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      NAV_LIST_GROUP: '.nav, .list-group',
      NAV_LINKS: '.nav-link',
      NAV_ITEMS: '.nav-item',
      LIST_ITEMS: '.list-group-item',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
***REMOVED***;
    var OffsetMethod = ***REMOVED***
      OFFSET: 'offset',
      POSITION: 'position'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

***REMOVED***;

    var ScrollSpy =
    /*#__PURE__*/
    function () ***REMOVED***
      function ScrollSpy(element, config) ***REMOVED***
        var _this = this;

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;
        $$$1(this._scrollElement).on(Event.SCROLL, function (event) ***REMOVED***
          return _this._process(event);
    ***REMOVED***);
        this.refresh();

        this._process();
  ***REMOVED*** // Getters


      var _proto = ScrollSpy.prototype;

      // Public
      _proto.refresh = function refresh() ***REMOVED***
        var _this2 = this;

        var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = [].slice.call(document.querySelectorAll(this._selector));
        targets.map(function (element) ***REMOVED***
          var target;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) ***REMOVED***
            target = document.querySelector(targetSelector);
      ***REMOVED***

          if (target) ***REMOVED***
            var targetBCR = target.getBoundingClientRect();

            if (targetBCR.width || targetBCR.height) ***REMOVED***
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [$$$1(target)[offsetMethod]().top + offsetBase, targetSelector];
        ***REMOVED***
      ***REMOVED***

          return null;
    ***REMOVED***).filter(function (item) ***REMOVED***
          return item;
    ***REMOVED***).sort(function (a, b) ***REMOVED***
          return a[0] - b[0];
    ***REMOVED***).forEach(function (item) ***REMOVED***
          _this2._offsets.push(item[0]);

          _this2._targets.push(item[1]);
    ***REMOVED***);
  ***REMOVED***;

      _proto.dispose = function dispose() ***REMOVED***
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._scrollElement).off(EVENT_KEY);
        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
  ***REMOVED***; // Private


      _proto._getConfig = function _getConfig(config) ***REMOVED***
        config = _objectSpread(***REMOVED***}, Default, typeof config === 'object' && config ? config : ***REMOVED***});

        if (typeof config.target !== 'string') ***REMOVED***
          var id = $$$1(config.target).attr('id');

          if (!id) ***REMOVED***
            id = Util.getUID(NAME);
            $$$1(config.target).attr('id', id);
      ***REMOVED***

          config.target = "#" + id;
    ***REMOVED***

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
  ***REMOVED***;

      _proto._getScrollTop = function _getScrollTop() ***REMOVED***
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
  ***REMOVED***;

      _proto._getScrollHeight = function _getScrollHeight() ***REMOVED***
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  ***REMOVED***;

      _proto._getOffsetHeight = function _getOffsetHeight() ***REMOVED***
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
  ***REMOVED***;

      _proto._process = function _process() ***REMOVED***
        var scrollTop = this._getScrollTop() + this._config.offset;

        var scrollHeight = this._getScrollHeight();

        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) ***REMOVED***
          this.refresh();
    ***REMOVED***

        if (scrollTop >= maxScroll) ***REMOVED***
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) ***REMOVED***
            this._activate(target);
      ***REMOVED***

          return;
    ***REMOVED***

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) ***REMOVED***
          this._activeTarget = null;

          this._clear();

          return;
    ***REMOVED***

        var offsetLength = this._offsets.length;

        for (var i = offsetLength; i--;) ***REMOVED***
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) ***REMOVED***
            this._activate(this._targets[i]);
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;

      _proto._activate = function _activate(target) ***REMOVED***
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


        queries = queries.map(function (selector) ***REMOVED***
          return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
    ***REMOVED***);
        var $link = $$$1([].slice.call(document.querySelectorAll(queries.join(','))));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) ***REMOVED***
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
    ***REMOVED*** else ***REMOVED***
          // Set triggered link as active
          $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
    ***REMOVED***

        $$$1(this._scrollElement).trigger(Event.ACTIVATE, ***REMOVED***
          relatedTarget: target
    ***REMOVED***);
  ***REMOVED***;

      _proto._clear = function _clear() ***REMOVED***
        var nodes = [].slice.call(document.querySelectorAll(this._selector));
        $$$1(nodes).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
  ***REMOVED***; // Static


      ScrollSpy._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
        return this.each(function () ***REMOVED***
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data) ***REMOVED***
            data = new ScrollSpy(this, _config);
            $$$1(this).data(DATA_KEY, data);
      ***REMOVED***

          if (typeof config === 'string') ***REMOVED***
            if (typeof data[config] === 'undefined') ***REMOVED***
              throw new TypeError("No method named \"" + config + "\"");
        ***REMOVED***

            data[config]();
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

      _createClass(ScrollSpy, null, [***REMOVED***
        key: "VERSION",
        get: function get() ***REMOVED***
          return VERSION;
    ***REMOVED***
  ***REMOVED***, ***REMOVED***
        key: "Default",
        get: function get() ***REMOVED***
          return Default;
    ***REMOVED***
  ***REMOVED***]);

      return ScrollSpy;
***REMOVED***();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(window).on(Event.LOAD_DATA_API, function () ***REMOVED***
      var scrollSpys = [].slice.call(document.querySelectorAll(Selector.DATA_SPY));
      var scrollSpysLength = scrollSpys.length;

      for (var i = scrollSpysLength; i--;) ***REMOVED***
        var $spy = $$$1(scrollSpys[i]);

        ScrollSpy._jQueryInterface.call($spy, $spy.data());
  ***REMOVED***
***REMOVED***);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = ScrollSpy._jQueryInterface;
    $$$1.fn[NAME].Constructor = ScrollSpy;

    $$$1.fn[NAME].noConflict = function () ***REMOVED***
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy._jQueryInterface;
***REMOVED***;

    return ScrollSpy;
***REMOVED***($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tab = function ($$$1) ***REMOVED***
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tab';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tab';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Event = ***REMOVED***
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
***REMOVED***;
    var ClassName = ***REMOVED***
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      DISABLED: 'disabled',
      FADE: 'fade',
      SHOW: 'show'
***REMOVED***;
    var Selector = ***REMOVED***
      DROPDOWN: '.dropdown',
      NAV_LIST_GROUP: '.nav, .list-group',
      ACTIVE: '.active',
      ACTIVE_UL: '> li > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

***REMOVED***;

    var Tab =
    /*#__PURE__*/
    function () ***REMOVED***
      function Tab(element) ***REMOVED***
        this._element = element;
  ***REMOVED*** // Getters


      var _proto = Tab.prototype;

      // Public
      _proto.show = function show() ***REMOVED***
        var _this = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $$$1(this._element).hasClass(ClassName.ACTIVE) || $$$1(this._element).hasClass(ClassName.DISABLED)) ***REMOVED***
          return;
    ***REMOVED***

        var target;
        var previous;
        var listElement = $$$1(this._element).closest(Selector.NAV_LIST_GROUP)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) ***REMOVED***
          var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
          previous = $$$1.makeArray($$$1(listElement).find(itemSelector));
          previous = previous[previous.length - 1];
    ***REMOVED***

        var hideEvent = $$$1.Event(Event.HIDE, ***REMOVED***
          relatedTarget: this._element
    ***REMOVED***);
        var showEvent = $$$1.Event(Event.SHOW, ***REMOVED***
          relatedTarget: previous
    ***REMOVED***);

        if (previous) ***REMOVED***
          $$$1(previous).trigger(hideEvent);
    ***REMOVED***

        $$$1(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) ***REMOVED***
          return;
    ***REMOVED***

        if (selector) ***REMOVED***
          target = document.querySelector(selector);
    ***REMOVED***

        this._activate(this._element, listElement);

        var complete = function complete() ***REMOVED***
          var hiddenEvent = $$$1.Event(Event.HIDDEN, ***REMOVED***
            relatedTarget: _this._element
      ***REMOVED***);
          var shownEvent = $$$1.Event(Event.SHOWN, ***REMOVED***
            relatedTarget: previous
      ***REMOVED***);
          $$$1(previous).trigger(hiddenEvent);
          $$$1(_this._element).trigger(shownEvent);
    ***REMOVED***;

        if (target) ***REMOVED***
          this._activate(target, target.parentNode, complete);
    ***REMOVED*** else ***REMOVED***
          complete();
    ***REMOVED***
  ***REMOVED***;

      _proto.dispose = function dispose() ***REMOVED***
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
  ***REMOVED***; // Private


      _proto._activate = function _activate(element, container, callback) ***REMOVED***
        var _this2 = this;

        var activeElements;

        if (container.nodeName === 'UL') ***REMOVED***
          activeElements = $$$1(container).find(Selector.ACTIVE_UL);
    ***REMOVED*** else ***REMOVED***
          activeElements = $$$1(container).children(Selector.ACTIVE);
    ***REMOVED***

        var active = activeElements[0];
        var isTransitioning = callback && active && $$$1(active).hasClass(ClassName.FADE);

        var complete = function complete() ***REMOVED***
          return _this2._transitionComplete(element, active, callback);
    ***REMOVED***;

        if (active && isTransitioning) ***REMOVED***
          var transitionDuration = Util.getTransitionDurationFromElement(active);
          $$$1(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    ***REMOVED*** else ***REMOVED***
          complete();
    ***REMOVED***
  ***REMOVED***;

      _proto._transitionComplete = function _transitionComplete(element, active, callback) ***REMOVED***
        if (active) ***REMOVED***
          $$$1(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
          var dropdownChild = $$$1(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) ***REMOVED***
            $$$1(dropdownChild).removeClass(ClassName.ACTIVE);
      ***REMOVED***

          if (active.getAttribute('role') === 'tab') ***REMOVED***
            active.setAttribute('aria-selected', false);
      ***REMOVED***
    ***REMOVED***

        $$$1(element).addClass(ClassName.ACTIVE);

        if (element.getAttribute('role') === 'tab') ***REMOVED***
          element.setAttribute('aria-selected', true);
    ***REMOVED***

        Util.reflow(element);
        $$$1(element).addClass(ClassName.SHOW);

        if (element.parentNode && $$$1(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) ***REMOVED***
          var dropdownElement = $$$1(element).closest(Selector.DROPDOWN)[0];

          if (dropdownElement) ***REMOVED***
            var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector.DROPDOWN_TOGGLE));
            $$$1(dropdownToggleList).addClass(ClassName.ACTIVE);
      ***REMOVED***

          element.setAttribute('aria-expanded', true);
    ***REMOVED***

        if (callback) ***REMOVED***
          callback();
    ***REMOVED***
  ***REMOVED***; // Static


      Tab._jQueryInterface = function _jQueryInterface(config) ***REMOVED***
        return this.each(function () ***REMOVED***
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          if (!data) ***REMOVED***
            data = new Tab(this);
            $this.data(DATA_KEY, data);
      ***REMOVED***

          if (typeof config === 'string') ***REMOVED***
            if (typeof data[config] === 'undefined') ***REMOVED***
              throw new TypeError("No method named \"" + config + "\"");
        ***REMOVED***

            data[config]();
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***;

      _createClass(Tab, null, [***REMOVED***
        key: "VERSION",
        get: function get() ***REMOVED***
          return VERSION;
    ***REMOVED***
  ***REMOVED***]);

      return Tab;
***REMOVED***();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) ***REMOVED***
      event.preventDefault();

      Tab._jQueryInterface.call($$$1(this), 'show');
***REMOVED***);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Tab._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tab;

    $$$1.fn[NAME].noConflict = function () ***REMOVED***
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab._jQueryInterface;
***REMOVED***;

    return Tab;
***REMOVED***($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function ($$$1) ***REMOVED***
    if (typeof $$$1 === 'undefined') ***REMOVED***
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
***REMOVED***

    var version = $$$1.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) ***REMOVED***
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
***REMOVED***
***REMOVED***)($);

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', ***REMOVED*** value: true });

})));
//# sourceMappingURL=bootstrap.bundle.js.map
