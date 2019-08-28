/**!
 * MixItUp v2.1.11
 *
 * @copyright Copyright 2015 KunkaLabs Limited.
 * @author    KunkaLabs Limited.
 * @link      https://mixitup.kunkalabs.com
 *
 * @license   Commercial use requires a commercial license.
 *            https://mixitup.kunkalabs.com/licenses/
 *
 *            Non-commercial use permitted under terms of CC-BY-NC license.
 *            http://creativecommons.org/licenses/by-nc/3.0/
 */

(function($, undf)***REMOVED***
	'use strict';

	/**
	 * MixItUp Constructor Function
	 * @constructor
	 * @extends jQuery
	 */

	$.MixItUp = function()***REMOVED***
		var self = this;

		self._execAction('_constructor', 0);

		$.extend(self, ***REMOVED***

			/* Public Properties
			---------------------------------------------------------------------- */

			selectors: ***REMOVED***
				target: '.mix',
				filter: '.filter',
				sort: '.sort'
			},

			animation: ***REMOVED***
				enable: true,
				effects: 'fade scale',
				duration: 600,
				easing: 'ease',
				perspectiveDistance: '3000',
				perspectiveOrigin: '50% 50%',
				queue: true,
				queueLimit: 1,
				animateChangeLayout: false,
				animateResizeContainer: true,
				animateResizeTargets: false,
				staggerSequence: false,
				reverseOut: false
			},

			callbacks: ***REMOVED***
				onMixLoad: false,
				onMixStart: false,
				onMixBusy: false,
				onMixEnd: false,
				onMixFail: false,
				_user: false
			},

			controls: ***REMOVED***
				enable: true,
				live: false,
				toggleFilterButtons: false,
				toggleLogic: 'or',
				activeClass: 'active'
			},

			layout: ***REMOVED***
				display: 'inline-block',
				containerClass: '',
				containerClassFail: 'fail'
			},

			load: ***REMOVED***
				filter: 'all',
				sort: false
			},

			/* Private Properties
			---------------------------------------------------------------------- */

			_$body: null,
			_$container: null,
			_$targets: null,
			_$parent: null,
			_$sortButtons: null,
			_$filterButtons: null,

			_suckMode: false,
			_mixing: false,
			_sorting: false,
			_clicking: false,
			_loading: true,
			_changingLayout: false,
			_changingClass: false,
			_changingDisplay: false,

			_origOrder: [],
			_startOrder: [],
			_newOrder: [],
			_activeFilter: null,
			_toggleArray: [],
			_toggleString: '',
			_activeSort: 'default:asc',
			_newSort: null,
			_startHeight: null,
			_newHeight: null,
			_incPadding: true,
			_newDisplay: null,
			_newClass: null,
			_targetsBound: 0,
			_targetsDone: 0,
			_queue: [],

			_$show: $(),
			_$hide: $()
		});

		self._execAction('_constructor', 1);
	};

	/**
	 * MixItUp Prototype
	 * @override
	 */

	$.MixItUp.prototype = ***REMOVED***
		constructor: $.MixItUp,

		/* Static Properties
		---------------------------------------------------------------------- */

		_instances: ***REMOVED***},
		_handled: ***REMOVED***
			_filter: ***REMOVED***},
			_sort: ***REMOVED***}
		},
		_bound: ***REMOVED***
			_filter: ***REMOVED***},
			_sort: ***REMOVED***}
		},
		_actions: ***REMOVED***},
		_filters: ***REMOVED***},

		/* Static Methods
		---------------------------------------------------------------------- */

		/**
		 * Extend
		 * @since 2.1.0
		 * @param ***REMOVED***object} new properties/methods
		 * @extends ***REMOVED***object} prototype
		 */

		extend: function(extension)***REMOVED***
			for(var key in extension)***REMOVED***
				$.MixItUp.prototype[key] = extension[key];
			}
		},

		/**
		 * Add Action
		 * @since 2.1.0
		 * @param ***REMOVED***string} hook name
		 * @param ***REMOVED***string} namespace
		 * @param ***REMOVED***function} function to execute
		 * @param ***REMOVED***number} priority
		 * @extends ***REMOVED***object} $.MixItUp.prototype._actions
		 */

		addAction: function(hook, name, func, priority)***REMOVED***
			$.MixItUp.prototype._addHook('_actions', hook, name, func, priority);
		},

		/**
		 * Add Filter
		 * @since 2.1.0
		 * @param ***REMOVED***string} hook name
		 * @param ***REMOVED***string} namespace
		 * @param ***REMOVED***function} function to execute
		 * @param ***REMOVED***number} priority
		 * @extends ***REMOVED***object} $.MixItUp.prototype._filters
		 */

		addFilter: function(hook, name, func, priority)***REMOVED***
			$.MixItUp.prototype._addHook('_filters', hook, name, func, priority);
		},

		/**
		 * Add Hook
		 * @since 2.1.0
		 * @param ***REMOVED***string} type of hook
		 * @param ***REMOVED***string} hook name
		 * @param ***REMOVED***function} function to execute
		 * @param ***REMOVED***number} priority
		 * @extends ***REMOVED***object} $.MixItUp.prototype._filters
		 */

		_addHook: function(type, hook, name, func, priority)***REMOVED***
			var collection = $.MixItUp.prototype[type],
				obj = ***REMOVED***};

			priority = (priority === 1 || priority === 'post') ? 'post' : 'pre';

			obj[hook] = ***REMOVED***};
			obj[hook][priority] = ***REMOVED***};
			obj[hook][priority][name] = func;

			$.extend(true, collection, obj);
		},


		/* Private Methods
		---------------------------------------------------------------------- */

		/**
		 * Initialise
		 * @since 2.0.0
		 * @param ***REMOVED***object} domNode
		 * @param ***REMOVED***object} config
		 */

		_init: function(domNode, config)***REMOVED***
			var self = this;

			self._execAction('_init', 0, arguments);

			config && $.extend(true, self, config);

			self._$body = $('body');
			self._domNode = domNode;
			self._$container = $(domNode);
			self._$container.addClass(self.layout.containerClass);
			self._id = domNode.id;

			self._platformDetect();

			self._brake = self._getPrefixedCSS('transition', 'none');

			self._refresh(true);

			self._$parent = self._$targets.parent().length ? self._$targets.parent() : self._$container;

			if(self.load.sort)***REMOVED***
				self._newSort = self._parseSort(self.load.sort);
				self._newSortString = self.load.sort;
				self._activeSort = self.load.sort;
				self._sort();
				self._printSort();
			}

			self._activeFilter = self.load.filter === 'all' ?
				self.selectors.target :
				self.load.filter === 'none' ?
					'' :
					self.load.filter;

			self.controls.enable && self._bindHandlers();

			if(self.controls.toggleFilterButtons)***REMOVED***
				self._buildToggleArray();

				for(var i = 0; i < self._toggleArray.length; i++)***REMOVED***
					self._updateControls(***REMOVED***filter: self._toggleArray[i], sort: self._activeSort}, true);
				};
			} else if(self.controls.enable)***REMOVED***
				self._updateControls(***REMOVED***filter: self._activeFilter, sort: self._activeSort});
			}

			self._filter();

			self._init = true;

			self._$container.data('mixItUp',self);

			self._execAction('_init', 1, arguments);

			self._buildState();

			self._$targets.css(self._brake);

			self._goMix(self.animation.enable);
		},

		/**
		 * Platform Detect
		 * @since 2.0.0
		 */

		_platformDetect: function()***REMOVED***
			var self = this,
				vendorsTrans = ['Webkit', 'Moz', 'O', 'ms'],
				vendorsRAF = ['webkit', 'moz'],
				chrome = window.navigator.appVersion.match(/Chrome\/(\d+)\./) || false,
				ff = typeof InstallTrigger !== 'undefined',
				prefix = function(el)***REMOVED***
					for (var i = 0; i < vendorsTrans.length; i++)***REMOVED***
						if (vendorsTrans[i] + 'Transition' in el.style)***REMOVED***
							return ***REMOVED***
								prefix: '-'+vendorsTrans[i].toLowerCase()+'-',
								vendor: vendorsTrans[i]
							};
						};
					};
					return 'transition' in el.style ? '' : false;
				},
				transPrefix = prefix(self._domNode);

			self._execAction('_platformDetect', 0);

			self._chrome = chrome ? parseInt(chrome[1], 10) : false;
			self._ff = ff ? parseInt(window.navigator.userAgent.match(/rv:([^)]+)\)/)[1]) : false;
			self._prefix = transPrefix.prefix;
			self._vendor = transPrefix.vendor;
			self._suckMode = window.atob && self._prefix ? false : true;

			self._suckMode && (self.animation.enable = false);
			(self._ff && self._ff <= 4) && (self.animation.enable = false);

			/* Polyfills
			---------------------------------------------------------------------- */

			/**
			 * window.requestAnimationFrame
			 */

			for(var x = 0; x < vendorsRAF.length && !window.requestAnimationFrame; x++)***REMOVED***
				window.requestAnimationFrame = window[vendorsRAF[x]+'RequestAnimationFrame'];
			}

			/**
			 * Object.getPrototypeOf
			 */

			if(typeof Object.getPrototypeOf !== 'function')***REMOVED***
				if(typeof 'test'.__proto__ === 'object')***REMOVED***
					Object.getPrototypeOf = function(object)***REMOVED***
						return object.__proto__;
					};
				} else ***REMOVED***
					Object.getPrototypeOf = function(object)***REMOVED***
						return object.constructor.prototype;
					};
				}
			}

			/**
			 * Element.nextElementSibling
			 */

			if(self._domNode.nextElementSibling === undf)***REMOVED***
				Object.defineProperty(Element.prototype, 'nextElementSibling',***REMOVED***
					get: function()***REMOVED***
						var el = this.nextSibling;

						while(el)***REMOVED***
							if(el.nodeType ===1)***REMOVED***
								return el;
							}
							el = el.nextSibling;
						}
						return null;
					}
				});
			}

			self._execAction('_platformDetect', 1);
		},

		/**
		 * Refresh
		 * @since 2.0.0
		 * @param ***REMOVED***boolean} init
		 * @param ***REMOVED***boolean} force
		 */

		_refresh: function(init, force)***REMOVED***
			var self = this;

			self._execAction('_refresh', 0, arguments);

			self._$targets = self._$container.find(self.selectors.target);

			for(var i = 0; i < self._$targets.length; i++)***REMOVED***
				var target = self._$targets[i];

				if(target.dataset === undf || force)***REMOVED***

					target.dataset = ***REMOVED***};

					for(var j = 0; j < target.attributes.length; j++)***REMOVED***

						var attr = target.attributes[j],
							name = attr.name,
							val = attr.value;

						if(name.indexOf('data-') > -1)***REMOVED***
							var dataName = self._helpers._camelCase(name.substring(5,name.length));
							target.dataset[dataName] = val;
						}
					}
				}

				if(target.mixParent === undf)***REMOVED***
					target.mixParent = self._id;
				}
			}

			if(
				(self._$targets.length && init) ||
				(!self._origOrder.length && self._$targets.length)
			)***REMOVED***
				self._origOrder = [];

				for(var i = 0; i < self._$targets.length; i++)***REMOVED***
					var target = self._$targets[i];

					self._origOrder.push(target);
				}
			}

			self._execAction('_refresh', 1, arguments);
		},

		/**
		 * Bind Handlers
		 * @since 2.0.0
		 */

		_bindHandlers: function()***REMOVED***
			var self = this,
				filters = $.MixItUp.prototype._bound._filter,
				sorts = $.MixItUp.prototype._bound._sort;

			self._execAction('_bindHandlers', 0);

			if(self.controls.live)***REMOVED***
				self._$body
					.on('click.mixItUp.'+self._id, self.selectors.sort, function()***REMOVED***
						self._processClick($(this), 'sort');
					})
					.on('click.mixItUp.'+self._id, self.selectors.filter, function()***REMOVED***
						self._processClick($(this), 'filter');
					});
			} else ***REMOVED***
				self._$sortButtons = $(self.selectors.sort);
				self._$filterButtons = $(self.selectors.filter);

				self._$sortButtons.on('click.mixItUp.'+self._id, function()***REMOVED***
					self._processClick($(this), 'sort');
				});

				self._$filterButtons.on('click.mixItUp.'+self._id, function()***REMOVED***
					self._processClick($(this), 'filter');
				});
			}

			filters[self.selectors.filter] = (filters[self.selectors.filter] === undf) ? 1 : filters[self.selectors.filter] + 1;
			sorts[self.selectors.sort] = (sorts[self.selectors.sort] === undf) ? 1 : sorts[self.selectors.sort] + 1;

			self._execAction('_bindHandlers', 1);
		},

		/**
		 * Process Click
		 * @since 2.0.0
		 * @param ***REMOVED***object} $button
		 * @param ***REMOVED***string} type
		 */

		_processClick: function($button, type)***REMOVED***
			var self = this,
				trackClick = function($button, type, off)***REMOVED***
					var proto = $.MixItUp.prototype;

					proto._handled['_'+type][self.selectors[type]] = (proto._handled['_'+type][self.selectors[type]] === undf) ?
						1 :
						proto._handled['_'+type][self.selectors[type]] + 1;

					if(proto._handled['_'+type][self.selectors[type]] === proto._bound['_'+type][self.selectors[type]])***REMOVED***
						$button[(off ? 'remove' : 'add')+'Class'](self.controls.activeClass);
						delete proto._handled['_'+type][self.selectors[type]];
					}
				};

			self._execAction('_processClick', 0, arguments);

			if(!self._mixing || (self.animation.queue && self._queue.length < self.animation.queueLimit))***REMOVED***
				self._clicking = true;

				if(type === 'sort')***REMOVED***
					var sort = $button.attr('data-sort');

					if(!$button.hasClass(self.controls.activeClass) || sort.indexOf('random') > -1)***REMOVED***
						$(self.selectors.sort).removeClass(self.controls.activeClass);
						trackClick($button, type);
						self.sort(sort);
					}
				}

				if(type === 'filter') ***REMOVED***
					var filter = $button.attr('data-filter'),
						ndx,
						seperator = self.controls.toggleLogic === 'or' ? ',' : '';

					if(!self.controls.toggleFilterButtons)***REMOVED***
						if(!$button.hasClass(self.controls.activeClass))***REMOVED***
							$(self.selectors.filter).removeClass(self.controls.activeClass);
							trackClick($button, type);
							self.filter(filter);
						}
					} else ***REMOVED***
						self._buildToggleArray();

						if(!$button.hasClass(self.controls.activeClass))***REMOVED***
							trackClick($button, type);

							self._toggleArray.push(filter);
						} else ***REMOVED***
							trackClick($button, type, true);
							ndx = self._toggleArray.indexOf(filter);
							self._toggleArray.splice(ndx, 1);
						}

						self._toggleArray = $.grep(self._toggleArray,function(n)***REMOVED***return(n);});

						self._toggleString = self._toggleArray.join(seperator);

						self.filter(self._toggleString);
					}
				}

				self._execAction('_processClick', 1, arguments);
			} else ***REMOVED***
				if(typeof self.callbacks.onMixBusy === 'function')***REMOVED***
					self.callbacks.onMixBusy.call(self._domNode, self._state, self);
				}
				self._execAction('_processClickBusy', 1, arguments);
			}
		},

		/**
		 * Build Toggle Array
		 * @since 2.0.0
		 */

		_buildToggleArray: function()***REMOVED***
			var self = this,
				activeFilter = self._activeFilter.replace(/\s/g, '');

			self._execAction('_buildToggleArray', 0, arguments);

			if(self.controls.toggleLogic === 'or')***REMOVED***
				self._toggleArray = activeFilter.split(',');
			} else ***REMOVED***
				self._toggleArray = activeFilter.split('.');

				!self._toggleArray[0] && self._toggleArray.shift();

				for(var i = 0, filter; filter = self._toggleArray[i]; i++)***REMOVED***
					self._toggleArray[i] = '.'+filter;
				}
			}

			self._execAction('_buildToggleArray', 1, arguments);
		},

		/**
		 * Update Controls
		 * @since 2.0.0
		 * @param ***REMOVED***object} command
		 * @param ***REMOVED***boolean} multi
		 */

		_updateControls: function(command, multi)***REMOVED***
			var self = this,
				output = ***REMOVED***
					filter: command.filter,
					sort: command.sort
				},
				update = function($el, filter)***REMOVED***
					try ***REMOVED***
						(multi && type === 'filter' && !(output.filter === 'none' || output.filter === '')) ?
								$el.filter(filter).addClass(self.controls.activeClass) :
								$el.removeClass(self.controls.activeClass).filter(filter).addClass(self.controls.activeClass);
					} catch(e) ***REMOVED***}
				},
				type = 'filter',
				$el = null;

			self._execAction('_updateControls', 0, arguments);

			(command.filter === undf) && (output.filter = self._activeFilter);
			(command.sort === undf) && (output.sort = self._activeSort);
			(output.filter === self.selectors.target) && (output.filter = 'all');

			for(var i = 0; i < 2; i++)***REMOVED***
				$el = self.controls.live ? $(self.selectors[type]) : self['_$'+type+'Buttons'];
				$el && update($el, '[data-'+type+'="'+output[type]+'"]');
				type = 'sort';
			}

			self._execAction('_updateControls', 1, arguments);
		},

		/**
		 * Filter (private)
		 * @since 2.0.0
		 */

		_filter: function()***REMOVED***
			var self = this;

			self._execAction('_filter', 0);

			for(var i = 0; i < self._$targets.length; i++)***REMOVED***
				var $target = $(self._$targets[i]);

				if($target.is(self._activeFilter))***REMOVED***
					self._$show = self._$show.add($target);
				} else ***REMOVED***
					self._$hide = self._$hide.add($target);
				}
			}

			self._execAction('_filter', 1);
		},

		/**
		 * Sort (private)
		 * @since 2.0.0
		 */

		_sort: function()***REMOVED***
			var self = this,
				arrayShuffle = function(oldArray)***REMOVED***
					var newArray = oldArray.slice(),
						len = newArray.length,
						i = len;

					while(i--)***REMOVED***
						var p = parseInt(Math.random()*len);
						var t = newArray[i];
						newArray[i] = newArray[p];
						newArray[p] = t;
					};
					return newArray;
				};

			self._execAction('_sort', 0);

			self._startOrder = [];

			for(var i = 0; i < self._$targets.length; i++)***REMOVED***
				var target = self._$targets[i];

				self._startOrder.push(target);
			}

			switch(self._newSort[0].sortBy)***REMOVED***
				case 'default':
					self._newOrder = self._origOrder;
					break;
				case 'random':
					self._newOrder = arrayShuffle(self._startOrder);
					break;
				case 'custom':
					self._newOrder = self._newSort[0].order;
					break;
				default:
					self._newOrder = self._startOrder.concat().sort(function(a, b)***REMOVED***
						return self._compare(a, b);
					});
			}

			self._execAction('_sort', 1);
		},

		/**
		 * Compare Algorithm
		 * @since 2.0.0
		 * @param ***REMOVED***string|number} a
		 * @param ***REMOVED***string|number} b
		 * @param ***REMOVED***number} depth (recursion)
		 * @return ***REMOVED***number}
		 */

		_compare: function(a, b, depth)***REMOVED***
			depth = depth ? depth : 0;

			var self = this,
				order = self._newSort[depth].order,
				getData = function(el)***REMOVED***
					return el.dataset[self._newSort[depth].sortBy] || 0;
				},
				attrA = isNaN(getData(a) * 1) ? getData(a).toLowerCase() : getData(a) * 1,
				attrB = isNaN(getData(b) * 1) ? getData(b).toLowerCase() : getData(b) * 1;

			if(attrA < attrB)
				return order === 'asc' ? -1 : 1;
			if(attrA > attrB)
				return order === 'asc' ? 1 : -1;
			if(attrA === attrB && self._newSort.length > depth+1)
				return self._compare(a, b, depth+1);

			return 0;
		},

		/**
		 * Print Sort
		 * @since 2.0.0
		 * @param ***REMOVED***boolean} reset
		 */

		_printSort: function(reset)***REMOVED***
			var self = this,
				order = reset ? self._startOrder : self._newOrder,
				targets = self._$parent[0].querySelectorAll(self.selectors.target),
				nextSibling = targets.length ? targets[targets.length -1].nextElementSibling : null,
				frag = document.createDocumentFragment();

			self._execAction('_printSort', 0, arguments);

			for(var i = 0; i < targets.length; i++)***REMOVED***
				var target = targets[i],
					whiteSpace = target.nextSibling;

				if(target.style.position === 'absolute') continue;

				if(whiteSpace && whiteSpace.nodeName === '#text')***REMOVED***
					self._$parent[0].removeChild(whiteSpace);
				}

				self._$parent[0].removeChild(target);
			}

			for(var i = 0; i < order.length; i++)***REMOVED***
				var el = order[i];

				if(self._newSort[0].sortBy === 'default' && self._newSort[0].order === 'desc' && !reset)***REMOVED***
					var firstChild = frag.firstChild;
					frag.insertBefore(el, firstChild);
					frag.insertBefore(document.createTextNode(' '), el);
				} else ***REMOVED***
					frag.appendChild(el);
					frag.appendChild(document.createTextNode(' '));
				}
			}

			nextSibling ?
				self._$parent[0].insertBefore(frag, nextSibling) :
				self._$parent[0].appendChild(frag);

			self._execAction('_printSort', 1, arguments);
		},

		/**
		 * Parse Sort
		 * @since 2.0.0
		 * @param ***REMOVED***string} sortString
		 * @return ***REMOVED***array} newSort
		 */

		_parseSort: function(sortString)***REMOVED***
			var self = this,
				rules = typeof sortString === 'string' ? sortString.split(' ') : [sortString],
				newSort = [];

			for(var i = 0; i < rules.length; i++)***REMOVED***
				var rule = typeof sortString === 'string' ? rules[i].split(':') : ['custom', rules[i]],
					ruleObj = ***REMOVED***
						sortBy: self._helpers._camelCase(rule[0]),
						order: rule[1] || 'asc'
					};

				newSort.push(ruleObj);

				if(ruleObj.sortBy === 'default' || ruleObj.sortBy === 'random') break;
			}

			return self._execFilter('_parseSort', newSort, arguments);
		},

		/**
		 * Parse Effects
		 * @since 2.0.0
		 * @return ***REMOVED***object} effects
		 */

		_parseEffects: function()***REMOVED***
			var self = this,
				effects = ***REMOVED***
					opacity: '',
					transformIn: '',
					transformOut: '',
					filter: ''
				},
				parse = function(effect, extract, reverse)***REMOVED***
					if(self.animation.effects.indexOf(effect) > -1)***REMOVED***
						if(extract)***REMOVED***
							var propIndex = self.animation.effects.indexOf(effect+'(');
							if(propIndex > -1)***REMOVED***
								var str = self.animation.effects.substring(propIndex),
									match = /\(([^)]+)\)/.exec(str),
									val = match[1];

									return ***REMOVED***val: val};
							}
						}
						return true;
					} else ***REMOVED***
						return false;
					}
				},
				negate = function(value, invert)***REMOVED***
					if(invert)***REMOVED***
						return value.charAt(0) === '-' ? value.substr(1, value.length) : '-'+value;
					} else ***REMOVED***
						return value;
					}
				},
				buildTransform = function(key, invert)***REMOVED***
					var transforms = [
						['scale', '.01'],
						['translateX', '20px'],
						['translateY', '20px'],
						['translateZ', '20px'],
						['rotateX', '90deg'],
						['rotateY', '90deg'],
						['rotateZ', '180deg'],
					];

					for(var i = 0; i < transforms.length; i++)***REMOVED***
						var prop = transforms[i][0],
							def = transforms[i][1],
							inverted = invert && prop !== 'scale';

						effects[key] += parse(prop) ? prop+'('+negate(parse(prop, true).val || def, inverted)+') ' : '';
					}
				};

			effects.opacity = parse('fade') ? parse('fade',true).val || '0' : '1';

			buildTransform('transformIn');

			self.animation.reverseOut ? buildTransform('transformOut', true) : (effects.transformOut = effects.transformIn);

			effects.transition = ***REMOVED***};

			effects.transition = self._getPrefixedCSS('transition','all '+self.animation.duration+'ms '+self.animation.easing+', opacity '+self.animation.duration+'ms linear');

			self.animation.stagger = parse('stagger') ? true : false;
			self.animation.staggerDuration = parseInt(parse('stagger') ? (parse('stagger',true).val ? parse('stagger',true).val : 100) : 100);

			return self._execFilter('_parseEffects', effects);
		},

		/**
		 * Build State
		 * @since 2.0.0
		 * @param ***REMOVED***boolean} future
		 * @return ***REMOVED***object} futureState
		 */

		_buildState: function(future)***REMOVED***
			var self = this,
				state = ***REMOVED***};

			self._execAction('_buildState', 0);

			state = ***REMOVED***
				activeFilter: self._activeFilter === '' ? 'none' : self._activeFilter,
				activeSort: future && self._newSortString ? self._newSortString : self._activeSort,
				fail: !self._$show.length && self._activeFilter !== '',
				$targets: self._$targets,
				$show: self._$show,
				$hide: self._$hide,
				totalTargets: self._$targets.length,
				totalShow: self._$show.length,
				totalHide: self._$hide.length,
				display: future && self._newDisplay ? self._newDisplay : self.layout.display
			};

			if(future)***REMOVED***
				return self._execFilter('_buildState', state);
			} else ***REMOVED***
				self._state = state;

				self._execAction('_buildState', 1);
			}
		},

		/**
		 * Go Mix
		 * @since 2.0.0
		 * @param ***REMOVED***boolean} animate
		 */

		_goMix: function(animate)***REMOVED***
			var self = this,
				phase1 = function()***REMOVED***
					if(self._chrome && (self._chrome === 31))***REMOVED***
						chromeFix(self._$parent[0]);
					}

					self._setInter();

					phase2();
				},
				phase2 = function()***REMOVED***
					var scrollTop = window.pageYOffset,
						scrollLeft = window.pageXOffset,
						docHeight = document.documentElement.scrollHeight;

					self._getInterMixData();

					self._setFinal();

					self._getFinalMixData();

					(window.pageYOffset !== scrollTop) && window.scrollTo(scrollLeft, scrollTop);

					self._prepTargets();

					if(window.requestAnimationFrame)***REMOVED***
						requestAnimationFrame(phase3);
					} else ***REMOVED***
						setTimeout(function()***REMOVED***
							phase3();
						},20);
					}
				},
				phase3 = function()***REMOVED***
					self._animateTargets();

					if(self._targetsBound === 0)***REMOVED***
						self._cleanUp();
					}
				},
				chromeFix = function(grid)***REMOVED***
					var parent = grid.parentElement,
						placeholder = document.createElement('div'),
						frag = document.createDocumentFragment();

					parent.insertBefore(placeholder, grid);
					frag.appendChild(grid);
					parent.replaceChild(grid, placeholder);
				},
				futureState = self._buildState(true);

			self._execAction('_goMix', 0, arguments);

			!self.animation.duration && (animate = false);

			self._mixing = true;

			self._$container.removeClass(self.layout.containerClassFail);

			if(typeof self.callbacks.onMixStart === 'function')***REMOVED***
				self.callbacks.onMixStart.call(self._domNode, self._state, futureState, self);
			}

			self._$container.trigger('mixStart', [self._state, futureState, self]);

			self._getOrigMixData();

			if(animate && !self._suckMode)***REMOVED***

				window.requestAnimationFrame ?
					requestAnimationFrame(phase1) :
					phase1();

			} else ***REMOVED***
				self._cleanUp();
			}

			self._execAction('_goMix', 1, arguments);
		},

		/**
		 * Get Target Data
		 * @since 2.0.0
		 */

		_getTargetData: function(el, stage)***REMOVED***
			var self = this,
				elStyle;

			el.dataset[stage+'PosX'] = el.offsetLeft;
			el.dataset[stage+'PosY'] = el.offsetTop;

			if(self.animation.animateResizeTargets)***REMOVED***
				elStyle = !self._suckMode ?
					window.getComputedStyle(el) :
					***REMOVED***
						marginBottom: '',
						marginRight: ''
					};

				el.dataset[stage+'MarginBottom'] = parseInt(elStyle.marginBottom);
				el.dataset[stage+'MarginRight'] = parseInt(elStyle.marginRight);
				el.dataset[stage+'Width'] = el.offsetWidth;
				el.dataset[stage+'Height'] = el.offsetHeight;
			}
		},

		/**
		 * Get Original Mix Data
		 * @since 2.0.0
		 */

		_getOrigMixData: function()***REMOVED***
			var self = this,
				parentStyle = !self._suckMode ? window.getComputedStyle(self._$parent[0]) : ***REMOVED***boxSizing: ''},
				parentBS = parentStyle.boxSizing || parentStyle[self._vendor+'BoxSizing'];

			self._incPadding = (parentBS === 'border-box');

			self._execAction('_getOrigMixData', 0);

			!self._suckMode && (self.effects = self._parseEffects());

			self._$toHide = self._$hide.filter(':visible');
			self._$toShow = self._$show.filter(':hidden');
			self._$pre = self._$targets.filter(':visible');

			self._startHeight = self._incPadding ?
				self._$parent.outerHeight() :
				self._$parent.height();

			for(var i = 0; i < self._$pre.length; i++)***REMOVED***
				var el = self._$pre[i];

				self._getTargetData(el, 'orig');
			}

			self._execAction('_getOrigMixData', 1);
		},

		/**
		 * Set Intermediate Positions
		 * @since 2.0.0
		 */

		_setInter: function()***REMOVED***
			var self = this;

			self._execAction('_setInter', 0);

			if(self._changingLayout && self.animation.animateChangeLayout)***REMOVED***
				self._$toShow.css('display',self._newDisplay);

				if(self._changingClass)***REMOVED***
					self._$container
						.removeClass(self.layout.containerClass)
						.addClass(self._newClass);
				}
			} else ***REMOVED***
				self._$toShow.css('display', self.layout.display);
			}

			self._execAction('_setInter', 1);
		},

		/**
		 * Get Intermediate Mix Data
		 * @since 2.0.0
		 */

		_getInterMixData: function()***REMOVED***
			var self = this;

			self._execAction('_getInterMixData', 0);

			for(var i = 0; i < self._$toShow.length; i++)***REMOVED***
				var el = self._$toShow[i];

				self._getTargetData(el, 'inter');
			}

			for(var i = 0; i < self._$pre.length; i++)***REMOVED***
				var el = self._$pre[i];

				self._getTargetData(el, 'inter');
			}

			self._execAction('_getInterMixData', 1);
		},

		/**
		 * Set Final Positions
		 * @since 2.0.0
		 */

		_setFinal: function()***REMOVED***
			var self = this;

			self._execAction('_setFinal', 0);

			self._sorting && self._printSort();

			self._$toHide.removeStyle('display');

			if(self._changingLayout && self.animation.animateChangeLayout)***REMOVED***
				self._$pre.css('display',self._newDisplay);
			}

			self._execAction('_setFinal', 1);
		},

		/**
		 * Get Final Mix Data
		 * @since 2.0.0
		 */

		_getFinalMixData: function()***REMOVED***
			var self = this;

			self._execAction('_getFinalMixData', 0);

			for(var i = 0; i < self._$toShow.length; i++)***REMOVED***
				var el = self._$toShow[i];

				self._getTargetData(el, 'final');
			}

			for(var i = 0; i < self._$pre.length; i++)***REMOVED***
				var el = self._$pre[i];

				self._getTargetData(el, 'final');
			}

			self._newHeight = self._incPadding ?
				self._$parent.outerHeight() :
				self._$parent.height();

			self._sorting && self._printSort(true);

			self._$toShow.removeStyle('display');

			self._$pre.css('display',self.layout.display);

			if(self._changingClass && self.animation.animateChangeLayout)***REMOVED***
				self._$container
					.removeClass(self._newClass)
					.addClass(self.layout.containerClass);
			}

			self._execAction('_getFinalMixData', 1);
		},

		/**
		 * Prepare Targets
		 * @since 2.0.0
		 */

		_prepTargets: function()***REMOVED***
			var self = this,
				transformCSS = ***REMOVED***
					_in: self._getPrefixedCSS('transform', self.effects.transformIn),
					_out: self._getPrefixedCSS('transform', self.effects.transformOut)
				};

			self._execAction('_prepTargets', 0);

			if(self.animation.animateResizeContainer)***REMOVED***
				self._$parent.css('height',self._startHeight+'px');
			}

			for(var i = 0; i < self._$toShow.length; i++)***REMOVED***
				var el = self._$toShow[i],
					$el = $(el);

				el.style.opacity = self.effects.opacity;
				el.style.display = (self._changingLayout && self.animation.animateChangeLayout) ?
					self._newDisplay :
					self.layout.display;

				$el.css(transformCSS._in);

				if(self.animation.animateResizeTargets)***REMOVED***
					el.style.width = el.dataset.finalWidth+'px';
					el.style.height = el.dataset.finalHeight+'px';
					el.style.marginRight = -(el.dataset.finalWidth - el.dataset.interWidth) + (el.dataset.finalMarginRight * 1)+'px';
					el.style.marginBottom = -(el.dataset.finalHeight - el.dataset.interHeight) + (el.dataset.finalMarginBottom * 1)+'px';
				}
			}

			for(var i = 0; i < self._$pre.length; i++)***REMOVED***
				var el = self._$pre[i],
					$el = $(el),
					translate = ***REMOVED***
						x: el.dataset.origPosX - el.dataset.interPosX,
						y: el.dataset.origPosY - el.dataset.interPosY
					},
					transformCSS = self._getPrefixedCSS('transform','translate('+translate.x+'px,'+translate.y+'px)');

				$el.css(transformCSS);

				if(self.animation.animateResizeTargets)***REMOVED***
					el.style.width = el.dataset.origWidth+'px';
					el.style.height = el.dataset.origHeight+'px';

					if(el.dataset.origWidth - el.dataset.finalWidth)***REMOVED***
						el.style.marginRight = -(el.dataset.origWidth - el.dataset.interWidth) + (el.dataset.origMarginRight * 1)+'px';
					}

					if(el.dataset.origHeight - el.dataset.finalHeight)***REMOVED***
						el.style.marginBottom = -(el.dataset.origHeight - el.dataset.interHeight) + (el.dataset.origMarginBottom * 1) +'px';
					}
				}
			}

			self._execAction('_prepTargets', 1);
		},

		/**
		 * Animate Targets
		 * @since 2.0.0
		 */

		_animateTargets: function()***REMOVED***
			var self = this;

			self._execAction('_animateTargets', 0);

			self._targetsDone = 0;
			self._targetsBound = 0;

			self._$parent
				.css(self._getPrefixedCSS('perspective', self.animation.perspectiveDistance+'px'))
				.css(self._getPrefixedCSS('perspective-origin', self.animation.perspectiveOrigin));

			if(self.animation.animateResizeContainer)***REMOVED***
				self._$parent
					.css(self._getPrefixedCSS('transition','height '+self.animation.duration+'ms ease'))
					.css('height',self._newHeight+'px');
			}

			for(var i = 0; i < self._$toShow.length; i++)***REMOVED***
				var el = self._$toShow[i],
					$el = $(el),
					translate = ***REMOVED***
						x: el.dataset.finalPosX - el.dataset.interPosX,
						y: el.dataset.finalPosY - el.dataset.interPosY
					},
					delay = self._getDelay(i),
					toShowCSS = ***REMOVED***};

				el.style.opacity = '';

				for(var j = 0; j < 2; j++)***REMOVED***
					var a = j === 0 ? a = self._prefix : '';

					if(self._ff && self._ff <= 20)***REMOVED***
						toShowCSS[a+'transition-property'] = 'all';
						toShowCSS[a+'transition-timing-function'] = self.animation.easing+'ms';
						toShowCSS[a+'transition-duration'] = self.animation.duration+'ms';
					}

					toShowCSS[a+'transition-delay'] = delay+'ms';
					toShowCSS[a+'transform'] = 'translate('+translate.x+'px,'+translate.y+'px)';
				}

				if(self.effects.transform || self.effects.opacity)***REMOVED***
					self._bindTargetDone($el);
				}

				(self._ff && self._ff <= 20) ?
					$el.css(toShowCSS) :
					$el.css(self.effects.transition).css(toShowCSS);
			}

			for(var i = 0; i < self._$pre.length; i++)***REMOVED***
				var el = self._$pre[i],
					$el = $(el),
					translate = ***REMOVED***
						x: el.dataset.finalPosX - el.dataset.interPosX,
						y: el.dataset.finalPosY - el.dataset.interPosY
					},
					delay = self._getDelay(i);

				if(!(
					el.dataset.finalPosX === el.dataset.origPosX &&
					el.dataset.finalPosY === el.dataset.origPosY
				))***REMOVED***
					self._bindTargetDone($el);
				}

				$el.css(self._getPrefixedCSS('transition', 'all '+self.animation.duration+'ms '+self.animation.easing+' '+delay+'ms'));
				$el.css(self._getPrefixedCSS('transform', 'translate('+translate.x+'px,'+translate.y+'px)'));

				if(self.animation.animateResizeTargets)***REMOVED***
					if(el.dataset.origWidth - el.dataset.finalWidth && el.dataset.finalWidth * 1)***REMOVED***
						el.style.width = el.dataset.finalWidth+'px';
						el.style.marginRight = -(el.dataset.finalWidth - el.dataset.interWidth)+(el.dataset.finalMarginRight * 1)+'px';
					}

					if(el.dataset.origHeight - el.dataset.finalHeight && el.dataset.finalHeight * 1)***REMOVED***
						el.style.height = el.dataset.finalHeight+'px';
						el.style.marginBottom = -(el.dataset.finalHeight - el.dataset.interHeight)+(el.dataset.finalMarginBottom * 1) +'px';
					}
				}
			}

			if(self._changingClass)***REMOVED***
				self._$container
					.removeClass(self.layout.containerClass)
					.addClass(self._newClass);
			}

			for(var i = 0; i < self._$toHide.length; i++)***REMOVED***
				var el = self._$toHide[i],
					$el = $(el),
					delay = self._getDelay(i),
					toHideCSS = ***REMOVED***};

				for(var j = 0; j<2; j++)***REMOVED***
					var a = j === 0 ? a = self._prefix : '';

					toHideCSS[a+'transition-delay'] = delay+'ms';
					toHideCSS[a+'transform'] = self.effects.transformOut;
					toHideCSS.opacity = self.effects.opacity;
				}

				$el.css(self.effects.transition).css(toHideCSS);

				if(self.effects.transform || self.effects.opacity)***REMOVED***
					self._bindTargetDone($el);
				};
			}

			self._execAction('_animateTargets', 1);

		},

		/**
		 * Bind Targets TransitionEnd
		 * @since 2.0.0
		 * @param ***REMOVED***object} $el
		 */

		_bindTargetDone: function($el)***REMOVED***
			var self = this,
				el = $el[0];

			self._execAction('_bindTargetDone', 0, arguments);

			if(!el.dataset.bound)***REMOVED***

				el.dataset.bound = true;
				self._targetsBound++;

				$el.on('webkitTransitionEnd.mixItUp transitionend.mixItUp',function(e)***REMOVED***
					if(
						(e.originalEvent.propertyName.indexOf('transform') > -1 ||
						e.originalEvent.propertyName.indexOf('opacity') > -1) &&
						$(e.originalEvent.target).is(self.selectors.target)
					)***REMOVED***
						$el.off('.mixItUp');
						el.dataset.bound = '';
						self._targetDone();
					}
				});
			}

			self._execAction('_bindTargetDone', 1, arguments);
		},

		/**
		 * Target Done
		 * @since 2.0.0
		 */

		_targetDone: function()***REMOVED***
			var self = this;

			self._execAction('_targetDone', 0);

			self._targetsDone++;

			(self._targetsDone === self._targetsBound) && self._cleanUp();

			self._execAction('_targetDone', 1);
		},

		/**
		 * Clean Up
		 * @since 2.0.0
		 */

		_cleanUp: function()***REMOVED***
			var self = this,
				targetStyles = self.animation.animateResizeTargets ?
					'transform opacity width height margin-bottom margin-right' :
					'transform opacity',
				unBrake = function()***REMOVED***
					self._$targets.removeStyle('transition', self._prefix);
				};

			self._execAction('_cleanUp', 0);

			!self._changingLayout ?
				self._$show.css('display',self.layout.display) :
				self._$show.css('display',self._newDisplay);

			self._$targets.css(self._brake);

			self._$targets
				.removeStyle(targetStyles, self._prefix)
				.removeAttr('data-inter-pos-x data-inter-pos-y data-final-pos-x data-final-pos-y data-orig-pos-x data-orig-pos-y data-orig-height data-orig-width data-final-height data-final-width data-inter-width data-inter-height data-orig-margin-right data-orig-margin-bottom data-inter-margin-right data-inter-margin-bottom data-final-margin-right data-final-margin-bottom');

			self._$hide.removeStyle('display');

			self._$parent.removeStyle('height transition perspective-distance perspective perspective-origin-x perspective-origin-y perspective-origin perspectiveOrigin', self._prefix);

			if(self._sorting)***REMOVED***
				self._printSort();
				self._activeSort = self._newSortString;
				self._sorting = false;
			}

			if(self._changingLayout)***REMOVED***
				if(self._changingDisplay)***REMOVED***
					self.layout.display = self._newDisplay;
					self._changingDisplay = false;
				}

				if(self._changingClass)***REMOVED***
					self._$parent.removeClass(self.layout.containerClass).addClass(self._newClass);
					self.layout.containerClass = self._newClass;
					self._changingClass = false;
				}

				self._changingLayout = false;
			}

			self._refresh();

			self._buildState();

			if(self._state.fail)***REMOVED***
				self._$container.addClass(self.layout.containerClassFail);
			}

			self._$show = $();
			self._$hide = $();

			if(window.requestAnimationFrame)***REMOVED***
				requestAnimationFrame(unBrake);
			}

			self._mixing = false;

			if(typeof self.callbacks._user === 'function')***REMOVED***
				self.callbacks._user.call(self._domNode, self._state, self);
			}

			if(typeof self.callbacks.onMixEnd === 'function')***REMOVED***
				self.callbacks.onMixEnd.call(self._domNode, self._state, self);
			}

			self._$container.trigger('mixEnd', [self._state, self]);

			if(self._state.fail)***REMOVED***
				(typeof self.callbacks.onMixFail === 'function') && self.callbacks.onMixFail.call(self._domNode, self._state, self);
				self._$container.trigger('mixFail', [self._state, self]);
			}

			if(self._loading)***REMOVED***
				(typeof self.callbacks.onMixLoad === 'function') && self.callbacks.onMixLoad.call(self._domNode, self._state, self);
				self._$container.trigger('mixLoad', [self._state, self]);
			}

			if(self._queue.length)***REMOVED***
				self._execAction('_queue', 0);

				self.multiMix(self._queue[0][0],self._queue[0][1],self._queue[0][2]);
				self._queue.splice(0, 1);
			}

			self._execAction('_cleanUp', 1);

			self._loading = false;
		},

		/**
		 * Get Prefixed CSS
		 * @since 2.0.0
		 * @param ***REMOVED***string} property
		 * @param ***REMOVED***string} value
		 * @param ***REMOVED***boolean} prefixValue
		 * @return ***REMOVED***object} styles
		 */

		_getPrefixedCSS: function(property, value, prefixValue)***REMOVED***
			var self = this,
				styles = ***REMOVED***},
				prefix = '',
				i = -1;

			for(i = 0; i < 2; i++)***REMOVED***
				prefix = i === 0 ? self._prefix : '';
				prefixValue ? styles[prefix+property] = prefix+value : styles[prefix+property] = value;
			}

			return self._execFilter('_getPrefixedCSS', styles, arguments);
		},

		/**
		 * Get Delay
		 * @since 2.0.0
		 * @param ***REMOVED***number} i
		 * @return ***REMOVED***number} delay
		 */

		_getDelay: function(i)***REMOVED***
			var self = this,
				n = typeof self.animation.staggerSequence === 'function' ? self.animation.staggerSequence.call(self._domNode, i, self._state) : i,
				delay = self.animation.stagger ? n * self.animation.staggerDuration : 0;

			return self._execFilter('_getDelay', delay, arguments);
		},

		/**
		 * Parse MultiMix Arguments
		 * @since 2.0.0
		 * @param ***REMOVED***array} args
		 * @return ***REMOVED***object} output
		 */

		_parseMultiMixArgs: function(args)***REMOVED***
			var self = this,
				output = ***REMOVED***
					command: null,
					animate: self.animation.enable,
					callback: null
				};

			for(var i = 0; i < args.length; i++)***REMOVED***
				var arg = args[i];

				if(arg !== null)***REMOVED***
					if(typeof arg === 'object' || typeof arg === 'string')***REMOVED***
						output.command = arg;
					} else if(typeof arg === 'boolean')***REMOVED***
						output.animate = arg;
					} else if(typeof arg === 'function')***REMOVED***
						output.callback = arg;
					}
				}
			}

			return self._execFilter('_parseMultiMixArgs', output, arguments);
		},

		/**
		 * Parse Insert Arguments
		 * @since 2.0.0
		 * @param ***REMOVED***array} args
		 * @return ***REMOVED***object} output
		 */

		_parseInsertArgs: function(args)***REMOVED***
			var self = this,
				output = ***REMOVED***
					index: 0,
					$object: $(),
					multiMix: ***REMOVED***filter: self._state.activeFilter},
					callback: null
				};

			for(var i = 0; i < args.length; i++)***REMOVED***
				var arg = args[i];

				if(typeof arg === 'number')***REMOVED***
					output.index = arg;
				} else if(typeof arg === 'object' && arg instanceof $)***REMOVED***
					output.$object = arg;
				} else if(typeof arg === 'object' && self._helpers._isElement(arg))***REMOVED***
					output.$object = $(arg);
				} else if(typeof arg === 'object' && arg !== null)***REMOVED***
					output.multiMix = arg;
				} else if(typeof arg === 'boolean' && !arg)***REMOVED***
					output.multiMix = false;
				} else if(typeof arg === 'function')***REMOVED***
					output.callback = arg;
				}
			}

			return self._execFilter('_parseInsertArgs', output, arguments);
		},

		/**
		 * Execute Action
		 * @since 2.0.0
		 * @param ***REMOVED***string} methodName
		 * @param ***REMOVED***boolean} isPost
		 * @param ***REMOVED***array} args
		 */

		_execAction: function(methodName, isPost, args)***REMOVED***
			var self = this,
				context = isPost ? 'post' : 'pre';

			if(!self._actions.isEmptyObject && self._actions.hasOwnProperty(methodName))***REMOVED***
				for(var key in self._actions[methodName][context])***REMOVED***
					self._actions[methodName][context][key].call(self, args);
				}
			}
		},

		/**
		 * Execute Filter
		 * @since 2.0.0
		 * @param ***REMOVED***string} methodName
		 * @param ***REMOVED***mixed} value
		 * @return ***REMOVED***mixed} value
		 */

		_execFilter: function(methodName, value, args)***REMOVED***
			var self = this;

			if(!self._filters.isEmptyObject && self._filters.hasOwnProperty(methodName))***REMOVED***
				for(var key in self._filters[methodName])***REMOVED***
					return self._filters[methodName][key].call(self, args);
				}
			} else ***REMOVED***
				return value;
			}
		},

		/* Helpers
		---------------------------------------------------------------------- */

		_helpers: ***REMOVED***

			/**
			 * CamelCase
			 * @since 2.0.0
			 * @param ***REMOVED***string}
			 * @return ***REMOVED***string}
			 */

			_camelCase: function(string)***REMOVED***
				return string.replace(/-([a-z])/g, function(g)***REMOVED***
						return g[1].toUpperCase();
				});
			},

			/**
			 * Is Element
			 * @since 2.1.3
			 * @param ***REMOVED***object} element to test
			 * @return ***REMOVED***boolean}
			 */

			_isElement: function(el)***REMOVED***
				if(window.HTMLElement)***REMOVED***
					return el instanceof HTMLElement;
				} else ***REMOVED***
					return (
						el !== null &&
						el.nodeType === 1 &&
						el.nodeName === 'string'
					);
				}
			}
		},

		/* Public Methods
		---------------------------------------------------------------------- */

		/**
		 * Is Mixing
		 * @since 2.0.0
		 * @return ***REMOVED***boolean}
		 */

		isMixing: function()***REMOVED***
			var self = this;

			return self._execFilter('isMixing', self._mixing);
		},

		/**
		 * Filter (public)
		 * @since 2.0.0
		 * @param ***REMOVED***array} arguments
		 */

		filter: function()***REMOVED***
			var self = this,
				args = self._parseMultiMixArgs(arguments);

			self._clicking && (self._toggleString = '');

			self.multiMix(***REMOVED***filter: args.command}, args.animate, args.callback);
		},

		/**
		 * Sort (public)
		 * @since 2.0.0
		 * @param ***REMOVED***array} arguments
		 */

		sort: function()***REMOVED***
			var self = this,
				args = self._parseMultiMixArgs(arguments);

			self.multiMix(***REMOVED***sort: args.command}, args.animate, args.callback);
		},

		/**
		 * Change Layout (public)
		 * @since 2.0.0
		 * @param ***REMOVED***array} arguments
		 */

		changeLayout: function()***REMOVED***
			var self = this,
				args = self._parseMultiMixArgs(arguments);

			self.multiMix(***REMOVED***changeLayout: args.command}, args.animate, args.callback);
		},

		/**
		 * MultiMix
		 * @since 2.0.0
		 * @param ***REMOVED***array} arguments
		 */

		multiMix: function()***REMOVED***
			var self = this,
				args = self._parseMultiMixArgs(arguments);

			self._execAction('multiMix', 0, arguments);

			if(!self._mixing)***REMOVED***
				if(self.controls.enable && !self._clicking)***REMOVED***
					self.controls.toggleFilterButtons && self._buildToggleArray();
					self._updateControls(args.command, self.controls.toggleFilterButtons);
				}

				(self._queue.length < 2) && (self._clicking = false);

				delete self.callbacks._user;
				if(args.callback) self.callbacks._user = args.callback;

				var sort = args.command.sort,
					filter = args.command.filter,
					changeLayout = args.command.changeLayout;

				self._refresh();

				if(sort)***REMOVED***
					self._newSort = self._parseSort(sort);
					self._newSortString = sort;

					self._sorting = true;
					self._sort();
				}

				if(filter !== undf)***REMOVED***
					filter = (filter === 'all') ? self.selectors.target : filter;

					self._activeFilter = filter;
				}

				self._filter();

				if(changeLayout)***REMOVED***
					self._newDisplay = (typeof changeLayout === 'string') ? changeLayout : changeLayout.display || self.layout.display;
					self._newClass = changeLayout.containerClass || '';

					if(
						self._newDisplay !== self.layout.display ||
						self._newClass !== self.layout.containerClass
					)***REMOVED***
						self._changingLayout = true;

						self._changingClass = (self._newClass !== self.layout.containerClass);
						self._changingDisplay = (self._newDisplay !== self.layout.display);
					}
				}

				self._$targets.css(self._brake);

				self._goMix(args.animate ^ self.animation.enable ? args.animate : self.animation.enable);

				self._execAction('multiMix', 1, arguments);

			} else ***REMOVED***
				if(self.animation.queue && self._queue.length < self.animation.queueLimit)***REMOVED***
					self._queue.push(arguments);

					(self.controls.enable && !self._clicking) && self._updateControls(args.command);

					self._execAction('multiMixQueue', 1, arguments);

				} else ***REMOVED***
					if(typeof self.callbacks.onMixBusy === 'function')***REMOVED***
						self.callbacks.onMixBusy.call(self._domNode, self._state, self);
					}
					self._$container.trigger('mixBusy', [self._state, self]);

					self._execAction('multiMixBusy', 1, arguments);
				}
			}
		},

		/**
		 * Insert
		 * @since 2.0.0
		 * @param ***REMOVED***array} arguments
		 */

		insert: function()***REMOVED***
			var self = this,
				args = self._parseInsertArgs(arguments),
				callback = (typeof args.callback === 'function') ? args.callback : null,
				frag = document.createDocumentFragment(),
				target = (function()***REMOVED***
					self._refresh();

					if(self._$targets.length)***REMOVED***
						return (args.index < self._$targets.length || !self._$targets.length) ?
							self._$targets[args.index] :
							self._$targets[self._$targets.length-1].nextElementSibling;
					} else ***REMOVED***
						return self._$parent[0].children[0];
					}
				})();

			self._execAction('insert', 0, arguments);

			if(args.$object)***REMOVED***
				for(var i = 0; i < args.$object.length; i++)***REMOVED***
					var el = args.$object[i];

					frag.appendChild(el);
					frag.appendChild(document.createTextNode(' '));
				}

				self._$parent[0].insertBefore(frag, target);
			}

			self._execAction('insert', 1, arguments);

			if(typeof args.multiMix === 'object')***REMOVED***
				self.multiMix(args.multiMix, callback);
			}
		},

		/**
		 * Prepend
		 * @since 2.0.0
		 * @param ***REMOVED***array} arguments
		 */

		prepend: function()***REMOVED***
			var self = this,
				args = self._parseInsertArgs(arguments);

			self.insert(0, args.$object, args.multiMix, args.callback);
		},

		/**
		 * Append
		 * @since 2.0.0
		 * @param ***REMOVED***array} arguments
		 */

		append: function()***REMOVED***
			var self = this,
				args = self._parseInsertArgs(arguments);

			self.insert(self._state.totalTargets, args.$object, args.multiMix, args.callback);
		},

		/**
		 * Get Option
		 * @since 2.0.0
		 * @param ***REMOVED***string} string
		 * @return ***REMOVED***mixed} value
		 */

		getOption: function(string)***REMOVED***
			var self = this,
				getProperty = function(obj, prop)***REMOVED***
					var parts = prop.split('.'),
						last = parts.pop(),
						l = parts.length,
						i = 1,
						current = parts[0] || prop;

					while((obj = obj[current]) && i < l)***REMOVED***
						current = parts[i];
						i++;
					}

					if(obj !== undf)***REMOVED***
						return obj[last] !== undf ? obj[last] : obj;
					}
				};

			return string ? self._execFilter('getOption', getProperty(self, string), arguments) : self;
		},

		/**
		 * Set Options
		 * @since 2.0.0
		 * @param ***REMOVED***object} config
		 */

		setOptions: function(config)***REMOVED***
			var self = this;

			self._execAction('setOptions', 0, arguments);

			typeof config === 'object' && $.extend(true, self, config);

			self._execAction('setOptions', 1, arguments);
		},

		/**
		 * Get State
		 * @since 2.0.0
		 * @return ***REMOVED***object} state
		 */

		getState: function()***REMOVED***
			var self = this;

			return self._execFilter('getState', self._state, self);
		},

		/**
		 * Force Refresh
		 * @since 2.1.2
		 */

		forceRefresh: function()***REMOVED***
			var self = this;

			self._refresh(false, true);
		},

		/**
		 * Destroy
		 * @since 2.0.0
		 * @param ***REMOVED***boolean} hideAll
		 */

		destroy: function(hideAll)***REMOVED***
			var self = this,
				filters = $.MixItUp.prototype._bound._filter,
				sorts = $.MixItUp.prototype._bound._sort;

			self._execAction('destroy', 0, arguments);

			self._$body
				.add($(self.selectors.sort))
				.add($(self.selectors.filter))
				.off('.mixItUp');

			for(var i = 0; i < self._$targets.length; i++)***REMOVED***
				var target = self._$targets[i];

				hideAll && (target.style.display = '');

				delete target.mixParent;
			}

			self._execAction('destroy', 1, arguments);

			if(filters[self.selectors.filter] && filters[self.selectors.filter] > 1) ***REMOVED***
				filters[self.selectors.filter]--;
			} else if(filters[self.selectors.filter] === 1) ***REMOVED***
				delete filters[self.selectors.filter];
			}

			if(sorts[self.selectors.sort] && sorts[self.selectors.sort] > 1) ***REMOVED***
				sorts[self.selectors.sort]--;
			} else if(sorts[self.selectors.sort] === 1) ***REMOVED***
				delete sorts[self.selectors.sort];
			}

			delete $.MixItUp.prototype._instances[self._id];
		}

	};

	/* jQuery Methods
	---------------------------------------------------------------------- */

	/**
	 * jQuery .mixItUp() method
	 * @since 2.0.0
	 * @extends $.fn
	 */

	$.fn.mixItUp = function()***REMOVED***
		var args = arguments,
			dataReturn = [],
			eachReturn,
			_instantiate = function(domNode, settings)***REMOVED***
				var instance = new $.MixItUp(),
					rand = function()***REMOVED***
						return ('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6).toUpperCase();
					};

				instance._execAction('_instantiate', 0, arguments);

				domNode.id = !domNode.id ? 'MixItUp'+rand() : domNode.id;

				if(!instance._instances[domNode.id])***REMOVED***
					instance._instances[domNode.id] = instance;
					instance._init(domNode, settings);
				}

				instance._execAction('_instantiate', 1, arguments);
			};

		eachReturn = this.each(function()***REMOVED***
			if(args && typeof args[0] === 'string')***REMOVED***
				var instance = $.MixItUp.prototype._instances[this.id];
				if(args[0] === 'isLoaded')***REMOVED***
					dataReturn.push(instance ? true : false);
				} else ***REMOVED***
					var data = instance[args[0]](args[1], args[2], args[3]);
					if(data !== undf)dataReturn.push(data);
				}
			} else ***REMOVED***
				_instantiate(this, args[0]);
			}
		});

		if(dataReturn.length)***REMOVED***
			return dataReturn.length > 1 ? dataReturn : dataReturn[0];
		} else ***REMOVED***
			return eachReturn;
		}
	};

	/**
	 * jQuery .removeStyle() method
	 * @since 2.0.0
	 * @extends $.fn
	 */

	$.fn.removeStyle = function(style, prefix)***REMOVED***
		prefix = prefix ? prefix : '';

		return this.each(function()***REMOVED***
			var el = this,
				styles = style.split(' ');

			for(var i = 0; i < styles.length; i++)***REMOVED***
				for(var j = 0; j < 4; j++)***REMOVED***
					switch (j) ***REMOVED***
						case 0:
							var prop = styles[i];
							break;
						case 1:
							var prop = $.MixItUp.prototype._helpers._camelCase(prop);
							break;
						case 2:
							var prop = prefix+styles[i];
							break;
						case 3:
							var prop = $.MixItUp.prototype._helpers._camelCase(prefix+styles[i]);
					}

					if(
						el.style[prop] !== undf &&
						typeof el.style[prop] !== 'unknown' &&
						el.style[prop].length > 0
					)***REMOVED***
						el.style[prop] = '';
					}

					if(!prefix && j === 1)break;
				}
			}

			if(el.attributes && el.attributes.style && el.attributes.style !== undf && el.attributes.style.value === '')***REMOVED***
				el.attributes.removeNamedItem('style');
			}
		});
	};

})(jQuery);