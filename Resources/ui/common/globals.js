// My common global variables.

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

module.exports.GVUpdate   = function(inValue, inName)
{
    this.GV[inName]    =     inValue;
};

/* Usage Example
	var VARS  = require('/common/globals');
	
	alert(VARS.GV.variable1);
	alert(VARS.GV.variable3);
	
	VARS.GVUpdate('www.thewarpedcoder.net', 'variable3');
	
	alert(VARS.GV.variable3);
 */