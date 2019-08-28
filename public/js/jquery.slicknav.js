/*!
 * SlickNav Responsive Mobile Menu v1.0.4
 * (c) 2015 Josh Cope
 * licensed under MIT
 */
;(function ($, document, window) ***REMOVED***
    var
    // default settings object.
        defaults = ***REMOVED***
            label: 'MENU',
            duplicate: true,
            duration: 200,
            easingOpen: 'swing',
            easingClose: 'swing',
            closedSymbol: '&#9658;',
            openedSymbol: '&#9660;',
            prependTo: 'body',
            parentTag: 'a',
            closeOnClick: false,
            allowParentLinks: false,
            nestedParentLinks: true,
            showChildren: false,
            removeIds: false,
            removeClasses: false,
			brand: '',
            init: function () ***REMOVED***},
            beforeOpen: function () ***REMOVED***},
            beforeClose: function () ***REMOVED***},
            afterOpen: function () ***REMOVED***},
            afterClose: function () ***REMOVED***}
    ***REMOVED***,
        mobileMenu = 'slicknav',
        prefix = 'slicknav';

    function Plugin(element, options) ***REMOVED***
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend(***REMOVED***}, defaults, options);

        this._defaults = defaults;
        this._name = mobileMenu;

        this.init();
***REMOVED***

    Plugin.prototype.init = function () ***REMOVED***
        var $this = this,
            menu = $(this.element),
            settings = this.settings,
            iconClass,
            menuBar;

        // clone menu if needed
        if (settings.duplicate) ***REMOVED***
            $this.mobileNav = menu.clone();
            //remove ids from clone to prevent css issues
            $this.mobileNav.removeAttr('id');
            $this.mobileNav.find('*').each(function (i, e) ***REMOVED***
                $(e).removeAttr('id');
        ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
            $this.mobileNav = menu;

            // remove ids if set
            $this.mobileNav.removeAttr('id');
            $this.mobileNav.find('*').each(function (i, e) ***REMOVED***
                $(e).removeAttr('id');
        ***REMOVED***);
    ***REMOVED***

        // remove classes if set
        if (settings.removeClasses) ***REMOVED***
            $this.mobileNav.removeAttr('class');
            $this.mobileNav.find('*').each(function (i, e) ***REMOVED***
                $(e).removeAttr('class');
        ***REMOVED***);
    ***REMOVED***

        // styling class for the button
        iconClass = prefix + '_icon';

        if (settings.label === '') ***REMOVED***
            iconClass += ' ' + prefix + '_no-text';
    ***REMOVED***

        if (settings.parentTag == 'a') ***REMOVED***
            settings.parentTag = 'a href="#"';
    ***REMOVED***

        // create menu bar
        $this.mobileNav.attr('class', prefix + '_nav');
        menuBar = $('<div class="' + prefix + '_menu"></div>');
		if (settings.brand !== '') ***REMOVED***
			var brand = $('<div class="' + prefix + '_brand">'+settings.brand+'</div>');
			$(menuBar).append(brand);
		}
        $this.btn = $(
            ['<' + settings.parentTag + ' aria-haspopup="true" tabindex="0" class="' + prefix + '_btn ' + prefix + '_collapsed">',
                '<span class="' + prefix + '_menutxt">' + settings.label + '</span>',
                '<span class="' + iconClass + '">',
                    '<span class="' + prefix + '_icon-bar"></span>',
                    '<span class="' + prefix + '_icon-bar"></span>',
                    '<span class="' + prefix + '_icon-bar"></span>',
                '</span>',
            '</' + settings.parentTag + '>'
            ].join('')
        );
        $(menuBar).append($this.btn);
        $(settings.prependTo).prepend(menuBar);
        menuBar.append($this.mobileNav);

        // iterate over structure adding additional structure
        var items = $this.mobileNav.find('li');
        $(items).each(function () ***REMOVED***
            var item = $(this),
                data = ***REMOVED***};
            data.children = item.children('ul').attr('role', 'menu');
            item.data('menu', data);

            // if a list item has a nested menu
            if (data.children.length > 0) ***REMOVED***

                // select all text before the child menu
                // check for anchors

                var a = item.contents(),
                    containsAnchor = false,
                    nodes = [];

                $(a).each(function () ***REMOVED***
                    if (!$(this).is('ul')) ***REMOVED***
                        nodes.push(this);
                ***REMOVED*** else ***REMOVED***
                        return false;
                ***REMOVED***

                    if($(this).is("a")) ***REMOVED***
                        containsAnchor = true;
                ***REMOVED***
            ***REMOVED***);

                var wrapElement = $(
                    '<' + settings.parentTag + ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' + prefix + '_item"/>'
                );

                // wrap item text with tag and add classes unless we are separating parent links
                if ((!settings.allowParentLinks || settings.nestedParentLinks) || !containsAnchor) ***REMOVED***
                    var $wrap = $(nodes).wrapAll(wrapElement).parent();
                    $wrap.addClass(prefix+'_row');
            ***REMOVED*** else
                    $(nodes).wrapAll('<span class="'+prefix+'_parent-link '+prefix+'_row"/>').parent();

                if (!settings.showChildren) ***REMOVED***
                    item.addClass(prefix+'_collapsed');
            ***REMOVED*** else ***REMOVED***
                    item.addClass(prefix+'_open');
            ***REMOVED***

                item.addClass(prefix+'_parent');

                // create parent arrow. wrap with link if parent links and separating
                var arrowElement = $('<span class="'+prefix+'_arrow">'+(settings.showChildren?settings.openedSymbol:settings.closedSymbol)+'</span>');

                if (settings.allowParentLinks && !settings.nestedParentLinks && containsAnchor)
                    arrowElement = arrowElement.wrap(wrapElement).parent();

                //append arrow
                $(nodes).last().after(arrowElement);


        ***REMOVED*** else if ( item.children().length === 0) ***REMOVED***
                 item.addClass(prefix+'_txtnode');
        ***REMOVED***

            // accessibility for links
            item.children('a').attr('role', 'menuitem').click(function(event)***REMOVED***
                //Ensure that it's not a parent
                if (settings.closeOnClick && !$(event.target).parent().closest('li').hasClass(prefix+'_parent')) ***REMOVED***
                        //Emulate menu close if set
                        $($this.btn).click();
                ***REMOVED***
        ***REMOVED***);

            //also close on click if parent links are set
            if (settings.closeOnClick && settings.allowParentLinks) ***REMOVED***
                item.children('a').children('a').click(function (event) ***REMOVED***
                    //Emulate menu close
                    $($this.btn).click();
            ***REMOVED***);

                item.find('.'+prefix+'_parent-link a:not(.'+prefix+'_item)').click(function(event)***REMOVED***
                    //Emulate menu close
                        $($this.btn).click();
            ***REMOVED***);
        ***REMOVED***
    ***REMOVED***);

        // structure is in place, now hide appropriate items
        $(items).each(function () ***REMOVED***
            var data = $(this).data('menu');
            if (!settings.showChildren)***REMOVED***
                $this._visibilityToggle(data.children, null, false, null, true);
        ***REMOVED***
    ***REMOVED***);

        // finally toggle entire menu
        $this._visibilityToggle($this.mobileNav, null, false, 'init', true);

        // accessibility for menu button
        $this.mobileNav.attr('role','menu');

        // outline prevention when using mouse
        $(document).mousedown(function()***REMOVED***
            $this._outlines(false);
    ***REMOVED***);

        $(document).keyup(function()***REMOVED***
            $this._outlines(true);
    ***REMOVED***);

        // menu button click
        $($this.btn).click(function (e) ***REMOVED***
            e.preventDefault();
            $this._menuToggle();
    ***REMOVED***);

        // click on menu parent
        $this.mobileNav.on('click', '.' + prefix + '_item', function (e) ***REMOVED***
            e.preventDefault();
            $this._itemClick($(this));
    ***REMOVED***);

        // check for enter key on menu button and menu parents
        $($this.btn).keydown(function (e) ***REMOVED***
            var ev = e || event;
            if(ev.keyCode == 13) ***REMOVED***
                e.preventDefault();
                $this._menuToggle();
        ***REMOVED***
    ***REMOVED***);

        $this.mobileNav.on('keydown', '.'+prefix+'_item', function(e) ***REMOVED***
            var ev = e || event;
            if(ev.keyCode == 13) ***REMOVED***
                e.preventDefault();
                $this._itemClick($(e.target));
        ***REMOVED***
    ***REMOVED***);

        // allow links clickable within parent tags if set
        if (settings.allowParentLinks && settings.nestedParentLinks) ***REMOVED***
            $('.'+prefix+'_item a').click(function(e)***REMOVED***
                    e.stopImmediatePropagation();
        ***REMOVED***);
    ***REMOVED***
***REMOVED***;

    //toggle menu
    Plugin.prototype._menuToggle = function (el) ***REMOVED***
        var $this = this;
        var btn = $this.btn;
        var mobileNav = $this.mobileNav;

        if (btn.hasClass(prefix+'_collapsed')) ***REMOVED***
            btn.removeClass(prefix+'_collapsed');
            btn.addClass(prefix+'_open');
    ***REMOVED*** else ***REMOVED***
            btn.removeClass(prefix+'_open');
            btn.addClass(prefix+'_collapsed');
    ***REMOVED***
        btn.addClass(prefix+'_animating');
        $this._visibilityToggle(mobileNav, btn.parent(), true, btn);
***REMOVED***;

    // toggle clicked items
    Plugin.prototype._itemClick = function (el) ***REMOVED***
        var $this = this;
        var settings = $this.settings;
        var data = el.data('menu');
        if (!data) ***REMOVED***
            data = ***REMOVED***};
            data.arrow = el.children('.'+prefix+'_arrow');
            data.ul = el.next('ul');
            data.parent = el.parent();
            //Separated parent link structure
            if (data.parent.hasClass(prefix+'_parent-link')) ***REMOVED***
                data.parent = el.parent().parent();
                data.ul = el.parent().next('ul');
        ***REMOVED***
            el.data('menu', data);
    ***REMOVED***
        if (data.parent.hasClass(prefix+'_collapsed')) ***REMOVED***
            data.arrow.html(settings.openedSymbol);
            data.parent.removeClass(prefix+'_collapsed');
            data.parent.addClass(prefix+'_open');
            data.parent.addClass(prefix+'_animating');
            $this._visibilityToggle(data.ul, data.parent, true, el);
    ***REMOVED*** else ***REMOVED***
            data.arrow.html(settings.closedSymbol);
            data.parent.addClass(prefix+'_collapsed');
            data.parent.removeClass(prefix+'_open');
            data.parent.addClass(prefix+'_animating');
            $this._visibilityToggle(data.ul, data.parent, true, el);
    ***REMOVED***
***REMOVED***;

    // toggle actual visibility and accessibility tags
    Plugin.prototype._visibilityToggle = function(el, parent, animate, trigger, init) ***REMOVED***
        var $this = this;
        var settings = $this.settings;
        var items = $this._getActionItems(el);
        var duration = 0;
        if (animate) ***REMOVED***
            duration = settings.duration;
    ***REMOVED***

        if (el.hasClass(prefix+'_hidden')) ***REMOVED***
            el.removeClass(prefix+'_hidden');
             //Fire beforeOpen callback
                if (!init) ***REMOVED***
                    settings.beforeOpen(trigger);
            ***REMOVED***
            el.slideDown(duration, settings.easingOpen, function()***REMOVED***

                $(trigger).removeClass(prefix+'_animating');
                $(parent).removeClass(prefix+'_animating');

                //Fire afterOpen callback
                if (!init) ***REMOVED***
                    settings.afterOpen(trigger);
            ***REMOVED***
        ***REMOVED***);
            el.attr('aria-hidden','false');
            items.attr('tabindex', '0');
            $this._setVisAttr(el, false);
    ***REMOVED*** else ***REMOVED***
            el.addClass(prefix+'_hidden');

            //Fire init or beforeClose callback
            if (!init)***REMOVED***
                settings.beforeClose(trigger);
        ***REMOVED***

            el.slideUp(duration, this.settings.easingClose, function() ***REMOVED***
                el.attr('aria-hidden','true');
                items.attr('tabindex', '-1');
                $this._setVisAttr(el, true);
                el.hide(); //jQuery 1.7 bug fix

                $(trigger).removeClass(prefix+'_animating');
                $(parent).removeClass(prefix+'_animating');

                //Fire init or afterClose callback
                if (!init)***REMOVED***
                    settings.afterClose(trigger);
            ***REMOVED*** else if (trigger == 'init')***REMOVED***
                    settings.init();
            ***REMOVED***
        ***REMOVED***);
    ***REMOVED***
***REMOVED***;

    // set attributes of element and children based on visibility
    Plugin.prototype._setVisAttr = function(el, hidden) ***REMOVED***
        var $this = this;

        // select all parents that aren't hidden
        var nonHidden = el.children('li').children('ul').not('.'+prefix+'_hidden');

        // iterate over all items setting appropriate tags
        if (!hidden) ***REMOVED***
            nonHidden.each(function()***REMOVED***
                var ul = $(this);
                ul.attr('aria-hidden','false');
                var items = $this._getActionItems(ul);
                items.attr('tabindex', '0');
                $this._setVisAttr(ul, hidden);
        ***REMOVED***);
    ***REMOVED*** else ***REMOVED***
            nonHidden.each(function()***REMOVED***
                var ul = $(this);
                ul.attr('aria-hidden','true');
                var items = $this._getActionItems(ul);
                items.attr('tabindex', '-1');
                $this._setVisAttr(ul, hidden);
        ***REMOVED***);
    ***REMOVED***
***REMOVED***;

    // get all 1st level items that are clickable
    Plugin.prototype._getActionItems = function(el) ***REMOVED***
        var data = el.data("menu");
        if (!data) ***REMOVED***
            data = ***REMOVED***};
            var items = el.children('li');
            var anchors = items.find('a');
            data.links = anchors.add(items.find('.'+prefix+'_item'));
            el.data('menu', data);
    ***REMOVED***
        return data.links;
***REMOVED***;

    Plugin.prototype._outlines = function(state) ***REMOVED***
        if (!state) ***REMOVED***
            $('.'+prefix+'_item, .'+prefix+'_btn').css('outline','none');
    ***REMOVED*** else ***REMOVED***
            $('.'+prefix+'_item, .'+prefix+'_btn').css('outline','');
    ***REMOVED***
***REMOVED***;

    Plugin.prototype.toggle = function()***REMOVED***
        var $this = this;
        $this._menuToggle();
***REMOVED***;

    Plugin.prototype.open = function()***REMOVED***
        var $this = this;
        if ($this.btn.hasClass(prefix+'_collapsed')) ***REMOVED***
            $this._menuToggle();
    ***REMOVED***
***REMOVED***;

    Plugin.prototype.close = function()***REMOVED***
        var $this = this;
        if ($this.btn.hasClass(prefix+'_open')) ***REMOVED***
            $this._menuToggle();
    ***REMOVED***
***REMOVED***;

    $.fn[mobileMenu] = function ( options ) ***REMOVED***
        var args = arguments;

        // Is the first parameter an object (options), or was omitted, instantiate a new instance
        if (options === undefined || typeof options === 'object') ***REMOVED***
            return this.each(function () ***REMOVED***

                // Only allow the plugin to be instantiated once due to methods
                if (!$.data(this, 'plugin_' + mobileMenu)) ***REMOVED***

                    // if it has no instance, create a new one, pass options to our plugin constructor,
                    // and store the plugin instance in the elements jQuery data object.
                    $.data(this, 'plugin_' + mobileMenu, new Plugin( this, options ));
            ***REMOVED***
        ***REMOVED***);

        // If is a string and doesn't start with an underscore or 'init' function, treat this as a call to a public method.
    ***REMOVED*** else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') ***REMOVED***

            // Cache the method call to make it possible to return a value
            var returns;

            this.each(function () ***REMOVED***
                var instance = $.data(this, 'plugin_' + mobileMenu);

                // Tests that there's already a plugin-instance and checks that the requested public method exists
                if (instance instanceof Plugin && typeof instance[options] === 'function') ***REMOVED***

                    // Call the method of our plugin instance, and pass it the supplied arguments.
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
            ***REMOVED***
        ***REMOVED***);

            // If the earlier cached method gives a value back return the value, otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
    ***REMOVED***
***REMOVED***;
}(jQuery, document, window));
