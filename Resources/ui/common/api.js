
module.exports.login = function(email, password, callback){
	getResponse('http://winelife.ericwooley.com/user/login/', {email: email, password:password}, callback);
}

module.exports.register = function(email, password, callback){
	getResponse('http://winelife.ericwooley.com/user/register/', {email: email, password:password}, callback);
}

module.exports.profileInformation = function(callback){
	getResponse('http://winelife.ericwooley.com/user/profile/', {}, callback);
}

module.exports.editProfile = function(fname, lname, bio, callback){
	getResponse('http://winelife.ericwooley.com/user/update_profile/',{
		fname: fname,
		lname: lname,
		bio: bio
	}, callback);
}

module.exports.search_results = require('ui/common/elements/search_results');

module.exports.search = function(query, callback){
	query = query.replace(' ', '+');
	getResponse( 'http://winelife.ericwooley.com/search/wine_search/', { query: query, size: 1}, callback );
}





/* The following is generic function to send data to the server, then get a response. 
 * You shouldn't need to use this, unless you want to form a custom request, use the functions
 * above for typical requests
 */
var server = Ti.Network.createHTTPClient(
	{
		onerror : function(e) {
	         Ti.API.debug(e.error);
	         alert('error');
	     },
	     timeout : 5000
	}
);
module.exports.httpInterface = server;
function getResponse(url, data, callback){
	var message = showMessage("please wait: connecting to server", 0);
	
	if(Ti.Network.networkType == Ti.Network.NETWORK_NONE){
		closeMessage(message);
		var dialog = Ti.UI.createAlertDialog({
			title: "Connectivity Error",
			message: "An active internet connection is required"
		});
		dialog.show();
		return;
	}
	
	server.onload = function()
	{
		Ti.API.info("load successful");
		//Ti.API.info(JSON.stringify(this));
		var json = this.responseText;
		closeMessage(message);
		var response;
		try{
			response = JSON.parse(json);
		}catch(err)
		{
			showMessage("Decode Error:" + err, 5000);
			response = json;
		}
		response = JSON.parse(json);
		callback(response);
	}
	
	server.open('POST', url);
	server.send(data);
	
};

showMessage = function(customMessage, interval){
	// window container
	indWin = Titanium.UI.createWindow();
	 
	//  view
	var indView = Titanium.UI.createView({
		height:50,
		width:200,
		borderRadius:10,
		backgroundColor:'black',
		opacity:.9,
		bottom: 100
	});
	indWin.add(indView);
	 
	// message
	var message = Titanium.UI.createLabel({
	    text: customMessage && typeof(customMessage!=='undefined') ? customMessage : L('please_wait'),
	    color:'#fff',width:'auto',height:'auto',textAlign:'center',
	    font:{fontFamily:'Helvetica Neue', fontSize:12,fontWeight:'bold'}
	});
	 
	indView.add(message);
	indWin.open();
 
	//interval = interval ? interval : 3000;
	if(interval > 0)
	{
		setTimeout(function(){
			indWin.close({opacity:0,duration:1000});
		},interval);
	}
	return indWin;
}

closeMessage = function(w)
{
	w.close({opacity:0,duration:1000});
}
