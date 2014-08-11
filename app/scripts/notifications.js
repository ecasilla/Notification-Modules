/*global window,document*/
'use strict';
var classie = require('classie'),
	extend = require('util-extend'),
	Queue = require('./queue'),
	Injector = require('./injector'),
	docElem = window.document.documentElement;
/**
 * Notification function
 */

function Notification(options) {
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
	timeout: 4000,
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
	this.notification = document.createElement('div');
	this.notification.className = 'ns-box ns-' + this.options.layout + ' ns-effect-' + this.options.effect + ' ns-type-' + this.options.type;
	var strinner = '<div class="ns-box-inner">';
	strinner += this.options.message;
	strinner += '</div>';
	strinner += '<span class="ns-close"></span></div>';
	this.notification.innerHTML = strinner;

	// append to body or the element specified in options.wrapper
	this.options.wrapper.insertBefore(this.notification, this.options.wrapper.firstChild);

	// dismiss after [options.timeout]ms
	var self = this;
	this.dismisstimeout = setTimeout(function () {
		if (self.active) {
			self.dismiss();
		}
	}, this.options.timeout);

	// init events
	this._initEvents();

	extend(classie, window.classie);
};


/**
 * init events
 */
Notification.prototype._initEvents = function () {
	var self = this;
	// dismiss notification
	this.notification.querySelector('.ns-close').addEventListener('click', function () {
		self.dismiss();
	});
};

/**
 * show the notification
 */
Notification.prototype.show = function () {
	this.active = true;
	classie.remove(this.notification, 'ns-hide');
	classie.add(this.notification, 'ns-show');
	this.options.onOpen();
};

/**
 * dismiss the notification
 */
Notification.prototype.dismiss = function () {
	var self = this;
	this.active = false;
	clearTimeout(this.dismisstimeout);
	classie.remove(this.notification, 'ns-show');
	setTimeout(function () {
		classie.add(self.ntf, 'ns-hide');

		// callback
		self.options.onClose();
	}, 25);

	// after animation ends remove ntf from the DOM
	var onEndAnimationFn = function (ev) {
		//if (support.animations) {
		//if (ev.target !== self.ntf) {
		//return false;
		//}
		//this.removeEventListener(animEndEventName, onEndAnimationFn);
		//}
		self.options.wrapper.removeChild(this);
	};
};

/**
 * add to global namespace
 */
module.exports = Notification;
