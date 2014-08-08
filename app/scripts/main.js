/*global document*/
var classie = require('../vendor/classie.js'),
	Modernizr = require('../vendor/modernizr.custom.js'),
	Notification = require('./notifications.js');
var bttn = document.getElementById('notification-trigger');

// make sure..
bttn.disabled = false;

bttn.addEventListener('click', function () {
	// simulate loading (for demo purposes only)
	classie.add(bttn, 'active');
	setTimeout(function () {

		classie.remove(bttn, 'active');

		// create the notification
		var notification = new Notification({
			message: '<span class="icon icon-megaphone "></span><p>You have some interesting news in your inbox. Go <a href="# ">check it out</a> now.</p>',
			layout: 'bar',
			effect: 'slidetop',
			type: 'notice', // notice, warning or error
			onClose: function () {
				bttn.disabled = false;
			}
		});

		// show the notification
		notification.show();

	}, 1200);

	// disable the button (for demo purposes only)
	this.disabled = true;
});
