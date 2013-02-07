


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


/* Usage Example
	var global  = require('ui/common/globals');
	
	alert(global.colors.lightest);
	
	global.GVUpdate('www.thewarpedcoder.net', 'variable3');
	
	alert(VARS.GV.variable3);
 */

module.exports.userIsLoggedIn = function(){
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
	
