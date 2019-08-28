/*
 * Nivo Lightbox v1.3.1
 * http://dev7studios.com/nivo-lightbox
 *
 * Copyright 2013, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

;(function($, window, document, undefined)***REMOVED***

    var pluginName = 'nivoLightbox',
        defaults = ***REMOVED***
            effect: 'fade',
            theme: 'default',
            keyboardNav: true,
            clickImgToClose: false,
            clickOverlayToClose: true,
            onInit: function()***REMOVED***},
            beforeShowLightbox: function()***REMOVED***},
            afterShowLightbox: function(lightbox)***REMOVED***},
            beforeHideLightbox: function()***REMOVED***},
            afterHideLightbox: function()***REMOVED***},
            beforePrev: function(element)***REMOVED***},
            onPrev: function(element)***REMOVED***},
            beforeNext: function(element)***REMOVED***},
            onNext: function(element)***REMOVED***},
            errorMessage: 'The requested content cannot be loaded. Please try again later.'
    ***REMOVED***;

    function NivoLightbox(element, options)***REMOVED***
        this.el = element;
        this.$el = $(this.el);

        this.options = $.extend(***REMOVED***}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
***REMOVED***

    NivoLightbox.prototype = ***REMOVED***

        init: function()***REMOVED***
			var $this = this;

			// Need this so we don't use CSS transitions in mobile
			if(!$('html').hasClass('nivo-lightbox-notouch')) $('html').addClass('nivo-lightbox-notouch');
			if('ontouchstart' in document) $('html').removeClass('nivo-lightbox-notouch');

			// Setup the click
            this.$el.on('click', function(e)***REMOVED***
                $this.showLightbox(e);
        ***REMOVED***);

            // keyboardNav
            if(this.options.keyboardNav)***REMOVED***
                $('body').off('keyup').on('keyup', function(e)***REMOVED***
                    var code = (e.keyCode ? e.keyCode : e.which);
                    // Escape
                    if(code == 27) $this.destructLightbox();
                    // Left
                    if(code == 37) $('.nivo-lightbox-prev').trigger('click');
                    // Right
                    if(code == 39) $('.nivo-lightbox-next').trigger('click');
				});
			}

			this.options.onInit.call(this);

    ***REMOVED***,

        showLightbox: function(e)***REMOVED***
            var $this = this,
                currentLink = this.$el;

			// Check content
			var check = this.checkContent(currentLink);
			if(!check) return;

			e.preventDefault();
            this.options.beforeShowLightbox.call(this);
            var lightbox = this.constructLightbox();
            if(!lightbox) return;
            var content = lightbox.find('.nivo-lightbox-content');
            if(!content) return;

            $('body').addClass('nivo-lightbox-body-effect-'+ this.options.effect);

			this.processContent( content, currentLink );

            // Nav
            if(this.$el.attr('data-lightbox-gallery'))***REMOVED***
                var galleryItems = $('[data-lightbox-gallery="'+ this.$el.attr('data-lightbox-gallery') +'"]');

                $('.nivo-lightbox-nav').show();

				// Prev
                $('.nivo-lightbox-prev').off('click').on('click', function(e)***REMOVED***
                    e.preventDefault();
                    var index = galleryItems.index(currentLink);
                    currentLink = galleryItems.eq(index - 1);
                    if(!$(currentLink).length) currentLink = galleryItems.last();
                    $.when($this.options.beforePrev.call(this, [ currentLink ])).done(function()***REMOVED***
                        $this.processContent(content, currentLink);
                        $this.options.onPrev.call(this, [ currentLink ]);
                ***REMOVED***);
            ***REMOVED***);

                // Next
                $('.nivo-lightbox-next').off('click').on('click', function(e)***REMOVED***
                    e.preventDefault();
                    var index = galleryItems.index(currentLink);
                    currentLink = galleryItems.eq(index + 1);
                    if(!$(currentLink).length) currentLink = galleryItems.first();
                    $.when($this.options.beforeNext.call(this, [ currentLink ])).done(function()***REMOVED***
                        $this.processContent(content, currentLink);
                        $this.options.onNext.call(this, [ currentLink ]);
                ***REMOVED***);
            ***REMOVED***);
        ***REMOVED***

            setTimeout(function()***REMOVED***
                lightbox.addClass('nivo-lightbox-open');
                $this.options.afterShowLightbox.call(this, [ lightbox ]);
        ***REMOVED***, 1); // For CSS transitions
    ***REMOVED***,

		checkContent: function( link ) ***REMOVED***
			var $this = this,
                href = link.attr('href'),
                video = href.match(/(youtube|youtube-nocookie|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);

            if(href.match(/\.(jpeg|jpg|gif|png)$/i) !== null)***REMOVED***
				return true;
			}
			// Video (Youtube/Vimeo)
            else if(video)***REMOVED***
				return true;
			}
			// AJAX
			else if(link.attr('data-lightbox-type') == 'ajax')***REMOVED***
				return true;
			}
			// Inline HTML
			else if(href.substring(0, 1) == '#' && link.attr('data-lightbox-type') == 'inline')***REMOVED***
				return true;
			}
			// iFrame (default)
			else if(link.attr('data-lightbox-type') == 'iframe')***REMOVED***
				return true;
			}

			return false;
		},

        processContent: function(content, link)***REMOVED***
            var $this = this,
                href = link.attr('href'),
                video = href.match(/(youtube|youtube-nocookie|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);

            content.html('').addClass('nivo-lightbox-loading');

            // Is HiDPI?
            if(this.isHidpi() && link.attr('data-lightbox-hidpi'))***REMOVED***
                href = link.attr('data-lightbox-hidpi');
        ***REMOVED***

            // Image
            if(href.match(/\.(jpeg|jpg|gif|png)$/i) !== null)***REMOVED***
                var img = $('<img>', ***REMOVED*** src: href, 'class': 'nivo-lightbox-image-display' });
                img.one('load', function() ***REMOVED***
					var wrap = $('<div class="nivo-lightbox-image" />');
                    wrap.append(img);
					content.html(wrap).removeClass('nivo-lightbox-loading');

					// Vertically center images
					wrap.css(***REMOVED***
						'line-height': $('.nivo-lightbox-content').height() +'px',
						'height': $('.nivo-lightbox-content').height() +'px' // For Firefox
					});
					$(window).resize(function() ***REMOVED***
						wrap.css(***REMOVED***
							'line-height': $('.nivo-lightbox-content').height() +'px',
							'height': $('.nivo-lightbox-content').height() +'px' // For Firefox
						});
					});
				}).each(function() ***REMOVED***
					if(this.complete) $(this).load();
				});

				img.error(function() ***REMOVED***
					var wrap = $('<div class="nivo-lightbox-error"><p>'+ $this.options.errorMessage +'</p></div>');
                    content.html(wrap).removeClass('nivo-lightbox-loading');
				});
        ***REMOVED***
            // Video (Youtube/Vimeo)
            else if(video)***REMOVED***
                var src = '',
                    classTerm = 'nivo-lightbox-video';

                if(video[1] == 'youtube')***REMOVED***
                    src = '//www.youtube.com/embed/'+ video[4];
                    classTerm = 'nivo-lightbox-youtube';
            ***REMOVED***
                if(video[1] == 'youtube-nocookie')***REMOVED***
                    src = href; //https://www.youtube-nocookie.com/embed/...
                    classTerm = 'nivo-lightbox-youtube';
            ***REMOVED***
                if(video[1] == 'youtu')***REMOVED***
                    src = '//www.youtube.com/embed/'+ video[3];
                    classTerm = 'nivo-lightbox-youtube';
            ***REMOVED***
                if(video[1] == 'vimeo')***REMOVED***
                    src = '//player.vimeo.com/video/'+ video[3];
                    classTerm = 'nivo-lightbox-vimeo';
            ***REMOVED***

                if(src)***REMOVED***
                    var iframeVideo = $('<iframe>', ***REMOVED***
                        src: src,
                        'class': classTerm,
                        frameborder: 0,
                        vspace: 0,
                        hspace: 0,
                        scrolling: 'auto'
                ***REMOVED***);
                    content.html(iframeVideo);
                    iframeVideo.load(function()***REMOVED*** content.removeClass('nivo-lightbox-loading'); });
            ***REMOVED***
        ***REMOVED***
            // AJAX
            else if(link.attr('data-lightbox-type') == 'ajax')***REMOVED***
				$.ajax(***REMOVED***
					url: href,
					cache: false,
					success: function(data) ***REMOVED***
						var wrap = $('<div class="nivo-lightbox-ajax" />');
						wrap.append(data);
						content.html(wrap).removeClass('nivo-lightbox-loading');

						// Vertically center html
						if(wrap.outerHeight() < content.height())***REMOVED***
							wrap.css(***REMOVED***
								'position': 'relative',
								'top': '50%',
								'margin-top': -(wrap.outerHeight()/2) +'px'
							});
						}
						$(window).resize(function() ***REMOVED***
							if(wrap.outerHeight() < content.height())***REMOVED***
								wrap.css(***REMOVED***
									'position': 'relative',
									'top': '50%',
									'margin-top': -(wrap.outerHeight()/2) +'px'
								});
							}
						});
					},
					error: function()***REMOVED***
						var wrap = $('<div class="nivo-lightbox-error"><p>'+ $this.options.errorMessage +'</p></div>');
                        content.html(wrap).removeClass('nivo-lightbox-loading');
					}
				});
        ***REMOVED***
            // Inline HTML
            else if(href.substring(0, 1) == '#' && link.attr('data-lightbox-type') == 'inline')***REMOVED***
                if($(href).length)***REMOVED***
                    var wrap = $('<div class="nivo-lightbox-inline" />');
					wrap.append($(href).clone().show());
                    content.html(wrap).removeClass('nivo-lightbox-loading');

                    // Vertically center html
					if(wrap.outerHeight() < content.height())***REMOVED***
						wrap.css(***REMOVED***
							'position': 'relative',
							'top': '50%',
							'margin-top': -(wrap.outerHeight()/2) +'px'
						});
					}
					$(window).resize(function() ***REMOVED***
						if(wrap.outerHeight() < content.height())***REMOVED***
							wrap.css(***REMOVED***
								'position': 'relative',
								'top': '50%',
								'margin-top': -(wrap.outerHeight()/2) +'px'
							});
						}
					});
				} else ***REMOVED***
					var wrapError = $('<div class="nivo-lightbox-error"><p>'+ $this.options.errorMessage +'</p></div>');
                    content.html(wrapError).removeClass('nivo-lightbox-loading');
				}
        ***REMOVED***
            // iFrame (default)
            else if(link.attr('data-lightbox-type') == 'iframe')***REMOVED***
                var iframe = $('<iframe>', ***REMOVED***
                    src: href,
                    'class': 'nivo-lightbox-item',
                    frameborder: 0,
                    vspace: 0,
                    hspace: 0,
                    scrolling: 'auto'
            ***REMOVED***);
                content.html(iframe);
                iframe.load(function()***REMOVED*** content.removeClass('nivo-lightbox-loading'); });
        ***REMOVED*** else ***REMOVED***
				return false;
			}

            // Set the title
            if(link.attr('title'))***REMOVED***
                var titleWrap = $('<span>', ***REMOVED*** 'class': 'nivo-lightbox-title' });
                titleWrap.text(link.attr('title'));
                $('.nivo-lightbox-title-wrap').html(titleWrap);
        ***REMOVED*** else ***REMOVED***
                $('.nivo-lightbox-title-wrap').html('');
        ***REMOVED***
    ***REMOVED***,

        constructLightbox: function()***REMOVED***
            if($('.nivo-lightbox-overlay').length) return $('.nivo-lightbox-overlay');

            var overlay = $('<div>', ***REMOVED*** 'class': 'nivo-lightbox-overlay nivo-lightbox-theme-'+ this.options.theme +' nivo-lightbox-effect-'+ this.options.effect });
            var wrap = $('<div>', ***REMOVED*** 'class': 'nivo-lightbox-wrap' });
            var content = $('<div>', ***REMOVED*** 'class': 'nivo-lightbox-content' });
            var nav = $('<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>');
            var close = $('<a href="#" class="nivo-lightbox-close" title="Close"><i class="icon-close"></i></a>');
            var title = $('<div>', ***REMOVED*** 'class': 'nivo-lightbox-title-wrap' });

            var isMSIE = /*@cc_on!@*/0;
            if(isMSIE) overlay.addClass('nivo-lightbox-ie');

            wrap.append(content);
            wrap.append(title);
            overlay.append(wrap);
            overlay.append(nav);
            overlay.append(close);
            $('body').append(overlay);

            var $this = this;
            if($this.options.clickOverlayToClose)***REMOVED***
                overlay.on('click', function(e)***REMOVED***
                    if(e.target === this || $(e.target).hasClass('nivo-lightbox-content') || $(e.target).hasClass('nivo-lightbox-image'))***REMOVED***
                        $this.destructLightbox();
                ***REMOVED***
            ***REMOVED***);
        ***REMOVED***
            if($this.options.clickImgToClose)***REMOVED***
                overlay.on('click', function(e)***REMOVED***
                    if(e.target === this || $(e.target).hasClass('nivo-lightbox-image-display'))***REMOVED***
                        $this.destructLightbox();
                ***REMOVED***
            ***REMOVED***);
        ***REMOVED***

            close.on('click', function(e)***REMOVED***
                e.preventDefault();
                $this.destructLightbox();
        ***REMOVED***);

            return overlay;
    ***REMOVED***,

        destructLightbox: function()***REMOVED***
            var $this = this;
            this.options.beforeHideLightbox.call(this);

            $('.nivo-lightbox-overlay').removeClass('nivo-lightbox-open');
            $('.nivo-lightbox-nav').hide();
            $('body').removeClass('nivo-lightbox-body-effect-'+ $this.options.effect);

            // For IE
            var isMSIE = /*@cc_on!@*/0;
            if(isMSIE)***REMOVED***
                $('.nivo-lightbox-overlay iframe').attr("src", " ");
                $('.nivo-lightbox-overlay iframe').remove();
        ***REMOVED***

            // Remove click handlers
            $('.nivo-lightbox-prev').off('click');
            $('.nivo-lightbox-next').off('click');

            // Empty content (for videos)
            $('.nivo-lightbox-content').empty();

            this.options.afterHideLightbox.call(this);
    ***REMOVED***,

        isHidpi: function()***REMOVED***
			var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
                              (min--moz-device-pixel-ratio: 1.5),\
                              (-o-min-device-pixel-ratio: 3/2),\
                              (min-resolution: 1.5dppx)";
			if(window.devicePixelRatio > 1) return true;
			if(window.matchMedia && window.matchMedia(mediaQuery).matches) return true;
			return false;
		}

***REMOVED***;

    $.fn[pluginName] = function(options)***REMOVED***
        return this.each(function()***REMOVED***
            if(!$.data(this, pluginName))***REMOVED***
                $.data(this, pluginName, new NivoLightbox(this, options));
        ***REMOVED***
    ***REMOVED***);
***REMOVED***;

})(jQuery, window, document);
