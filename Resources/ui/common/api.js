
module.exports.login = function(email, password, callback){
	getResponse('http://winelife.ericwooley.com/user/login/', {email: email, password:password}, callback);
}

module.exports.register = function(email, password, callback){
	getResponse('http://winelife.ericwooley.com/user/register/', {email: email, password:password}, callback);
}

module.exports.profileInformation = function(){
	var return_data;
	getResponse('http://winelife.ericwooley.com/user/profile/', function(data){
		return_data = data;
	});
	alert(return_data);
}

module.exports.editProfile = function(){
	
}





/* The following is generic function to send data to the server, then get a response. 
 * You shouldn't need to use this, unless you want to form a custom request, use the functions
 * above for typical requests
 */
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
	var dia = Ti.UI.createAlertDialog({
		title: "Please Wait:",
		message: "connecting to server..."
	});
	dia.show();
	server.onload = function()
	{
		var json = this.responseText;
		response = JSON.parse(json);
		dia.hide();
		callback(response);
	}
	server.open('POST', url);
	server.send(data);
	
};
