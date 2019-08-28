/*
 *  jQuery OwlCarousel v1.3.3
 *
 *  Copyright (c) 2013 Bartosz Wojciechowski
 *  http://www.owlgraphic.com/owlcarousel/
 *
 *  Licensed under MIT
 *
 */

/*JS Lint helpers: */
/*global dragMove: false, dragEnd: false, $, jQuery, alert, window, document */
/*jslint nomen: true, continue:true */

if (typeof Object.create !== "function") ***REMOVED***
    Object.create = function (obj) ***REMOVED***
        function F() ***REMOVED***}
        F.prototype = obj;
        return new F();
***REMOVED***;
}
(function ($, window, document) ***REMOVED***

    var Carousel = ***REMOVED***
        init : function (options, el) ***REMOVED***
            var base = this;

            base.$elem = $(el);
            base.options = $.extend(***REMOVED***}, $.fn.owlCarousel.options, base.$elem.data(), options);

            base.userOptions = options;
            base.loadContent();
    ***REMOVED***,

        loadContent : function () ***REMOVED***
            var base = this, url;

            function getData(data) ***REMOVED***
                var i, content = "";
                if (typeof base.options.jsonSuccess === "function") ***REMOVED***
                    base.options.jsonSuccess.apply(this, [data]);
            ***REMOVED*** else ***REMOVED***
                    for (i in data.owl) ***REMOVED***
                        if (data.owl.hasOwnProperty(i)) ***REMOVED***
                            content += data.owl[i].item;
                    ***REMOVED***
                ***REMOVED***
                    base.$elem.html(content);
            ***REMOVED***
                base.logIn();
        ***REMOVED***

            if (typeof base.options.beforeInit === "function") ***REMOVED***
                base.options.beforeInit.apply(this, [base.$elem]);
        ***REMOVED***

            if (typeof base.options.jsonPath === "string") ***REMOVED***
                url = base.options.jsonPath;
                $.getJSON(url, getData);
        ***REMOVED*** else ***REMOVED***
                base.logIn();
        ***REMOVED***
    ***REMOVED***,

        logIn : function () ***REMOVED***
            var base = this;

            base.$elem.data("owl-originalStyles", base.$elem.attr("style"));
            base.$elem.data("owl-originalClasses", base.$elem.attr("class"));

            base.$elem.css(***REMOVED***opacity: 0});
            base.orignalItems = base.options.items;
            base.checkBrowser();
            base.wrapperWidth = 0;
            base.checkVisible = null;
            base.setVars();
    ***REMOVED***,

        setVars : function () ***REMOVED***
            var base = this;
            if (base.$elem.children().length === 0) ***REMOVED***return false; }
            base.baseClass();
            base.eventTypes();
            base.$userItems = base.$elem.children();
            base.itemsAmount = base.$userItems.length;
            base.wrapItems();
            base.$owlItems = base.$elem.find(".owl-item");
            base.$owlWrapper = base.$elem.find(".owl-wrapper");
            base.playDirection = "next";
            base.prevItem = 0;
            base.prevArr = [0];
            base.currentItem = 0;
            base.customEvents();
            base.onStartup();
    ***REMOVED***,

        onStartup : function () ***REMOVED***
            var base = this;
            base.updateItems();
            base.calculateAll();
            base.buildControls();
            base.updateControls();
            base.response();
            base.moveEvents();
            base.stopOnHover();
            base.owlStatus();

            if (base.options.transitionStyle !== false) ***REMOVED***
                base.transitionTypes(base.options.transitionStyle);
        ***REMOVED***
            if (base.options.autoPlay === true) ***REMOVED***
                base.options.autoPlay = 5000;
        ***REMOVED***
            base.play();

            base.$elem.find(".owl-wrapper").css("display", "block");

            if (!base.$elem.is(":visible")) ***REMOVED***
                base.watchVisibility();
        ***REMOVED*** else ***REMOVED***
                base.$elem.css("opacity", 1);
        ***REMOVED***
            base.onstartup = false;
            base.eachMoveUpdate();
            if (typeof base.options.afterInit === "function") ***REMOVED***
                base.options.afterInit.apply(this, [base.$elem]);
        ***REMOVED***
    ***REMOVED***,

        eachMoveUpdate : function () ***REMOVED***
            var base = this;

            if (base.options.lazyLoad === true) ***REMOVED***
                base.lazyLoad();
        ***REMOVED***
            if (base.options.autoHeight === true) ***REMOVED***
                base.autoHeight();
        ***REMOVED***
            base.onVisibleItems();

            if (typeof base.options.afterAction === "function") ***REMOVED***
                base.options.afterAction.apply(this, [base.$elem]);
        ***REMOVED***
    ***REMOVED***,

        updateVars : function () ***REMOVED***
            var base = this;
            if (typeof base.options.beforeUpdate === "function") ***REMOVED***
                base.options.beforeUpdate.apply(this, [base.$elem]);
        ***REMOVED***
            base.watchVisibility();
            base.updateItems();
            base.calculateAll();
            base.updatePosition();
            base.updateControls();
            base.eachMoveUpdate();
            if (typeof base.options.afterUpdate === "function") ***REMOVED***
                base.options.afterUpdate.apply(this, [base.$elem]);
        ***REMOVED***
    ***REMOVED***,

        reload : function () ***REMOVED***
            var base = this;
            window.setTimeout(function () ***REMOVED***
                base.updateVars();
        ***REMOVED***, 0);
    ***REMOVED***,

        watchVisibility : function () ***REMOVED***
            var base = this;

            if (base.$elem.is(":visible") === false) ***REMOVED***
                base.$elem.css(***REMOVED***opacity: 0});
                window.clearInterval(base.autoPlayInterval);
                window.clearInterval(base.checkVisible);
        ***REMOVED*** else ***REMOVED***
                return false;
        ***REMOVED***
            base.checkVisible = window.setInterval(function () ***REMOVED***
                if (base.$elem.is(":visible")) ***REMOVED***
                    base.reload();
                    base.$elem.animate(***REMOVED***opacity: 1}, 200);
                    window.clearInterval(base.checkVisible);
            ***REMOVED***
        ***REMOVED***, 500);
    ***REMOVED***,

        wrapItems : function () ***REMOVED***
            var base = this;
            base.$userItems.wrapAll("<div class=\"owl-wrapper\">").wrap("<div class=\"owl-item\"></div>");
            base.$elem.find(".owl-wrapper").wrap("<div class=\"owl-wrapper-outer\">");
            base.wrapperOuter = base.$elem.find(".owl-wrapper-outer");
            base.$elem.css("display", "block");
    ***REMOVED***,

        baseClass : function () ***REMOVED***
            var base = this,
                hasBaseClass = base.$elem.hasClass(base.options.baseClass),
                hasThemeClass = base.$elem.hasClass(base.options.theme);

            if (!hasBaseClass) ***REMOVED***
                base.$elem.addClass(base.options.baseClass);
        ***REMOVED***

            if (!hasThemeClass) ***REMOVED***
                base.$elem.addClass(base.options.theme);
        ***REMOVED***
    ***REMOVED***,

        updateItems : function () ***REMOVED***
            var base = this, width, i;

            if (base.options.responsive === false) ***REMOVED***
                return false;
        ***REMOVED***
            if (base.options.singleItem === true) ***REMOVED***
                base.options.items = base.orignalItems = 1;
                base.options.itemsCustom = false;
                base.options.itemsDesktop = false;
                base.options.itemsDesktopSmall = false;
                base.options.itemsTablet = false;
                base.options.itemsTabletSmall = false;
                base.options.itemsMobile = false;
                return false;
        ***REMOVED***

            width = $(base.options.responsiveBaseWidth).width();

            if (width > (base.options.itemsDesktop[0] || base.orignalItems)) ***REMOVED***
                base.options.items = base.orignalItems;
        ***REMOVED***
            if (base.options.itemsCustom !== false) ***REMOVED***
                //Reorder array by screen size
                base.options.itemsCustom.sort(function (a, b) ***REMOVED***return a[0] - b[0]; });

                for (i = 0; i < base.options.itemsCustom.length; i += 1) ***REMOVED***
                    if (base.options.itemsCustom[i][0] <= width) ***REMOVED***
                        base.options.items = base.options.itemsCustom[i][1];
                ***REMOVED***
            ***REMOVED***

        ***REMOVED*** else ***REMOVED***

                if (width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false) ***REMOVED***
                    base.options.items = base.options.itemsDesktop[1];
            ***REMOVED***

                if (width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false) ***REMOVED***
                    base.options.items = base.options.itemsDesktopSmall[1];
            ***REMOVED***

                if (width <= base.options.itemsTablet[0] && base.options.itemsTablet !== false) ***REMOVED***
                    base.options.items = base.options.itemsTablet[1];
            ***REMOVED***

                if (width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== false) ***REMOVED***
                    base.options.items = base.options.itemsTabletSmall[1];
            ***REMOVED***

                if (width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false) ***REMOVED***
                    base.options.items = base.options.itemsMobile[1];
            ***REMOVED***
        ***REMOVED***

            //if number of items is less than declared
            if (base.options.items > base.itemsAmount && base.options.itemsScaleUp === true) ***REMOVED***
                base.options.items = base.itemsAmount;
        ***REMOVED***
    ***REMOVED***,

        response : function () ***REMOVED***
            var base = this,
                smallDelay,
                lastWindowWidth;

            if (base.options.responsive !== true) ***REMOVED***
                return false;
        ***REMOVED***
            lastWindowWidth = $(window).width();

            base.resizer = function () ***REMOVED***
                if ($(window).width() !== lastWindowWidth) ***REMOVED***
                    if (base.options.autoPlay !== false) ***REMOVED***
                        window.clearInterval(base.autoPlayInterval);
                ***REMOVED***
                    window.clearTimeout(smallDelay);
                    smallDelay = window.setTimeout(function () ***REMOVED***
                        lastWindowWidth = $(window).width();
                        base.updateVars();
                ***REMOVED***, base.options.responsiveRefreshRate);
            ***REMOVED***
        ***REMOVED***;
            $(window).resize(base.resizer);
    ***REMOVED***,

        updatePosition : function () ***REMOVED***
            var base = this;
            base.jumpTo(base.currentItem);
            if (base.options.autoPlay !== false) ***REMOVED***
                base.checkAp();
        ***REMOVED***
    ***REMOVED***,

        appendItemsSizes : function () ***REMOVED***
            var base = this,
                roundPages = 0,
                lastItem = base.itemsAmount - base.options.items;

            base.$owlItems.each(function (index) ***REMOVED***
                var $this = $(this);
                $this
                    .css(***REMOVED***"width": base.itemWidth})
                    .data("owl-item", Number(index));

                if (index % base.options.items === 0 || index === lastItem) ***REMOVED***
                    if (!(index > lastItem)) ***REMOVED***
                        roundPages += 1;
                ***REMOVED***
            ***REMOVED***
                $this.data("owl-roundPages", roundPages);
        ***REMOVED***);
    ***REMOVED***,

        appendWrapperSizes : function () ***REMOVED***
            var base = this,
                width = base.$owlItems.length * base.itemWidth;

            base.$owlWrapper.css(***REMOVED***
                "width": width * 2,
                "left": 0
        ***REMOVED***);
            base.appendItemsSizes();
    ***REMOVED***,

        calculateAll : function () ***REMOVED***
            var base = this;
            base.calculateWidth();
            base.appendWrapperSizes();
            base.loops();
            base.max();
    ***REMOVED***,

        calculateWidth : function () ***REMOVED***
            var base = this;
            base.itemWidth = Math.round(base.$elem.width() / base.options.items);
    ***REMOVED***,

        max : function () ***REMOVED***
            var base = this,
                maximum = ((base.itemsAmount * base.itemWidth) - base.options.items * base.itemWidth) * -1;
            if (base.options.items > base.itemsAmount) ***REMOVED***
                base.maximumItem = 0;
                maximum = 0;
                base.maximumPixels = 0;
        ***REMOVED*** else ***REMOVED***
                base.maximumItem = base.itemsAmount - base.options.items;
                base.maximumPixels = maximum;
        ***REMOVED***
            return maximum;
    ***REMOVED***,

        min : function () ***REMOVED***
            return 0;
    ***REMOVED***,

        loops : function () ***REMOVED***
            var base = this,
                prev = 0,
                elWidth = 0,
                i,
                item,
                roundPageNum;

            base.positionsInArray = [0];
            base.pagesInArray = [];

            for (i = 0; i < base.itemsAmount; i += 1) ***REMOVED***
                elWidth += base.itemWidth;
                base.positionsInArray.push(-elWidth);

                if (base.options.scrollPerPage === true) ***REMOVED***
                    item = $(base.$owlItems[i]);
                    roundPageNum = item.data("owl-roundPages");
                    if (roundPageNum !== prev) ***REMOVED***
                        base.pagesInArray[prev] = base.positionsInArray[i];
                        prev = roundPageNum;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***,

        buildControls : function () ***REMOVED***
            var base = this;
            if (base.options.navigation === true || base.options.pagination === true) ***REMOVED***
                base.owlControls = $("<div class=\"owl-controls\"/>").toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem);
        ***REMOVED***
            if (base.options.pagination === true) ***REMOVED***
                base.buildPagination();
        ***REMOVED***
            if (base.options.navigation === true) ***REMOVED***
                base.buildButtons();
        ***REMOVED***
    ***REMOVED***,

        buildButtons : function () ***REMOVED***
            var base = this,
                buttonsWrapper = $("<div class=\"owl-buttons\"/>");
            base.owlControls.append(buttonsWrapper);

            base.buttonPrev = $("<div/>", ***REMOVED***
                "class" : "owl-prev",
                "html" : base.options.navigationText[0] || ""
        ***REMOVED***);

            base.buttonNext = $("<div/>", ***REMOVED***
                "class" : "owl-next",
                "html" : base.options.navigationText[1] || ""
        ***REMOVED***);

            buttonsWrapper
                .append(base.buttonPrev)
                .append(base.buttonNext);

            buttonsWrapper.on("touchstart.owlControls mousedown.owlControls", "div[class^=\"owl\"]", function (event) ***REMOVED***
                event.preventDefault();
        ***REMOVED***);

            buttonsWrapper.on("touchend.owlControls mouseup.owlControls", "div[class^=\"owl\"]", function (event) ***REMOVED***
                event.preventDefault();
                if ($(this).hasClass("owl-next")) ***REMOVED***
                    base.next();
            ***REMOVED*** else ***REMOVED***
                    base.prev();
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED***,

        buildPagination : function () ***REMOVED***
            var base = this;

            base.paginationWrapper = $("<div class=\"owl-pagination\"/>");
            base.owlControls.append(base.paginationWrapper);

            base.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (event) ***REMOVED***
                event.preventDefault();
                if (Number($(this).data("owl-page")) !== base.currentItem) ***REMOVED***
                    base.goTo(Number($(this).data("owl-page")), true);
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED***,

        updatePagination : function () ***REMOVED***
            var base = this,
                counter,
                lastPage,
                lastItem,
                i,
                paginationButton,
                paginationButtonInner;

            if (base.options.pagination === false) ***REMOVED***
                return false;
        ***REMOVED***

            base.paginationWrapper.html("");

            counter = 0;
            lastPage = base.itemsAmount - base.itemsAmount % base.options.items;

            for (i = 0; i < base.itemsAmount; i += 1) ***REMOVED***
                if (i % base.options.items === 0) ***REMOVED***
                    counter += 1;
                    if (lastPage === i) ***REMOVED***
                        lastItem = base.itemsAmount - base.options.items;
                ***REMOVED***
                    paginationButton = $("<div/>", ***REMOVED***
                        "class" : "owl-page"
                ***REMOVED***);
                    paginationButtonInner = $("<span></span>", ***REMOVED***
                        "text": base.options.paginationNumbers === true ? counter : "",
                        "class": base.options.paginationNumbers === true ? "owl-numbers" : ""
                ***REMOVED***);
                    paginationButton.append(paginationButtonInner);

                    paginationButton.data("owl-page", lastPage === i ? lastItem : i);
                    paginationButton.data("owl-roundPages", counter);

                    base.paginationWrapper.append(paginationButton);
            ***REMOVED***
        ***REMOVED***
            base.checkPagination();
    ***REMOVED***,
        checkPagination : function () ***REMOVED***
            var base = this;
            if (base.options.pagination === false) ***REMOVED***
                return false;
        ***REMOVED***
            base.paginationWrapper.find(".owl-page").each(function () ***REMOVED***
                if ($(this).data("owl-roundPages") === $(base.$owlItems[base.currentItem]).data("owl-roundPages")) ***REMOVED***
                    base.paginationWrapper
                        .find(".owl-page")
                        .removeClass("active");
                    $(this).addClass("active");
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED***,

        checkNavigation : function () ***REMOVED***
            var base = this;

            if (base.options.navigation === false) ***REMOVED***
                return false;
        ***REMOVED***
            if (base.options.rewindNav === false) ***REMOVED***
                if (base.currentItem === 0 && base.maximumItem === 0) ***REMOVED***
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.addClass("disabled");
            ***REMOVED*** else if (base.currentItem === 0 && base.maximumItem !== 0) ***REMOVED***
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.removeClass("disabled");
            ***REMOVED*** else if (base.currentItem === base.maximumItem) ***REMOVED***
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.addClass("disabled");
            ***REMOVED*** else if (base.currentItem !== 0 && base.currentItem !== base.maximumItem) ***REMOVED***
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.removeClass("disabled");
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***,

        updateControls : function () ***REMOVED***
            var base = this;
            base.updatePagination();
            base.checkNavigation();
            if (base.owlControls) ***REMOVED***
                if (base.options.items >= base.itemsAmount) ***REMOVED***
                    base.owlControls.hide();
            ***REMOVED*** else ***REMOVED***
                    base.owlControls.show();
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***,

        destroyControls : function () ***REMOVED***
            var base = this;
            if (base.owlControls) ***REMOVED***
                base.owlControls.remove();
        ***REMOVED***
    ***REMOVED***,

        next : function (speed) ***REMOVED***
            var base = this;

            if (base.isTransition) ***REMOVED***
                return false;
        ***REMOVED***

            base.currentItem += base.options.scrollPerPage === true ? base.options.items : 1;
            if (base.currentItem > base.maximumItem + (base.options.scrollPerPage === true ? (base.options.items - 1) : 0)) ***REMOVED***
                if (base.options.rewindNav === true) ***REMOVED***
                    base.currentItem = 0;
                    speed = "rewind";
            ***REMOVED*** else ***REMOVED***
                    base.currentItem = base.maximumItem;
                    return false;
            ***REMOVED***
        ***REMOVED***
            base.goTo(base.currentItem, speed);
    ***REMOVED***,

        prev : function (speed) ***REMOVED***
            var base = this;

            if (base.isTransition) ***REMOVED***
                return false;
        ***REMOVED***

            if (base.options.scrollPerPage === true && base.currentItem > 0 && base.currentItem < base.options.items) ***REMOVED***
                base.currentItem = 0;
        ***REMOVED*** else ***REMOVED***
                base.currentItem -= base.options.scrollPerPage === true ? base.options.items : 1;
        ***REMOVED***
            if (base.currentItem < 0) ***REMOVED***
                if (base.options.rewindNav === true) ***REMOVED***
                    base.currentItem = base.maximumItem;
                    speed = "rewind";
            ***REMOVED*** else ***REMOVED***
                    base.currentItem = 0;
                    return false;
            ***REMOVED***
        ***REMOVED***
            base.goTo(base.currentItem, speed);
    ***REMOVED***,

        goTo : function (position, speed, drag) ***REMOVED***
            var base = this,
                goToPixel;

            if (base.isTransition) ***REMOVED***
                return false;
        ***REMOVED***
            if (typeof base.options.beforeMove === "function") ***REMOVED***
                base.options.beforeMove.apply(this, [base.$elem]);
        ***REMOVED***
            if (position >= base.maximumItem) ***REMOVED***
                position = base.maximumItem;
        ***REMOVED*** else if (position <= 0) ***REMOVED***
                position = 0;
        ***REMOVED***

            base.currentItem = base.owl.currentItem = position;
            if (base.options.transitionStyle !== false && drag !== "drag" && base.options.items === 1 && base.browser.support3d === true) ***REMOVED***
                base.swapSpeed(0);
                if (base.browser.support3d === true) ***REMOVED***
                    base.transition3d(base.positionsInArray[position]);
            ***REMOVED*** else ***REMOVED***
                    base.css2slide(base.positionsInArray[position], 1);
            ***REMOVED***
                base.afterGo();
                base.singleItemTransition();
                return false;
        ***REMOVED***
            goToPixel = base.positionsInArray[position];

            if (base.browser.support3d === true) ***REMOVED***
                base.isCss3Finish = false;

                if (speed === true) ***REMOVED***
                    base.swapSpeed("paginationSpeed");
                    window.setTimeout(function () ***REMOVED***
                        base.isCss3Finish = true;
                ***REMOVED***, base.options.paginationSpeed);

            ***REMOVED*** else if (speed === "rewind") ***REMOVED***
                    base.swapSpeed(base.options.rewindSpeed);
                    window.setTimeout(function () ***REMOVED***
                        base.isCss3Finish = true;
                ***REMOVED***, base.options.rewindSpeed);

            ***REMOVED*** else ***REMOVED***
                    base.swapSpeed("slideSpeed");
                    window.setTimeout(function () ***REMOVED***
                        base.isCss3Finish = true;
                ***REMOVED***, base.options.slideSpeed);
            ***REMOVED***
                base.transition3d(goToPixel);
        ***REMOVED*** else ***REMOVED***
                if (speed === true) ***REMOVED***
                    base.css2slide(goToPixel, base.options.paginationSpeed);
            ***REMOVED*** else if (speed === "rewind") ***REMOVED***
                    base.css2slide(goToPixel, base.options.rewindSpeed);
            ***REMOVED*** else ***REMOVED***
                    base.css2slide(goToPixel, base.options.slideSpeed);
            ***REMOVED***
        ***REMOVED***
            base.afterGo();
    ***REMOVED***,

        jumpTo : function (position) ***REMOVED***
            var base = this;
            if (typeof base.options.beforeMove === "function") ***REMOVED***
                base.options.beforeMove.apply(this, [base.$elem]);
        ***REMOVED***
            if (position >= base.maximumItem || position === -1) ***REMOVED***
                position = base.maximumItem;
        ***REMOVED*** else if (position <= 0) ***REMOVED***
                position = 0;
        ***REMOVED***
            base.swapSpeed(0);
            if (base.browser.support3d === true) ***REMOVED***
                base.transition3d(base.positionsInArray[position]);
        ***REMOVED*** else ***REMOVED***
                base.css2slide(base.positionsInArray[position], 1);
        ***REMOVED***
            base.currentItem = base.owl.currentItem = position;
            base.afterGo();
    ***REMOVED***,

        afterGo : function () ***REMOVED***
            var base = this;

            base.prevArr.push(base.currentItem);
            base.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length - 2];
            base.prevArr.shift(0);

            if (base.prevItem !== base.currentItem) ***REMOVED***
                base.checkPagination();
                base.checkNavigation();
                base.eachMoveUpdate();

                if (base.options.autoPlay !== false) ***REMOVED***
                    base.checkAp();
            ***REMOVED***
        ***REMOVED***
            if (typeof base.options.afterMove === "function" && base.prevItem !== base.currentItem) ***REMOVED***
                base.options.afterMove.apply(this, [base.$elem]);
        ***REMOVED***
    ***REMOVED***,

        stop : function () ***REMOVED***
            var base = this;
            base.apStatus = "stop";
            window.clearInterval(base.autoPlayInterval);
    ***REMOVED***,

        checkAp : function () ***REMOVED***
            var base = this;
            if (base.apStatus !== "stop") ***REMOVED***
                base.play();
        ***REMOVED***
    ***REMOVED***,

        play : function () ***REMOVED***
            var base = this;
            base.apStatus = "play";
            if (base.options.autoPlay === false) ***REMOVED***
                return false;
        ***REMOVED***
            window.clearInterval(base.autoPlayInterval);
            base.autoPlayInterval = window.setInterval(function () ***REMOVED***
                base.next(true);
        ***REMOVED***, base.options.autoPlay);
    ***REMOVED***,

        swapSpeed : function (action) ***REMOVED***
            var base = this;
            if (action === "slideSpeed") ***REMOVED***
                base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed));
        ***REMOVED*** else if (action === "paginationSpeed") ***REMOVED***
                base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed));
        ***REMOVED*** else if (typeof action !== "string") ***REMOVED***
                base.$owlWrapper.css(base.addCssSpeed(action));
        ***REMOVED***
    ***REMOVED***,

        addCssSpeed : function (speed) ***REMOVED***
            return ***REMOVED***
                "-webkit-transition": "all " + speed + "ms ease",
                "-moz-transition": "all " + speed + "ms ease",
                "-o-transition": "all " + speed + "ms ease",
                "transition": "all " + speed + "ms ease"
        ***REMOVED***;
    ***REMOVED***,

        removeTransition : function () ***REMOVED***
            return ***REMOVED***
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                "transition": ""
        ***REMOVED***;
    ***REMOVED***,

        doTranslate : function (pixels) ***REMOVED***
            return ***REMOVED***
                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "transform": "translate3d(" + pixels + "px, 0px,0px)"
        ***REMOVED***;
    ***REMOVED***,

        transition3d : function (value) ***REMOVED***
            var base = this;
            base.$owlWrapper.css(base.doTranslate(value));
    ***REMOVED***,

        css2move : function (value) ***REMOVED***
            var base = this;
            base.$owlWrapper.css(***REMOVED***"left" : value});
    ***REMOVED***,

        css2slide : function (value, speed) ***REMOVED***
            var base = this;

            base.isCssFinish = false;
            base.$owlWrapper.stop(true, true).animate(***REMOVED***
                "left" : value
        ***REMOVED***, ***REMOVED***
                duration : speed || base.options.slideSpeed,
                complete : function () ***REMOVED***
                    base.isCssFinish = true;
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED***,

        checkBrowser : function () ***REMOVED***
            var base = this,
                translate3D = "translate3d(0px, 0px, 0px)",
                tempElem = document.createElement("div"),
                regex,
                asSupport,
                support3d,
                isTouch;

            tempElem.style.cssText = "  -moz-transform:" + translate3D +
                                  "; -ms-transform:"     + translate3D +
                                  "; -o-transform:"      + translate3D +
                                  "; -webkit-transform:" + translate3D +
                                  "; transform:"         + translate3D;
            regex = /translate3d\(0px, 0px, 0px\)/g;
            asSupport = tempElem.style.cssText.match(regex);
            support3d = (asSupport !== null && asSupport.length === 1);

            isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;

            base.browser = ***REMOVED***
                "support3d" : support3d,
                "isTouch" : isTouch
        ***REMOVED***;
    ***REMOVED***,

        moveEvents : function () ***REMOVED***
            var base = this;
            if (base.options.mouseDrag !== false || base.options.touchDrag !== false) ***REMOVED***
                base.gestures();
                base.disabledEvents();
        ***REMOVED***
    ***REMOVED***,

        eventTypes : function () ***REMOVED***
            var base = this,
                types = ["s", "e", "x"];

            base.ev_types = ***REMOVED***};

            if (base.options.mouseDrag === true && base.options.touchDrag === true) ***REMOVED***
                types = [
                    "touchstart.owl mousedown.owl",
                    "touchmove.owl mousemove.owl",
                    "touchend.owl touchcancel.owl mouseup.owl"
                ];
        ***REMOVED*** else if (base.options.mouseDrag === false && base.options.touchDrag === true) ***REMOVED***
                types = [
                    "touchstart.owl",
                    "touchmove.owl",
                    "touchend.owl touchcancel.owl"
                ];
        ***REMOVED*** else if (base.options.mouseDrag === true && base.options.touchDrag === false) ***REMOVED***
                types = [
                    "mousedown.owl",
                    "mousemove.owl",
                    "mouseup.owl"
                ];
        ***REMOVED***

            base.ev_types.start = types[0];
            base.ev_types.move = types[1];
            base.ev_types.end = types[2];
    ***REMOVED***,

        disabledEvents :  function () ***REMOVED***
            var base = this;
            base.$elem.on("dragstart.owl", function (event) ***REMOVED*** event.preventDefault(); });
            base.$elem.on("mousedown.disableTextSelect", function (e) ***REMOVED***
                return $(e.target).is('input, textarea, select, option');
        ***REMOVED***);
    ***REMOVED***,

        gestures : function () ***REMOVED***
            /*jslint unparam: true*/
            var base = this,
                locals = ***REMOVED***
                    offsetX : 0,
                    offsetY : 0,
                    baseElWidth : 0,
                    relativePos : 0,
                    position: null,
                    minSwipe : null,
                    maxSwipe: null,
                    sliding : null,
                    dargging: null,
                    targetElement : null
            ***REMOVED***;

            base.isCssFinish = true;

            function getTouches(event) ***REMOVED***
                if (event.touches !== undefined) ***REMOVED***
                    return ***REMOVED***
                        x : event.touches[0].pageX,
                        y : event.touches[0].pageY
                ***REMOVED***;
            ***REMOVED***

                if (event.touches === undefined) ***REMOVED***
                    if (event.pageX !== undefined) ***REMOVED***
                        return ***REMOVED***
                            x : event.pageX,
                            y : event.pageY
                    ***REMOVED***;
                ***REMOVED***
                    if (event.pageX === undefined) ***REMOVED***
                        return ***REMOVED***
                            x : event.clientX,
                            y : event.clientY
                    ***REMOVED***;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

            function swapEvents(type) ***REMOVED***
                if (type === "on") ***REMOVED***
                    $(document).on(base.ev_types.move, dragMove);
                    $(document).on(base.ev_types.end, dragEnd);
            ***REMOVED*** else if (type === "off") ***REMOVED***
                    $(document).off(base.ev_types.move);
                    $(document).off(base.ev_types.end);
            ***REMOVED***
        ***REMOVED***

            function dragStart(event) ***REMOVED***
                var ev = event.originalEvent || event || window.event,
                    position;

                if (ev.which === 3) ***REMOVED***
                    return false;
            ***REMOVED***
                if (base.itemsAmount <= base.options.items) ***REMOVED***
                    return;
            ***REMOVED***
                if (base.isCssFinish === false && !base.options.dragBeforeAnimFinish) ***REMOVED***
                    return false;
            ***REMOVED***
                if (base.isCss3Finish === false && !base.options.dragBeforeAnimFinish) ***REMOVED***
                    return false;
            ***REMOVED***

                if (base.options.autoPlay !== false) ***REMOVED***
                    window.clearInterval(base.autoPlayInterval);
            ***REMOVED***

                if (base.browser.isTouch !== true && !base.$owlWrapper.hasClass("grabbing")) ***REMOVED***
                    base.$owlWrapper.addClass("grabbing");
            ***REMOVED***

                base.newPosX = 0;
                base.newRelativeX = 0;

                $(this).css(base.removeTransition());

                position = $(this).position();
                locals.relativePos = position.left;

                locals.offsetX = getTouches(ev).x - position.left;
                locals.offsetY = getTouches(ev).y - position.top;

                swapEvents("on");

                locals.sliding = false;
                locals.targetElement = ev.target || ev.srcElement;
        ***REMOVED***

            function dragMove(event) ***REMOVED***
                var ev = event.originalEvent || event || window.event,
                    minSwipe,
                    maxSwipe;

                base.newPosX = getTouches(ev).x - locals.offsetX;
                base.newPosY = getTouches(ev).y - locals.offsetY;
                base.newRelativeX = base.newPosX - locals.relativePos;

                if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) ***REMOVED***
                    locals.dragging = true;
                    base.options.startDragging.apply(base, [base.$elem]);
            ***REMOVED***

                if ((base.newRelativeX > 8 || base.newRelativeX < -8) && (base.browser.isTouch === true)) ***REMOVED***
                    if (ev.preventDefault !== undefined) ***REMOVED***
                        ev.preventDefault();
                ***REMOVED*** else ***REMOVED***
                        ev.returnValue = false;
                ***REMOVED***
                    locals.sliding = true;
            ***REMOVED***

                if ((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false) ***REMOVED***
                    $(document).off("touchmove.owl");
            ***REMOVED***

                minSwipe = function () ***REMOVED***
                    return base.newRelativeX / 5;
            ***REMOVED***;

                maxSwipe = function () ***REMOVED***
                    return base.maximumPixels + base.newRelativeX / 5;
            ***REMOVED***;

                base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());
                if (base.browser.support3d === true) ***REMOVED***
                    base.transition3d(base.newPosX);
            ***REMOVED*** else ***REMOVED***
                    base.css2move(base.newPosX);
            ***REMOVED***
        ***REMOVED***

            function dragEnd(event) ***REMOVED***
                var ev = event.originalEvent || event || window.event,
                    newPosition,
                    handlers,
                    owlStopEvent;

                ev.target = ev.target || ev.srcElement;

                locals.dragging = false;

                if (base.browser.isTouch !== true) ***REMOVED***
                    base.$owlWrapper.removeClass("grabbing");
            ***REMOVED***

                if (base.newRelativeX < 0) ***REMOVED***
                    base.dragDirection = base.owl.dragDirection = "left";
            ***REMOVED*** else ***REMOVED***
                    base.dragDirection = base.owl.dragDirection = "right";
            ***REMOVED***

                if (base.newRelativeX !== 0) ***REMOVED***
                    newPosition = base.getNewPosition();
                    base.goTo(newPosition, false, "drag");
                    if (locals.targetElement === ev.target && base.browser.isTouch !== true) ***REMOVED***
                        $(ev.target).on("click.disable", function (ev) ***REMOVED***
                            ev.stopImmediatePropagation();
                            ev.stopPropagation();
                            ev.preventDefault();
                            $(ev.target).off("click.disable");
                    ***REMOVED***);
                        handlers = $._data(ev.target, "events").click;
                        owlStopEvent = handlers.pop();
                        handlers.splice(0, 0, owlStopEvent);
                ***REMOVED***
            ***REMOVED***
                swapEvents("off");
        ***REMOVED***
            base.$elem.on(base.ev_types.start, ".owl-wrapper", dragStart);
    ***REMOVED***,

        getNewPosition : function () ***REMOVED***
            var base = this,
                newPosition = base.closestItem();

            if (newPosition > base.maximumItem) ***REMOVED***
                base.currentItem = base.maximumItem;
                newPosition  = base.maximumItem;
        ***REMOVED*** else if (base.newPosX >= 0) ***REMOVED***
                newPosition = 0;
                base.currentItem = 0;
        ***REMOVED***
            return newPosition;
    ***REMOVED***,
        closestItem : function () ***REMOVED***
            var base = this,
                array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray,
                goal = base.newPosX,
                closest = null;

            $.each(array, function (i, v) ***REMOVED***
                if (goal - (base.itemWidth / 20) > array[i + 1] && goal - (base.itemWidth / 20) < v && base.moveDirection() === "left") ***REMOVED***
                    closest = v;
                    if (base.options.scrollPerPage === true) ***REMOVED***
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                ***REMOVED*** else ***REMOVED***
                        base.currentItem = i;
                ***REMOVED***
            ***REMOVED*** else if (goal + (base.itemWidth / 20) < v && goal + (base.itemWidth / 20) > (array[i + 1] || array[i] - base.itemWidth) && base.moveDirection() === "right") ***REMOVED***
                    if (base.options.scrollPerPage === true) ***REMOVED***
                        closest = array[i + 1] || array[array.length - 1];
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                ***REMOVED*** else ***REMOVED***
                        closest = array[i + 1];
                        base.currentItem = i + 1;
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***);
            return base.currentItem;
    ***REMOVED***,

        moveDirection : function () ***REMOVED***
            var base = this,
                direction;
            if (base.newRelativeX < 0) ***REMOVED***
                direction = "right";
                base.playDirection = "next";
        ***REMOVED*** else ***REMOVED***
                direction = "left";
                base.playDirection = "prev";
        ***REMOVED***
            return direction;
    ***REMOVED***,

        customEvents : function () ***REMOVED***
            /*jslint unparam: true*/
            var base = this;
            base.$elem.on("owl.next", function () ***REMOVED***
                base.next();
        ***REMOVED***);
            base.$elem.on("owl.prev", function () ***REMOVED***
                base.prev();
        ***REMOVED***);
            base.$elem.on("owl.play", function (event, speed) ***REMOVED***
                base.options.autoPlay = speed;
                base.play();
                base.hoverStatus = "play";
        ***REMOVED***);
            base.$elem.on("owl.stop", function () ***REMOVED***
                base.stop();
                base.hoverStatus = "stop";
        ***REMOVED***);
            base.$elem.on("owl.goTo", function (event, item) ***REMOVED***
                base.goTo(item);
        ***REMOVED***);
            base.$elem.on("owl.jumpTo", function (event, item) ***REMOVED***
                base.jumpTo(item);
        ***REMOVED***);
    ***REMOVED***,

        stopOnHover : function () ***REMOVED***
            var base = this;
            if (base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false) ***REMOVED***
                base.$elem.on("mouseover", function () ***REMOVED***
                    base.stop();
            ***REMOVED***);
                base.$elem.on("mouseout", function () ***REMOVED***
                    if (base.hoverStatus !== "stop") ***REMOVED***
                        base.play();
                ***REMOVED***
            ***REMOVED***);
        ***REMOVED***
    ***REMOVED***,

        lazyLoad : function () ***REMOVED***
            var base = this,
                i,
                $item,
                itemNumber,
                $lazyImg,
                follow;

            if (base.options.lazyLoad === false) ***REMOVED***
                return false;
        ***REMOVED***
            for (i = 0; i < base.itemsAmount; i += 1) ***REMOVED***
                $item = $(base.$owlItems[i]);

                if ($item.data("owl-loaded") === "loaded") ***REMOVED***
                    continue;
            ***REMOVED***

                itemNumber = $item.data("owl-item");
                $lazyImg = $item.find(".lazyOwl");

                if (typeof $lazyImg.data("src") !== "string") ***REMOVED***
                    $item.data("owl-loaded", "loaded");
                    continue;
            ***REMOVED***
                if ($item.data("owl-loaded") === undefined) ***REMOVED***
                    $lazyImg.hide();
                    $item.addClass("loading").data("owl-loaded", "checked");
            ***REMOVED***
                if (base.options.lazyFollow === true) ***REMOVED***
                    follow = itemNumber >= base.currentItem;
            ***REMOVED*** else ***REMOVED***
                    follow = true;
            ***REMOVED***
                if (follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length) ***REMOVED***
                    base.lazyPreload($item, $lazyImg);
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***,

        lazyPreload : function ($item, $lazyImg) ***REMOVED***
            var base = this,
                iterations = 0,
                isBackgroundImg;

            if ($lazyImg.prop("tagName") === "DIV") ***REMOVED***
                $lazyImg.css("background-image", "url(" + $lazyImg.data("src") + ")");
                isBackgroundImg = true;
        ***REMOVED*** else ***REMOVED***
                $lazyImg[0].src = $lazyImg.data("src");
        ***REMOVED***

            function showImage() ***REMOVED***
                $item.data("owl-loaded", "loaded").removeClass("loading");
                $lazyImg.removeAttr("data-src");
                if (base.options.lazyEffect === "fade") ***REMOVED***
                    $lazyImg.fadeIn(400);
            ***REMOVED*** else ***REMOVED***
                    $lazyImg.show();
            ***REMOVED***
                if (typeof base.options.afterLazyLoad === "function") ***REMOVED***
                    base.options.afterLazyLoad.apply(this, [base.$elem]);
            ***REMOVED***
        ***REMOVED***

            function checkLazyImage() ***REMOVED***
                iterations += 1;
                if (base.completeImg($lazyImg.get(0)) || isBackgroundImg === true) ***REMOVED***
                    showImage();
            ***REMOVED*** else if (iterations <= 100) ***REMOVED***//if image loads in less than 10 seconds 
                    window.setTimeout(checkLazyImage, 100);
            ***REMOVED*** else ***REMOVED***
                    showImage();
            ***REMOVED***
        ***REMOVED***

            checkLazyImage();
    ***REMOVED***,

        autoHeight : function () ***REMOVED***
            var base = this,
                $currentimg = $(base.$owlItems[base.currentItem]).find("img"),
                iterations;

            function addHeight() ***REMOVED***
                var $currentItem = $(base.$owlItems[base.currentItem]).height();
                base.wrapperOuter.css("height", $currentItem + "px");
                if (!base.wrapperOuter.hasClass("autoHeight")) ***REMOVED***
                    window.setTimeout(function () ***REMOVED***
                        base.wrapperOuter.addClass("autoHeight");
                ***REMOVED***, 0);
            ***REMOVED***
        ***REMOVED***

            function checkImage() ***REMOVED***
                iterations += 1;
                if (base.completeImg($currentimg.get(0))) ***REMOVED***
                    addHeight();
            ***REMOVED*** else if (iterations <= 100) ***REMOVED*** //if image loads in less than 10 seconds 
                    window.setTimeout(checkImage, 100);
            ***REMOVED*** else ***REMOVED***
                    base.wrapperOuter.css("height", ""); //Else remove height attribute
            ***REMOVED***
        ***REMOVED***

            if ($currentimg.get(0) !== undefined) ***REMOVED***
                iterations = 0;
                checkImage();
        ***REMOVED*** else ***REMOVED***
                addHeight();
        ***REMOVED***
    ***REMOVED***,

        completeImg : function (img) ***REMOVED***
            var naturalWidthType;

            if (!img.complete) ***REMOVED***
                return false;
        ***REMOVED***
            naturalWidthType = typeof img.naturalWidth;
            if (naturalWidthType !== "undefined" && img.naturalWidth === 0) ***REMOVED***
                return false;
        ***REMOVED***
            return true;
    ***REMOVED***,

        onVisibleItems : function () ***REMOVED***
            var base = this,
                i;

            if (base.options.addClassActive === true) ***REMOVED***
                base.$owlItems.removeClass("active");
        ***REMOVED***
            base.visibleItems = [];
            for (i = base.currentItem; i < base.currentItem + base.options.items; i += 1) ***REMOVED***
                base.visibleItems.push(i);

                if (base.options.addClassActive === true) ***REMOVED***
                    $(base.$owlItems[i]).addClass("active");
            ***REMOVED***
        ***REMOVED***
            base.owl.visibleItems = base.visibleItems;
    ***REMOVED***,

        transitionTypes : function (className) ***REMOVED***
            var base = this;
            //Currently available: "fade", "backSlide", "goDown", "fadeUp"
            base.outClass = "owl-" + className + "-out";
            base.inClass = "owl-" + className + "-in";
    ***REMOVED***,

        singleItemTransition : function () ***REMOVED***
            var base = this,
                outClass = base.outClass,
                inClass = base.inClass,
                $currentItem = base.$owlItems.eq(base.currentItem),
                $prevItem = base.$owlItems.eq(base.prevItem),
                prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem],
                origin = Math.abs(base.positionsInArray[base.currentItem]) + base.itemWidth / 2,
                animEnd = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';

            base.isTransition = true;

            base.$owlWrapper
                .addClass('owl-origin')
                .css(***REMOVED***
                    "-webkit-transform-origin" : origin + "px",
                    "-moz-perspective-origin" : origin + "px",
                    "perspective-origin" : origin + "px"
            ***REMOVED***);
            function transStyles(prevPos) ***REMOVED***
                return ***REMOVED***
                    "position" : "relative",
                    "left" : prevPos + "px"
            ***REMOVED***;
        ***REMOVED***

            $prevItem
                .css(transStyles(prevPos, 10))
                .addClass(outClass)
                .on(animEnd, function () ***REMOVED***
                    base.endPrev = true;
                    $prevItem.off(animEnd);
                    base.clearTransStyle($prevItem, outClass);
            ***REMOVED***);

            $currentItem
                .addClass(inClass)
                .on(animEnd, function () ***REMOVED***
                    base.endCurrent = true;
                    $currentItem.off(animEnd);
                    base.clearTransStyle($currentItem, inClass);
            ***REMOVED***);
    ***REMOVED***,

        clearTransStyle : function (item, classToRemove) ***REMOVED***
            var base = this;
            item.css(***REMOVED***
                "position" : "",
                "left" : ""
        ***REMOVED***).removeClass(classToRemove);

            if (base.endPrev && base.endCurrent) ***REMOVED***
                base.$owlWrapper.removeClass('owl-origin');
                base.endPrev = false;
                base.endCurrent = false;
                base.isTransition = false;
        ***REMOVED***
    ***REMOVED***,

        owlStatus : function () ***REMOVED***
            var base = this;
            base.owl = ***REMOVED***
                "userOptions"   : base.userOptions,
                "baseElement"   : base.$elem,
                "userItems"     : base.$userItems,
                "owlItems"      : base.$owlItems,
                "currentItem"   : base.currentItem,
                "prevItem"      : base.prevItem,
                "visibleItems"  : base.visibleItems,
                "isTouch"       : base.browser.isTouch,
                "browser"       : base.browser,
                "dragDirection" : base.dragDirection
        ***REMOVED***;
    ***REMOVED***,

        clearEvents : function () ***REMOVED***
            var base = this;
            base.$elem.off(".owl owl mousedown.disableTextSelect");
            $(document).off(".owl owl");
            $(window).off("resize", base.resizer);
    ***REMOVED***,

        unWrap : function () ***REMOVED***
            var base = this;
            if (base.$elem.children().length !== 0) ***REMOVED***
                base.$owlWrapper.unwrap();
                base.$userItems.unwrap().unwrap();
                if (base.owlControls) ***REMOVED***
                    base.owlControls.remove();
            ***REMOVED***
        ***REMOVED***
            base.clearEvents();
            base.$elem
                .attr("style", base.$elem.data("owl-originalStyles") || "")
                .attr("class", base.$elem.data("owl-originalClasses"));
    ***REMOVED***,

        destroy : function () ***REMOVED***
            var base = this;
            base.stop();
            window.clearInterval(base.checkVisible);
            base.unWrap();
            base.$elem.removeData();
    ***REMOVED***,

        reinit : function (newOptions) ***REMOVED***
            var base = this,
                options = $.extend(***REMOVED***}, base.userOptions, newOptions);
            base.unWrap();
            base.init(options, base.$elem);
    ***REMOVED***,

        addItem : function (htmlString, targetPosition) ***REMOVED***
            var base = this,
                position;

            if (!htmlString) ***REMOVED***return false; }

            if (base.$elem.children().length === 0) ***REMOVED***
                base.$elem.append(htmlString);
                base.setVars();
                return false;
        ***REMOVED***
            base.unWrap();
            if (targetPosition === undefined || targetPosition === -1) ***REMOVED***
                position = -1;
        ***REMOVED*** else ***REMOVED***
                position = targetPosition;
        ***REMOVED***
            if (position >= base.$userItems.length || position === -1) ***REMOVED***
                base.$userItems.eq(-1).after(htmlString);
        ***REMOVED*** else ***REMOVED***
                base.$userItems.eq(position).before(htmlString);
        ***REMOVED***

            base.setVars();
    ***REMOVED***,

        removeItem : function (targetPosition) ***REMOVED***
            var base = this,
                position;

            if (base.$elem.children().length === 0) ***REMOVED***
                return false;
        ***REMOVED***
            if (targetPosition === undefined || targetPosition === -1) ***REMOVED***
                position = -1;
        ***REMOVED*** else ***REMOVED***
                position = targetPosition;
        ***REMOVED***

            base.unWrap();
            base.$userItems.eq(position).remove();
            base.setVars();
    ***REMOVED***

***REMOVED***;

    $.fn.owlCarousel = function (options) ***REMOVED***
        return this.each(function () ***REMOVED***
            if ($(this).data("owl-init") === true) ***REMOVED***
                return false;
        ***REMOVED***
            $(this).data("owl-init", true);
            var carousel = Object.create(Carousel);
            carousel.init(options, this);
            $.data(this, "owlCarousel", carousel);
    ***REMOVED***);
***REMOVED***;

    $.fn.owlCarousel.options = ***REMOVED***

        items : 5,
        itemsCustom : false,
        itemsDesktop : [1199, 4],
        itemsDesktopSmall : [979, 3],
        itemsTablet : [768, 2],
        itemsTabletSmall : false,
        itemsMobile : [479, 1],
        singleItem : false,
        itemsScaleUp : false,

        slideSpeed : 200,
        paginationSpeed : 800,
        rewindSpeed : 1000,

        autoPlay : false,
        stopOnHover : false,

        navigation : false,
        navigationText : ["prev", "next"],
        rewindNav : true,
        scrollPerPage : false,

        pagination : true,
        paginationNumbers : false,

        responsive : true,
        responsiveRefreshRate : 200,
        responsiveBaseWidth : window,

        baseClass : "owl-carousel",
        theme : "owl-theme",

        lazyLoad : false,
        lazyFollow : true,
        lazyEffect : "fade",

        autoHeight : false,

        jsonPath : false,
        jsonSuccess : false,

        dragBeforeAnimFinish : true,
        mouseDrag : true,
        touchDrag : true,

        addClassActive : false,
        transitionStyle : false,

        beforeUpdate : false,
        afterUpdate : false,
        beforeInit : false,
        afterInit : false,
        beforeMove : false,
        afterMove : false,
        afterAction : false,
        startDragging : false,
        afterLazyLoad: false
***REMOVED***;
}(jQuery, window, document));