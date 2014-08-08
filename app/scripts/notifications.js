/*global window,document*/
'use strict';
var classie = require('../vendor/classie'),
	Modernizr = require('../vendor/modernizr.custom.js'),
	extend = require('util-extend'),
	Queue = require('./queue'),
	Injector = require('./injector'),
	docElem = window.document.documentElement,
	support = {
		animations: Modernizr.cssanimations
	},
	animEndEventNames = {
		'WebkitAnimation': 'webkitAnimationEnd',
		'OAnimation': 'oAnimationEnd',
		'msAnimation': 'MSAnimationEnd',
		'animation': 'animationend'
	},
	//animation end event name
	animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];

/**
 * Notification function
 */

function Notification(options, Queue) {
	this.options = extend({}, this.options);
	extend(this.options, options);
	this._init();
}

/**
 * Notification options
 */
Notification.prototype.options = {
	// element to which the notification will be appended
	// defaults to the document.body
	wrapper: document.body,
	// the message
	message: 'Hello World!',
	// layout type: growl|attached|bar|other
	layout: 'bar',
	// effects for the specified layout:
	// for growl layout: scale|slide|genie|jelly
	// for attached layout: flip|bouncyflip
	// for other layout: boxspinner|cornerexpand|loadingcircle|thumbslider
	// ...
	effect: 'slide',
	// notice, warning, error, success
	// will add class ns-type-warning, ns-type-error or ns-type-success
	type: 'notice',
	// if the user doesn´t close the notification then we remove it 
	// after the following time
	ttl: 4000,
	// callbacks
	onClose: function () {
		return false;
	},
	onOpen: function () {
		return false;
	},
	onQueue: function () {
		return false;
	}
};

/**
 * init function
 * initialize and cache some vars
 */
Notification.prototype._init = function () {
	// create HTML structure
	this.ntf = document.createElement('div');
	this.ntf.className = 'ns-box ns-' + this.options.layout + ' ns-effect-' + this.options.effect + ' ns-type-' + this.options.type;
	var strinner = '<div class="ns-box-inner">';
	strinner += this.options.message;
	strinner += '</div>';
	strinner += '<span class="ns-close"></span></div>';
	this.ntf.innerHTML = strinner;

	// append to body or the element specified in options.wrapper
	this.options.wrapper.insertBefore(this.ntf, this.options.wrapper.firstChild);

	// dismiss after [options.ttl]ms
	var self = this;
	this.dismissttl = setTimeout(function () {
		if (self.active) {
			self.dismiss();
		}
	}, this.options.ttl);

	// init events
	this._initEvents();
};


/**
 * init events
 */
Notification.prototype._initEvents = function () {
	var self = this;
	// dismiss notification
	this.ntf.querySelector('.ns-close').addEventListener('click', function () {
		self.dismiss();
	});
};

/**
 * show the notification
 */
Notification.prototype.show = function () {
	this.active = true;
	classie.remove(this.ntf, 'ns-hide');
	classie.add(this.ntf, 'ns-show');
	this.options.onOpen();
};

/**
 * dismiss the notification
 */
Notification.prototype.dismiss = function () {
	var self = this;
	this.active = false;
	clearTimeout(this.dismissttl);
	classie.remove(this.ntf, 'ns-show');
	setTimeout(function () {
		classie.add(self.ntf, 'ns-hide');

		// callback
		self.options.onClose();
	}, 25);

	// after animation ends remove ntf from the DOM
	var onEndAnimationFn = function (ev) {
		if (support.animations) {
			if (ev.target !== self.ntf) {
				return false;
			}
			this.removeEventListener(animEndEventName, onEndAnimationFn);
		}
		self.options.wrapper.removeChild(this);
	};

	if (support.animations) {
		this.ntf.addEventListener(animEndEventName, onEndAnimationFn);
	}
	else {
		onEndAnimationFn();
	}
};

/**
 * add to global namespace
 */
module.exports = Notification;
