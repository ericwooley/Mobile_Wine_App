

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
config = require('ui/common/config');
module.exports.config = config;
module.exports.api = require('ui/common/api');
var crypt = require('ui/common/crypt');
module.exports.crypt = crypt;
module.exports.userIsLoggedIn = function()
{
	return true;
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
		right: '10%',
		borderColor: 'black',
		borderWidth: 0,
		contentMode: 'aspectfill',
		clipsToBounds: false,
		image:'/images/KS_nav_ui.png',
		layout:'vertical'
	});
	

	/*settingsButton.addEventListener('click', function(){
		alert('Settings button was pushed');
	});*/
	if(Titanium.Platform.name == 'android'){
		
		settingsButton.setImage('/images/gearIconCrop.png');
		settingsButton.setRight(0);		
		win.add(settingsButton);
	}
	else{
	win.setRightNavButton(settingsButton);
	}
	//win.add(settingsButton);
	settingsButton.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		
		var settingsWindow = createWindow('settings');
		var createSettingsPage = require('ui/common/settings');
		createSettingsPage(settingsWindow);
		
		win.containingTab.open(settingsWindow);
	});
}
module.exports.outputHook = outputHook;

//Storing local data
module.exports.store_string = function(name, value)
{
	Ti.App.Properties.setString(name, crypt.encrypt(value, config.encryptionpw));
}
module.exports.get_string = function(name, value)
{
	var text = Ti.App.Properties.getString(name);
	if(text)
		return crypt.decrypt(text, config.encryptionpw);
	return false;
}
