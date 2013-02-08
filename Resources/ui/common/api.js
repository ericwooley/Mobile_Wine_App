//global = require('ui/common/globals');

module.exports.login = function(email, password, callback){
	getResponse('http://winelife.ericwooley.com/login/user_login/', {email: email, password:password}, callback);
}
var server = Ti.Network.createHTTPClient();
module.exports.httpInterface = server;
function getResponse(url, data, callback){
	if(Ti.Network.networkType == Ti.Network.NETWORK_NONE){
		var dialog = Ti.UI.createAlertDialog({
			title: "Connectivity Error",
			message: "An active internet connection is required"
		});
		dialog.show();
		return;
	}
	var response;
	server.onload = function()
	{
		var json = this.responseText;
		response = JSON.parse(json);
		callback(response);
	}
	server.open('POST', url);
	server.send(data);
	
};
