
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
	},
	httpInterface: Ti.Network.createHTTPClient()
};
/* Usage Example
	var global  = require('ui/common/globals');
	
	alert(global.colors.lightest);
	
	global.GVUpdate('www.thewarpedcoder.net', 'variable3');
	
	alert(VARS.GV.variable3);
 */

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
		barColor: global.colors.dark,
		backgroundColor: global.colors.lightest
	});
	
	return self;
}

module.exports.createWindow = createWindow;
//	End Function

module.exports.login = function(email, password)
{
	Ti.API.info(email + ' ' + password)
	var loginReq = module.exports.httpInterface;
	
	loginReq.onload = function()
	{
		Ti.API.info('Loaded');
		var json = this.responseText;
		Ti.API.info(json);
		var response = JSON.parse(json);
		if (response.success == true)
		{
			var dialog = Ti.UI.createAlertDialog({
				title: "User Logged In"
			});
			dialog.show();
		}
		else
		{
			var dialog = Ti.UI.createAlertDialog({
				title: "Email/Password incorrect"
			});
			dialog.show();
		}
	};
	loginReq.open("POST","http://winelife.ericwooley.com/login/user_login/");  
    var params = {  
        email: email,  
        password: password  
    };  
    loginReq.send(params);
}

module.exports.register = function(email, password)
{
	Ti.API.info(email + ' ' + password)
	var loginReq = module.exports.httpInterface;
	
	loginReq.onload = function()
	{
		Ti.API.info('Loaded');
		var json = this.responseText;
		Ti.API.info(json);
		var response = JSON.parse(json);
		if (response.success == true)
		{
			var dialog = Ti.UI.createAlertDialog({
				title: "User was created"
			});
			dialog.show();
		}
		else
		{
			var dialog = Ti.UI.createAlertDialog({
				title: "invalid Email or password"
			});
			dialog.show();
		}
	};
	loginReq.open("POST","http://winelife.ericwooley.com/login/create_user/");  
    var params = {  
        email: email,  
        password: password  
    };  
    loginReq.send(params);
}

