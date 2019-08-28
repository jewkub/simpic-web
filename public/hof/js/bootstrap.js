/*!
  * Bootstrap v4.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) ***REMOVED***
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
  (factory((global.bootstrap = ***REMOVED***}),global.jQuery,global.Popper));
}(this, (function (exports,$,Popper) ***REMOVED*** 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

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
//# sourceMappingURL=bootstrap.js.map
