

/* Usage Example
	var global  = require('ui/common/globals');
	
	alert(global.colors.lightest);
	
	global.GVUpdate('www.thewarpedcoder.net', 'variable3');
	
	alert(VARS.GV.variable3);
 */

module.exports  =
{
	colors: {
		lightest: '#ffdc95',
		lighter:'#ffb36f',
		light: '#ed5f4a',
		lessDark: '#c42d30',
		dark: '#3c0017'
	 },
	 
	elements: {
		SimpleView: require('ui/common/elements/SimpleView'),
		SimpleLabel: require('ui/common/elements/SimpleLabel'),
		SetTitleBar: require('ui/common/elements/SetTitleBar')
	}
};

module.exports.config = require('ui/common/config');
module.exports.api = require('ui/common/api');

module.exports.userIsLoggedIn = function()
{
	return true;
}
// Global create setting buttons function
function createSettingsButton(){
	
}

//  GLOBAL CREATE WINDOW FUNCTION
//  One change here will change basic window properties on all windows.
//  *******************************************************************
function createWindow(title){
	
	var self = Ti.UI.createWindow({
		title:title,
		height:'100%',
		width: '100%',
		barColor: module.exports.colors.dark,
		backgroundColor: module.exports.colors.lightest,
		backgroundImage:'images/lightpaperfibers.png'
	});
	

	
	return self;
}

module.exports.createWindow = createWindow;
//	End Function

// This should be the last function called before the window is put on the screen.
// This allows us to add layers ontop of all the content, like the settings button.
function outputHook(win){
	var settingsButton = Ti.UI.createImageView(
	{	
		height: 30,
		width: 30,
		top: 0,
		right: 0,
		borderColor: 'black',
		borderWidth: 0,
		contentMode: 'aspectfill',
		clipsToBounds: false,
		image:'/images/gearIconCrop.png',
		layout:'vertical'
	});
	ettingsButton.addEventListener('click', function(){
		alert('Settings button was pushed');
	});
	win.add(settingsButton);
	/*settingsButton.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		var settingsWindow = createWindow('settings');
		var createSettingsPage = require('ui/common/settings');
		createSettingsPage(settingsWindow);
		if(Ti.Platform.osname == 'android')
			settingsWindow.open();
		else
			win.containingTab.open(settingsWindow);
	});*/
}
module.exports.outputHook = outputHook;
