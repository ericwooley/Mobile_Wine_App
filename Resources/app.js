 
//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// This is a single context application with mutliple windows in a stack
(function() {
	var global = require('ui/common/globals');
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	//var Window = require('ui/handheld/ApplicationWindow');
	/* if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	}
	else {
		Window = require('ui/handheld/ApplicationWindow');
	}*/
	
	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	new ApplicationTabGroup().open();
	
	// This will open up a window that keeps the others hidden until the user is logged in.
	if(global.userIsLoggedIn()){
		var loginWindow = require('ui/handheld/Login')();
		loginWindow.open();
	}
	
})();
