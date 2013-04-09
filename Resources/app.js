// This is a comment we need to fix
// HERE WE GO 
// bootstrap and check dependencies
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
	
	loginWindow = require('ui/handheld/Login')();
	var email = global.get_string('email');
	var password = global.get_string('password');
	var facebook = Ti.App.Properties.getBool('facebook');
	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	
	var atg =  ApplicationTabGroup();
	if(email && password || (email == '' || password == ''))
	{
		
		var dia = Ti.UI.createAlertDialog({
			title: "Logging You In",
			message: "One Moment..."
		});
		//dia.show();
		
		global.api.login(email, password, function(response){
			dia.hide();
			if(response.success)
			{
				Ti.API.info("profile_info: " + JSON.stringify(response));
				Ti.App.Properties.setInt('user_id', response.user_info.ID);
				global.user_id = response.user_info.ID;
				var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
				new ApplicationTabGroup().open();
			}
			else
			{
				loginWindow.open();
			}
		});
	}
	else if(global.config.requireLogin){
		loginWindow.open();
	}
	else
	{
		atg.open();
	}
	Ti.App.addEventListener('user_logout', function(data){
		Ti.App.Properties.removeProperty('email');
		Ti.App.Properties.removeProperty('password');
		Ti.App.Properties.removeProperty('facebook');
		Ti.Facebook.logout();
		atg.close();
		loginWindow.open();
	});
})();
