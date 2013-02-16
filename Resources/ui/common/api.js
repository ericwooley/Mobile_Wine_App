/**
 * Api Documentation
 * Most of these time, these functions should suffice for interacting with the server.
 */

var api = {};

/**
 * @class api
 * @param {String} the email address to login with
 * @param {String} The password to login with
 * @param {Function} The callback function to be called when the request is successful.
 */
api.login = function(email, password, callback){
	getResponse('http://winelife.ericwooley.com/user/login/', {email: email, password:password}, callback);
}

/**
 * @class api
 * @param {String} the email address to register with
 * @param {String} The password to register with
 * @param {Function} The callback function to be called when the request is successful.
 */
api.register = function(email, password, callback){
	getResponse('http://winelife.ericwooley.com/user/register/', {email: email, password:password}, callback);
}
/**
 * @class api
 * @param {Function} Callback function, to be called upon success.
 */
api.profileInformation = function(callback){
	getResponse('http://winelife.ericwooley.com/user/profile/', {}, callback);
}
/**
 * @class api
 * Send the server an updated profile
 * @param {String} The users first name
 * @param {String} The users last name
 * @param {bio} The users biography text
 * @param {Function} The callback function to be used 
 */
api.editProfile = function(fname, lname, bio, callback){
	getResponse('http://winelife.ericwooley.com/user/update_profile/',{
		fname: fname,
		lname: lname,
		bio: bio
	}, callback);
}

/**
 * @class api
 * creates a view containing a table with all the search results already formatted.
 * @param {Object} All of the search data. It is easiest to just drop in the results from one of the search functions
 * @param {Function} Callback function, to be executed when a user clicks on a row.
 * @return {View} returns a view with all the formatted data.
 */
api.search_results = require('ui/common/elements/search_results');

/**
 * @class api
 * general search for items
 * @param {String} A search query basically words that will be sent to the server.
 * @param {Function} callback function that will be given the results. It is recommended that you format this data using api.search_results
 *     @example
 *     api.search("Some Wine I Want maybe", function(search_results){
 *         	Ti.API.info('Here are some search results in json format');
 *          Ti.API.info(JSON.stringify(search_results)); // Check the login for an example of how this object is formatted.
 *          var preformatteedView = api.search_results(search_results); // Add this view to whatever you want!
 *     });
 */
api.search = function(query, callback){
	query = query.replace(' ', '+');
	getResponse( 'http://winelife.ericwooley.com/search/wine_search/', { query: query, size: 10}, callback );
}


/**
 * @class api
 * search for a catagories, please note that these catagories need to line up with the wine api catagories. For more information: http://api.wine.com.
 * @param {String} A search query basically words that will be sent to the server.
 * @param {Function} callback function that will be given the results. It is recommended that you format this data using api.search_results
 *     @example
 *     api.search("124 227 7764", function(search_results){// 124 is red wine, 227 is ? and 7764 is ? I just made them up.
 *         	Ti.API.info('Here are some search results in json format');
 *          Ti.API.info(JSON.stringify(search_results)); // Check the login for an example of how this object is formatted.
 *          var preformatteedView = api.search_results(search_results); // Add this view to whatever you want!
 *     });
 */
api.catagory = function(cat, callback){
	cat = cat.replace(' ', '+');
	getResponse( 'http://winelife.ericwooley.com/search/wine_search/', { cat: cat, size: 10}, callback );
}

/**
 * @class api
 * General search for a query, with a catagory filter.
 * @param {String} A search query basically words that will be sent to the server.
 * @param {Function} callback function that will be given the results. It is recommended that you format this data using api.search_results
 *     @example
 *     api.search("124 ", function(search_results){
 *         	Ti.API.info('Here are some search results in json format');
 *          Ti.API.info(JSON.stringify(search_results)); // Check the login for an example of how this object is formatted.
 *          var preformatteedView = api.search_results(search_results); // Add this view to whatever you want!
 *     });
 */
api.search_with_filter = function(query, cat, callback){
	query = query.replace(' ', '+');
	cat = cat.replace(' ', '+');
	getResponse( 'http://winelife.ericwooley.com/search/wine_search/', { query: query, cat: cat, size: 10}, callback );
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
api.httpInterface = server;
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

module.exports = api;