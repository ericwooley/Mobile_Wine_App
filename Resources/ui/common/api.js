global = require('ui/common/globals');

module.exports.login = function(email, password){
	
	Ti.addEventListener('data_returned', function(e){
		
	});
	getResponse('http://winelife.ericwooley.com/login/user_login/', {email: email, password:password});
}


function getResponse(url, data){
	var server = global.httpInterface;
	var response;
	server.onload = function()
	{
		var json = this.responseText;
		response = JSON.parse(json);
		Ti.fireEvent('data_returned', response);
	}
	server.open('POST', url);
	server.send(data);
	
};


login = function(email, password)
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